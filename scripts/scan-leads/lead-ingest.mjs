#!/usr/bin/env node
// lead-ingest.mjs — dedup + write helper for the "scan inbox for new leads" skill.
//
// This script does the CRM side of inbox lead triage. It NEVER sends email
// (unlike the public /api/leads route) — inbound prospects should not get an
// auto-reply just because their existing email got scanned.
//
// Two modes, both read a JSON array from stdin:
//
//   --mode check    stdin: [{ email?, phone?, name? }, ...]
//                   → prints per-candidate dedup status (new | exists_lead |
//                     exists_customer | exists_notion), with existing ids.
//                   Read-only. Use this first to see who is genuinely new.
//
//   --mode ingest   stdin: [{ name, email?, phone?, city?, projectType?,
//                            sports?, message?, sourceEmail? }, ...]
//                   → for each candidate, re-checks dedup defensively and, if
//                     new, inserts into Supabase `leads` (deal_stage=new_lead,
//                     lead_source=inbound) and creates a Notion Pipeline page.
//                   Idempotent: an already-known candidate is skipped, so a
//                     re-run never double-writes.
//
// Env is loaded from .env.local at the repo root: NEXT_PUBLIC_SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, NOTION_API_KEY.
//
// Output is always a single JSON object on stdout: { results: [...] }.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const NOTION_PIPELINE_DB_ID = "2706eb69ce9180b0800dcc3e3660fbb5";

// ── env ──────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = join(REPO_ROOT, ".env.local");
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    fail(`Could not read ${envPath} — run from the repo root.`);
  }
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}

function fail(msg) {
  console.error(`[lead-ingest] ${msg}`);
  process.exit(1);
}

// ── helpers ──────────────────────────────────────────────────────────
const normEmail = (e) => (e || "").trim().toLowerCase() || null;
const normPhone = (p) => {
  const digits = (p || "").replace(/\D/g, "");
  // Compare on the last 10 digits (drop US country code).
  return digits.length >= 10 ? digits.slice(-10) : digits || null;
};

function splitName(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "";
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return { firstName, lastName };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8").trim();
  if (!text) fail("No JSON received on stdin.");
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) fail("stdin JSON must be an array.");
    return parsed;
  } catch (e) {
    fail(`stdin is not valid JSON: ${e.message}`);
  }
}

// ── dedup lookups ────────────────────────────────────────────────────
async function findInSupabase(supabase, email, phone) {
  const e = normEmail(email);
  const p = normPhone(phone);

  if (e) {
    const { data: lead } = await supabase
      .from("leads")
      .select("id, display_name, deal_stage, notion_page_id")
      .eq("email", e)
      .maybeSingle();
    if (lead) return { table: "leads", id: lead.id, notionPageId: lead.notion_page_id, match: "email" };

    const { data: cust } = await supabase
      .from("customers")
      .select("id")
      .eq("email", e)
      .maybeSingle();
    if (cust) return { table: "customers", id: cust.id, match: "email" };
  }

  // Secondary: phone match on leads (only if no email hit). Pull a small set
  // and compare normalized, since stored phones are formatted inconsistently.
  if (p) {
    const { data: leads } = await supabase
      .from("leads")
      .select("id, phone, notion_page_id")
      .not("phone", "is", null)
      .limit(1000);
    const hit = (leads || []).find((l) => normPhone(l.phone) === p);
    if (hit) return { table: "leads", id: hit.id, notionPageId: hit.notion_page_id, match: "phone" };
  }

  return null;
}

async function findInNotion(email) {
  const e = normEmail(email);
  if (!e) return null;
  const key = process.env.NOTION_API_KEY;
  if (!key) return null; // treated as "unknown"; caller decides

  const resp = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_PIPELINE_DB_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter: { property: "Email", email: { equals: e } },
        page_size: 1,
      }),
    }
  );
  if (!resp.ok) {
    console.error(`[lead-ingest] Notion query failed (${resp.status}): ${await resp.text()}`);
    return null;
  }
  const data = await resp.json();
  return data.results?.[0]?.id || null;
}

async function classify(supabase, cand) {
  const sb = await findInSupabase(supabase, cand.email, cand.phone);
  if (sb) {
    return {
      status: sb.table === "customers" ? "exists_customer" : "exists_lead",
      matchedOn: sb.match,
      supabaseId: sb.id,
      notionPageId: sb.notionPageId || null,
    };
  }
  const notionId = await findInNotion(cand.email);
  if (notionId) return { status: "exists_notion", notionPageId: notionId };
  return { status: "new" };
}

// ── Notion create (mirrors src/lib/notion.ts, source = Email) ────────
async function createNotionPipelineLead(lead) {
  const key = process.env.NOTION_API_KEY;
  if (!key) return null;

  const properties = {
    Name: { title: [{ text: { content: lead.name } }] },
    "Deal Stage": { select: { name: "New Lead" } },
    "Lead Source": { multi_select: [{ name: "Email" }] },
  };
  if (lead.firstName) properties["First Name"] = { rich_text: [{ text: { content: lead.firstName } }] };
  if (lead.lastName) properties["Last Name"] = { rich_text: [{ text: { content: lead.lastName } }] };
  if (lead.email) properties["Email"] = { email: lead.email };
  if (lead.phone) properties["Phone Number"] = { phone_number: lead.phone };
  if (lead.city) properties["City"] = { rich_text: [{ text: { content: lead.city } }] };
  if (lead.projectType) properties["Project Type"] = { rich_text: [{ text: { content: lead.projectType } }] };
  if (lead.sports?.length) {
    properties["Sports"] = {
      multi_select: lead.sports.map((s) => ({ name: s.charAt(0).toUpperCase() + s.slice(1) })),
    };
  }

  const notes = [];
  if (lead.message) notes.push(lead.message);
  notes.push(`Supabase ID: ${lead.supabaseId}`);
  notes.push("Source: inbox scan");
  properties["Notes"] = { rich_text: [{ text: { content: notes.join("\n").slice(0, 1900) } }] };

  const resp = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({ parent: { database_id: NOTION_PIPELINE_DB_ID }, properties }),
  });
  if (!resp.ok) {
    console.error(`[lead-ingest] Notion create failed (${resp.status}): ${await resp.text()}`);
    return null;
  }
  const data = await resp.json();
  return data.id || null;
}

// ── ingest one candidate ─────────────────────────────────────────────
async function ingestOne(supabase, cand) {
  // Defensive re-dedup so a re-run or a mis-labeled candidate never doubles up.
  const prior = await classify(supabase, cand);
  if (prior.status !== "new") {
    return { candidate: cand, action: "skipped", reason: prior.status, ...prior };
  }

  const name = (cand.name || "").trim();
  if (!name) return { candidate: cand, action: "error", reason: "missing name" };

  const { firstName, lastName } = splitName(name);
  const email = normEmail(cand.email);
  const noteBody = cand.message ? `Inbox scan: ${cand.message}` : "Inbox scan (see source email)";
  const noteWithSrc = cand.sourceEmail ? `${noteBody}\n[email: ${cand.sourceEmail}]` : noteBody;

  const insertRow = {
    first_name: firstName,
    last_name: lastName || null,
    display_name: name,
    email,
    phone: cand.phone || null,
    city: cand.city || null,
    deal_stage: "new_lead",
    lead_source: "inbound",
    lead_source_detail: "email inbox scan",
    project_type: cand.projectType && cand.projectType !== "" ? cand.projectType : null,
    sports: cand.sports?.length ? cand.sports : [],
    form_type: "inbox_scan",
    notes: noteWithSrc,
  };

  const { data: lead, error } = await supabase
    .from("leads")
    .insert(insertRow)
    .select("id")
    .single();

  if (error) {
    return { candidate: cand, action: "error", reason: `supabase insert: ${error.message}` };
  }

  // Notion is non-critical: a failure here doesn't lose the lead (it's in the DB).
  let notionPageId = null;
  try {
    notionPageId = await createNotionPipelineLead({
      name,
      firstName,
      lastName,
      email,
      phone: cand.phone,
      city: cand.city,
      projectType: cand.projectType,
      sports: cand.sports,
      message: cand.message,
      supabaseId: lead.id,
    });
    if (notionPageId) {
      await supabase.from("leads").update({ notion_page_id: notionPageId }).eq("id", lead.id);
    }
  } catch (e) {
    console.error(`[lead-ingest] Notion sync threw for ${email}: ${e.message}`);
  }

  return {
    candidate: cand,
    action: "created",
    supabaseId: lead.id,
    notionPageId,
    notionSynced: Boolean(notionPageId),
  };
}

// ── main ─────────────────────────────────────────────────────────────
async function main() {
  loadEnv();
  const mode = (process.argv.includes("--mode")
    ? process.argv[process.argv.indexOf("--mode") + 1]
    : "check").toLowerCase();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) fail("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const candidates = await readStdin();
  const results = [];

  if (mode === "check") {
    for (const cand of candidates) {
      const c = await classify(supabase, cand);
      results.push({ candidate: cand, ...c });
    }
  } else if (mode === "ingest") {
    for (const cand of candidates) {
      results.push(await ingestOne(supabase, cand));
    }
  } else {
    fail(`Unknown --mode "${mode}" (use check | ingest)`);
  }

  process.stdout.write(JSON.stringify({ mode, results }, null, 2) + "\n");
}

main().catch((e) => fail(e.stack || e.message));
