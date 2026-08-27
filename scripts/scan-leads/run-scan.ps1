# run-scan.ps1 — unattended local run of the scan-inbox-leads skill.
#
# Invoked by the Windows Scheduled Task "ProCourtSurfaces-ScanInboxLeads"
# (Mon/Wed/Fri/Sun 8:00am local). Runs Claude Code headlessly against this
# repo so the scan has the local .env.local secrets AND the Gmail connector.
#
# Each run appends a timestamped log under %USERPROFILE%\.scan-inbox-leads\logs.
# To run by hand:  powershell -NoProfile -ExecutionPolicy Bypass -File <this>

$ErrorActionPreference = 'Stop'
$proj = 'C:\Dev\Pro Court Surfaces'

$logDir = Join-Path $env:USERPROFILE '.scan-inbox-leads\logs'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmmss'
$log = Join-Path $logDir "scan_$stamp.log"

# Self-contained prompt: the scheduled agent starts with zero chat context, so
# spell out that this is unattended (no questions) and how to handle uncertainty.
$prompt = @'
Use the scan-inbox-leads skill now. This is an UNATTENDED scheduled run: do NOT
ask any questions or wait for confirmation at any point.

Procedure:
1. Scan my Gmail inbox for the last 14 days for prospective court-resurfacing
   leads (in:inbox newer_than:14d).
2. Judge intent per email; skip newsletters/vendors/receipts/notifications.
3. Dedup each candidate against the Supabase CRM and the Notion Pipeline via
   scripts/scan-leads/lead-ingest.mjs --mode check.
4. AUTO-WRITE every CLEAR new lead (real person + court inquiry + at least an
   email or phone) with --mode ingest.
5. For anything UNSURE, do NOT write it — just list it in the final summary.

End with a concise summary: threads scanned, candidate count, how many were
already known (and where), which were written (names + emails), which were held
as unsure, and any Notion sync failures.
'@

Set-Location $proj
"=== scan-inbox-leads run $stamp (local) ===" | Tee-Object -FilePath $log
& claude -p $prompt --dangerously-skip-permissions *>&1 | Tee-Object -FilePath $log -Append
"=== exit code: $LASTEXITCODE ===" | Tee-Object -FilePath $log -Append
