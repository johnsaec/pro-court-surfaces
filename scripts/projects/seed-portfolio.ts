#!/usr/bin/env node
// seed-portfolio.ts — stand up the portfolio "drive" in Supabase.
//
// What it does (idempotent — safe to re-run):
//   1. Ensures a public Storage bucket `project-photos` exists.
//   2. Mirrors every image currently referenced in src/lib/projects.ts (hero,
//      before, after, gallery) FROM Cloudinary INTO the bucket, foldered by slug.
//   3. Upserts one `portfolio_projects` row per project, with the image URLs
//      rewritten to the new Supabase public URLs, published and ordered.
//
// This migrates exactly what's live today. Higher-res Downloads masters and the
// "reserve" shots can be swapped in later via the admin UI (Phase 3).
//
// Run from repo root:  node scripts/projects/seed-portfolio.ts
// Env from .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { projects, type Project } from "../../src/lib/projects.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const BUCKET = "project-photos";

function loadEnv() {
  const raw = readFileSync(join(REPO_ROOT, ".env.local"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
      val = val.slice(1, -1);
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}

function fail(msg: string): never {
  console.error(`[seed-portfolio] ${msg}`);
  process.exit(1);
}

function contentType(name: string): string {
  const ext = name.toLowerCase().split(".").pop();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

// Cloudinary URL -> stable object name: the public id basename after the version.
function objectName(url: string): string {
  const clean = url.split("?")[0];
  return basename(clean);
}

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) fail("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // 1. Ensure bucket exists (public read).
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) fail(`listBuckets: ${listErr.message}`);
  if (!buckets!.some((b) => b.name === BUCKET)) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: "25MB",
    });
    if (error) fail(`createBucket: ${error.message}`);
    console.log(`✓ created public bucket "${BUCKET}"`);
  } else {
    console.log(`• bucket "${BUCKET}" already exists`);
  }

  // Upload one Cloudinary image into the bucket; return its Supabase public URL.
  // Cached so a URL reused across fields (hero == after) uploads only once.
  const urlCache = new Map<string, string>();
  async function mirror(slug: string, srcUrl: string): Promise<string> {
    if (urlCache.has(srcUrl)) return urlCache.get(srcUrl)!;
    const path = `${slug}/${objectName(srcUrl)}`;
    const res = await fetch(srcUrl);
    if (!res.ok) fail(`fetch ${srcUrl} -> ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: contentType(path), upsert: true });
    if (error) fail(`upload ${path}: ${error.message}`);
    const pub = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    urlCache.set(srcUrl, pub);
    return pub;
  }

  // 2 + 3. Per project: mirror images, then upsert the row.
  let order = 0;
  for (const p of projects as Project[]) {
    process.stdout.write(`\n▶ ${p.slug}\n`);

    const hero_src = await mirror(p.slug, p.hero.src);
    const before_src = await mirror(p.slug, p.before.src);
    const after_src = await mirror(p.slug, p.after.src);
    const gallery = [];
    for (const g of p.gallery ?? []) {
      gallery.push({ src: await mirror(p.slug, g.src), alt: g.alt });
    }
    console.log(`  ↳ ${2 + (p.gallery?.length ?? 0) + 1} images mirrored`);

    const row = {
      slug: p.slug,
      name: p.name,
      location: p.location,
      court_type: p.courtType,
      service: p.service,
      category: p.category,
      summary: p.summary,
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      keywords: p.keywords,
      hero_src,
      hero_alt: p.hero.alt,
      before_src,
      before_alt: p.before.alt,
      after_src,
      after_alt: p.after.alt,
      gallery,
      facts: p.facts,
      colors: p.colors ?? [],
      body: p.body,
      testimonial: p.testimonial ?? null,
      is_published: true,
      sort_order: order++,
    };

    const { error } = await supabase
      .from("portfolio_projects")
      .upsert(row, { onConflict: "slug" });
    if (error) fail(`upsert ${p.slug}: ${error.message}`);
    console.log(`  ✓ row upserted (published, sort ${row.sort_order})`);
  }

  console.log(`\n✅ Seeded ${projects.length} portfolio projects into Supabase.`);
}

main().catch((e) => fail(e?.stack ?? String(e)));
