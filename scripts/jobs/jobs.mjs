#!/usr/bin/env node
// jobs.mjs — closed jobs and what's owed on each. Balance is always calculated.
//
//   node scripts/jobs/jobs.mjs list [--all]
//   node scripts/jobs/jobs.mjs show <name or id>
//   node scripts/jobs/jobs.mjs add --name "Ben Archer court" --customer "Ben Archer" --contract 12000
//                                  [--email x] [--closed YYYY-MM-DD] [--qb 118] [--notes x]
//   node scripts/jobs/jobs.mjs pay <name or id> --amount 6000 --method ach [--date YYYY-MM-DD] [--note x]
//   node scripts/jobs/jobs.mjs refund <name or id> --amount 100 --method stripe [--date YYYY-MM-DD] [--note x]
//   node scripts/jobs/jobs.mjs change <name or id> --amount 500 [--date YYYY-MM-DD] [--note x]   # negative = credit
//   node scripts/jobs/jobs.mjs status <name or id> open|complete|paid_in_full|cancelled

import { loadEnv, makeClient } from "../quotes/quote-build.mjs";

const [command, ...args] = process.argv.slice(2);
const flag = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};
const usd = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const money = (name) => {
  const n = Number(flag(name));
  if (!flag(name) || Number.isNaN(n)) fail(`${name} must be a number`);
  return n;
};

loadEnv();
const supabase = makeClient();

const check = ({ data, error }) => {
  if (error) fail(error.message);
  return data;
};

// Refuses to guess: the search must match exactly one job.
async function findJob(term) {
  if (!term) fail("Which job? Give a name or id.");
  const isId = /^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(term);
  const rows = check(
    await (isId
      ? supabase.from("job_balances").select("*").eq("id", term)
      : supabase.from("job_balances").select("*").or(`job_name.ilike.*${term}*,customer_name.ilike.*${term}*`))
  );
  if (rows.length === 0) fail(`No job matches "${term}".`);
  if (rows.length > 1) fail(`"${term}" matches ${rows.length} jobs:\n${rows.map((r) => `  ${r.id}  ${r.job_name}`).join("\n")}`);
  return rows[0];
}

function printJob(j) {
  console.log(`${j.job_name} [${j.status}]  closed ${j.closed_on}`);
  console.log(`  ${j.customer_name}${j.customer_email ? ` <${j.customer_email}>` : ""}`);
  console.log(`  Contract ${usd(j.contract_amount)} + change orders ${usd(j.change_orders)} - paid ${usd(j.paid)} = BALANCE ${usd(j.balance)}`);
}

async function addEntry(kind, amount) {
  const job = await findJob(args[0]);
  check(
    await supabase.from("job_payments").insert({
      job_id: job.id,
      kind,
      amount,
      method: kind === "change_order" ? null : (flag("--method") ?? fail("--method is required")),
      entry_date: flag("--date"),
      note: flag("--note"),
    })
  );
  printJob(await findJob(job.id));
}

switch (command) {
  case "list": {
    let query = supabase.from("job_balances").select("*").order("closed_on");
    if (!args.includes("--all")) query = query.not("status", "in", "(paid_in_full,cancelled)");
    const rows = check(await query);
    if (rows.length === 0) console.log("No jobs.");
    rows.forEach(printJob);
    const owed = rows.reduce((sum, r) => sum + Number(r.balance), 0);
    console.log(`\n${rows.length} job(s), ${usd(owed)} owed`);
    break;
  }
  case "show": {
    const job = await findJob(args[0]);
    printJob(job);
    const entries = check(await supabase.from("job_payments").select("*").eq("job_id", job.id).order("entry_date"));
    for (const e of entries) {
      console.log(`  ${e.entry_date}  ${e.kind.padEnd(12)} ${usd(e.amount).padStart(12)}  ${e.method ?? ""}  ${e.note ?? ""}`);
    }
    break;
  }
  case "add": {
    const row = check(
      await supabase
        .from("jobs")
        .insert({
          job_name: flag("--name") ?? fail("--name is required"),
          customer_name: flag("--customer") ?? fail("--customer is required"),
          customer_email: flag("--email"),
          contract_amount: money("--contract"),
          closed_on: flag("--closed"),
          qb_customer_id: flag("--qb"),
          notes: flag("--notes"),
        })
        .select("id")
        .single()
    );
    printJob(await findJob(row.id));
    break;
  }
  case "pay":
    await addEntry("payment", money("--amount"));
    break;
  case "refund":
    await addEntry("refund", money("--amount"));
    break;
  case "change":
    await addEntry("change_order", money("--amount"));
    break;
  case "status": {
    const job = await findJob(args[0]);
    check(await supabase.from("jobs").update({ status: args[1] }).eq("id", job.id));
    printJob(await findJob(job.id));
    break;
  }
  default:
    fail("Usage: jobs.mjs list|show|add|pay|refund|change|status (see the top of this file)");
}
