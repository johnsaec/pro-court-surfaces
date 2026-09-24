# Google Ads — Campaign Plan v1 (Pro Court Surfaces)

Drafted 2026-09-23. Built on Cody Schneider's "High IQ" Google Ads structure (see `../cody-schneider/raw-posts.md` Posts 1, 9, 11).
Keyword data: DataForSEO Google Ads `keywords_for_keywords` (Texas + Austin), pulled 2026-09-23.

**Rules:** no prices in ads or on landing pages; every call to action is "free quote."

---

## 1. Structure (Cody's "High IQ" setup, scaled down for a small local market)

| Setting | Choice | Why |
|---|---|---|
| Campaigns | **1 Search campaign** | Demand is small. One budget pool lets Google learn faster. |
| Networks | Search only, Search Partners off, Display off | Local service business. No display audience to buy yet. |
| PMax | **No** | No product feed or inventory. Revisit only with lots of conversion data. |
| Match type | **Broad** + smart bidding + tight negatives | Cody: broad + real conversion signal beats SKAGs and match-type splits. |
| Bidding | **Maximize Conversions** (no tCPA yet) → tCPA/tROAS once ~30 conversions | Not enough data for a target on day 1. |
| Budget | ~$50/day (~$1,500/mo) consolidated | TX CPCs run $18–46 on buyer terms. That buys ~40–70 clicks/mo. |
| Geo | Austin + ~100 mi (matches the site's service area), **presence only** | Excludes "interest in" traffic from out of state. |
| Bid adjustments | None | Cody: stacked device, day and zip adjustments are "midwit." Let smart bidding handle it. |
| RSAs | 15 headlines / 4 descriptions per ad group, **no pinning** | Asset volume matters more than control. |
| Brand campaign | Not now | Branded traffic finds you anyway. It would only inflate the account's ROAS. |

## 2. Conversions (the most important part)

Cody: optimize to the deepest event you can, and **import closed revenue offline**.

We already have the plumbing. `src/lib/attribution.ts` captures `gclid`, and `api/leads` saves it to `leads.ft_click_id` / `lt_click_id` (type `gclid`).

| Conversion action | Source | Role |
|---|---|---|
| Quote form submit (`generate_lead`) | GA4 / Google tag | Primary at launch (volume) |
| Calls from ads (60s+) | Google call extension | Primary at launch |
| **Qualified lead** | Offline import: lead `deal_stage` → `qualified_lead`+ | Primary once flowing |
| **Quote accepted / deposit paid** (value = `final_total`) | Offline import: `quotes.status` → `accepted` / `deposit_paid` | Value signal. Switch to tROAS once there's enough data |

Honest constraint: a few jobs a month will never reach Cody's "~50/week" threshold. We start on leads and feed closed revenue in as value, so Google learns which *searches* produce real jobs.

**Build needed:** a script that pulls gclid'd leads/quotes from Supabase and uploads them as offline conversions (Google Ads API or a scheduled Sheet upload). Needs Google Ads API access (developer token + OAuth).

## 3. Ad groups = keyword families → one dedicated landing page each

Volumes are **Texas** monthly searches (Austin-only numbers are mostly 10–90). CPC is the Google Ads top-of-page estimate.

| Ad group | Core keywords (TX vol, CPC) | Landing page |
|---|---|---|
| **Pickleball Court Construction** | pickleball court construction (1,300, $36) · construction cost (260, $28) · installation (170, $25) · builder (170, $29) · installer (170) · installation cost (140, $20) · backyard pickleball court (140, $7) · cost (90) · contractor(s) (70/50) · construction companies (30, $40) · residential pickleball courts (20) | `/court-services#installation` → **dedicated page later** |
| **Tennis Court Resurfacing** | tennis court resurfacing / refinishing / re surfacing (70 each, **$46.52**) · resurfacing cost (30) · resurfacing near me (30) · resurfacing contractors (40) · tennis court contractors near me (30, $18) · pickleball court resurfacing (20, $46) | `/court-services#resurfacing` |
| **Pickleball Conversion** | pickleball court conversion (110) · convert tennis court to pickleball | `/court-services#conversion` |
| **Sport & Basketball Courts** | sport court (720, $18) · backyard basketball court (390, $10) · home court basketball (170) · basketball court installation (170, $25) · sports court backyard (110, $16) · basketball court painting (110) · sport court installation (90, $14) · custom basketball court (70) · half court basketball backyard (70) · install basketball court in backyard (40, $38) · basketball court builders/contractor (50/20) | `/court-services#installation` → **dedicated page later** |
| **Padel Court Construction** | padel court construction (260, $17) · padel court builders (260, $17) · padel court installation (90, $9) | **needs a page** (we've done Padel39) |
| **Tennis Court Construction** | tennis court construction (170, $9) · cost to build a tennis court (210, $11) · tennis court installation (20, $20) · tennis court builders (30) | `/court-services#installation` |

Cleaning (`court cleaning` 30/mo) is too small for its own ad group. Leave it on the page and let broad match pick it up.

## 4. Negative keywords (starter list; add more weekly from search terms, with an LLM judging intent)

The big volume in this space is **people looking for a place to play**, not buyers. Block it:

- **Play/visit intent:** near me park, public, open, indoor, courts near me, park, rec center, lessons, league, open play, reservations, reserve, schedule, clinic, camp, club membership, hours
- **Pro/team/fan:** nba, wnba, lakers, celtics, mavericks, bulls, heat, knicks, warriors, spurs, nike, spalding, stadium, finals
- **Products, not services:** tiles, flooring for sale, for sale, portable, goal, hoop, net, ball, paddle, shoes, lego, png, label, outline, clipart, amazon, home depot, lowes
- **DIY/info:** diy, dimensions, size, how to paint, rules, drawing, template, cheap
- **Other:** jobs, salary, hiring, volleyball court near me, futsal, slamball, bocce, planet fitness, lifetime fitness, trampoline

## 5. Ad copy (RSAs, character counts checked, no pinning, no prices)

See `ad-copy.md`.

## 6. How it runs (Cody's loop, adapted)

1. **Launch:** 1 campaign, 6 ad groups, broad match, Max Conversions, $50/day.
2. **Weekly (Claude):** pull the search-terms report, have an LLM judge each query's intent, add negatives, and find new keyword families.
3. **Winners:** when a family produces real leads, give it a dedicated landing page (Post 1: "each ad set gets a dedicated landing page").
4. **Monthly:** tie leads → quotes → deposits back to keywords (offline import + CRM). Move budget toward families that close, not ones that just click.
5. **Later:** full automation (Google Ads API reads/writes from Claude Code; data warehouse). This comes after a month of real data.

## 7. Open items before launch

- [ ] Google Ads account + conversion tag on the site (confirm GA4 `generate_lead` is imported as a conversion)
- [ ] Call extension with (512) 893-0466 and call conversion tracking
- [ ] Decide: include padel + tennis construction at launch, or start with 4 ad groups
- [ ] Google Ads API developer token (for offline conversion import + Claude management)
- [ ] Dedicated landing pages for pickleball construction, sport/basketball courts, and padel
