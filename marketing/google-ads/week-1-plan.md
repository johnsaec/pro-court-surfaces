# Google Ads: Week 1 plan

Drafted 2026-09-25. A one-week version of `campaign-plan.md`, focused on where live search results show ads can add something.
Data: DataForSEO live results for Austin, San Antonio and Waco, plus keyword volumes, all pulled 2026-09-25 (see `aeo-metrics.md`, check log). No padel.

**Rules:** no prices in ads or on the pages. Every call to action is "free quote."

---

## Why this split

| Where | What live search shows | Ads? |
|---|---|---|
| **Resurfacing, Austin** | We're Maps #1–2 and mostly organic #1. The AI Overview names us first. Only Cortz and CourTex run text ads, on 1 term each. Build My Courts buys the **sponsored Maps spot** above us. | Only the Maps spot (location asset), plus the terms we don't rank for (cost, repair, crack repair) |
| **Pickleball / backyard court builds, Austin** | We're **not in the top 100**. **Zero advertisers.** Maps belongs to Build My Courts, CourTex and Pickletile. Most searches in this family (TX: pickleball court construction about 1,300/mo) | **Yes: main spend** |
| **Resurfacing, San Antonio** | We're **not ranked, and not in Maps**. Premier Courts, CourTex and Build My Courts hold Maps. No advertisers. | **Yes** |
| Resurfacing, Waco | Maps #1 | No |

The Google Ads per-click estimates ($36–90) are statewide averages, mostly Dallas and Houston advertisers. With no one bidding in Austin or San Antonio, expect real per-click costs well below that.

## ROI math (Patrick's numbers, 2026-09-25)

**Target:** customer acquisition cost (CAC) = **⅓ of gross margin** on residential jobs.

| | Gross margin | Target CAC (⅓) | Max cost per lead (close 1 in 4) | Max CPC at 5% conversion | Max CPC at 10% conversion |
|---|---|---|---|---|---|
| **Tennis** (resurfacing) | ~$7,000 | **~$2,330** | ~$580 | ~$29 | ~$58 |
| **Pickleball** | ~$3,000 | **~$1,000** | ~$250 | ~$12.50 | ~$25 |

What this means:
- **Tennis clears the target easily.** Even the statewide $46 "tennis court resurfacing" estimate is fine at a 10% form rate, and real Austin/San Antonio costs should come in lower (no one is bidding).
- **Pickleball is tight.** Statewide estimates for pickleball construction are $20–36 per click. So cap pickleball bids at **$20**, lean on the landing page to convert (reviews and projects are on it), and cut any pickleball term that runs above $250 per lead.
- **Close rate is a guess (1 in 4).** Quote statuses in the CRM are mostly "draft", so mark quotes sent/accepted/declined going forward so we can measure it.
- **Timing:** quotes take weeks to close. **Judge week 1 on cost per lead and lead quality**, and judge CAC on jobs after about 30 days.

## Campaign A: `austin_builds_week1` ($65/day)

| Setting | Value |
|---|---|
| Type | Search only. Search Partners **off**, Display **off** |
| Location | Austin + **40 mi** (Round Rock, Georgetown, Leander, Dripping Springs, San Marcos, Bastrop). **Presence** only. |
| Bidding | **Manual CPC** for week 1 so each ad group gets its own ceiling: **pickleball $20, tennis/resurfacing $40**. Switch to Max Conversions (then tCPA at the targets above) after about 15 conversions. |
| Assets | **Location asset: link the Google Business Profile.** This makes you eligible for the sponsored Maps spot Build My Courts is buying. |
| Tracking template | `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_content={adgroupid}&utm_term={keyword}` with custom parameter `_campaign` = `austin_builds_week1` |
| Auto-tagging | **On** |

### Ad group A1: Pickleball court construction → `/pickleball-court-construction`

Keywords (phrase match):
```
"pickleball court construction"
"pickleball court builder"
"pickleball court builders"
"pickleball court installation"
"pickleball court installer"
"pickleball court contractor"
"backyard pickleball court"
"build a pickleball court"
"cost to build a pickleball court"
"pickleball court construction cost"
"residential pickleball court"
"sport court installation"
"backyard sport court"
"backyard basketball court"
"basketball court installation"
```
Default bid: **$20**.

**Headlines (≤30 chars):** use the "Pickleball Court Construction" set in `ad-copy.md`. Replace #10 with **5.0 Stars on Google (19)**.
**Descriptions:** the "Pickleball Court Construction" set in `ad-copy.md`.

### Ad group A2: Resurfacing gaps + Maps spot → `/court-resurfacing` (bid $40)

The searches where we don't rank, plus the main terms so the location asset has something to show on:
```
"tennis court resurfacing"
"pickleball court resurfacing"
"court resurfacing"
"tennis court resurfacing cost"
"tennis court repair"
"tennis court crack repair"
"court resurfacing near me"
"tennis court refinishing"
```
Copy: the "Resurfacing" RSA below.

Watch this group closely. If it mostly takes clicks from people who'd have found your #1 free result anyway (the search-terms report will show that), cut it to the 3 gap terms.

### Ad group A3: Tennis court construction → `/tennis-court-construction` (bid $40)

Better margin (~$7k) and cheap clicks: "cost to build a tennis court", "tennis court construction cost", "price to build a tennis court" and "tennis court installation cost" each get about 210/mo in TX at about **$11 per click**. The costs blog already ranks #7 for "tennis court construction price".

Keywords (phrase match):
```
"tennis court construction"
"tennis court builders"
"tennis court builder"
"tennis court contractors"
"tennis court installation"
"tennis court construction cost"
"cost to build a tennis court"
"price to build a tennis court"
"tennis court installation cost"
"backyard tennis court"
"build a tennis court"
"home tennis court"
"residential tennis court"
```

**Headlines (≤30 chars)**

1. Tennis Court Construction (25)
2. Tennis Court Builders (21)
3. New Tennis Courts (17)
4. Backyard Tennis Courts (22)
5. Austin Tennis Court Builder (27)
6. Free On-Site Quote (18)
7. Written Quote in 48 Hours (25)
8. 5.0 Stars on Google (19)
9. Custom Court Colors (19)
10. Regulation Lines & Layout (25)
11. Add Pickleball Lines Too (24)
12. HOA, Club & Home Courts (23)
13. Built for Texas Heat & UV (25)
14. Serving Central Texas (21)
15. Get Your Free Quote Today (25)

**Descriptions (≤90 chars)**

1. New tennis courts built right, from layout and drainage to final lines. Free quote. (83)
2. Backyard, HOA, club and school courts across Central Texas. Quote in 48 hours. (78)
3. Pro-grade acrylic surface, optional cushion, custom colors. Talk to the owner. (78)
4. Full builds or surfacing on your new slab. Add pickleball lines if you like. (76)

## Campaign B: `sa_resurfacing_week1` ($35/day)

| Setting | Value |
|---|---|
| Location | San Antonio, New Braunfels, Boerne, Schertz, Seguin (or San Antonio + 25 mi). **Presence** only. |
| Bidding | Manual CPC: tennis/resurfacing terms **$40**, pickleball terms **$20** (split pickleball terms into their own ad group) |
| Final URL | `/court-resurfacing` |
| Tracking template | same pattern, `_campaign` = `sa_resurfacing_week1` |

Keywords (phrase match):
```
"tennis court resurfacing"
"tennis court refinishing"
"pickleball court resurfacing"
"court resurfacing"
"tennis court resurfacing contractors"
"tennis court resurfacing companies"
"tennis court repair"
"basketball court resurfacing"
"sport court resurfacing"
```
Pickleball terms go in their own ad group at a **$20** bid:
```
"pickleball court conversion"
"convert tennis court to pickleball"
```

## Resurfacing RSA (Campaigns A2 and B)

**Headlines (≤30 chars)**

1. Tennis Court Resurfacing (24)
2. Pickleball Court Resurfacing (28)
3. Cracked or Faded Court? (23)
4. Court Resurfacing Experts (25)
5. Free On-Site Quote (18)
6. Written Quote in 48 Hours (25)
7. Crack Repair & Recoating (24)
8. Fresh Color & New Lines (23)
9. Most Jobs Done in 3-5 Days (26)
10. 5.0 Stars on Google (19)
11. Built for Texas Heat & UV (25)
12. Add Pickleball Lines Too (24)
13. HOA, Club & Home Courts (23)
14. Serving Central Texas (21)
15. Get Your Free Quote Today (25)

**Descriptions (≤90 chars)**

1. Cracks, faded color or slick spots? We repair, recoat and restripe your court. (78)
2. Free on-site assessment. Detailed written quote within 48 hours. No pressure. (77)
3. Acrylic surfaces engineered for Texas heat and UV. Most jobs done in 3-5 days. (78)
4. Homeowners, HOAs and clubs across Austin and Central Texas. Talk to the owner. (78)

## Negative keywords (shared list, both campaigns)

```
near me park, public, open play, indoor, lessons, league, reserve, reservations, club membership, courts near me, court near me,
rules, dimensions, size, diagram, layout, drawing, template, png, clipart,
diy, how to, yourself, kit, for sale, tiles, flooring for sale, portable, sherwin williams, home depot, lowes, amazon,
rust-oleum, behr, crack filler, crack magic, supplies, products,
nba, nike, net, ball, paddle, shoes, hoop, goal, lego,
jobs, salary, hiring, careers,
driveway, parking lot, asphalt sealing, pool resurfacing, deck resurfacing, floor, garage,
fence repair, net repair, windscreen, lights, lighting, padel
```

Watch out: "pickleball court near me" (2,400/mo in Austin) and "pickleball court austin" (480) are players looking for a place to play. The negatives above block them. Check the search terms on day 1.

## Other assets (both campaigns)

- **Call:** (512) 893-0466, count calls 60 seconds or longer
- **Sitelinks:**
  - Pickleball Court Construction → `/pickleball-court-construction`
  - Tennis Court Construction → `/tennis-court-construction`
  - Court Resurfacing → `/court-resurfacing`
  - Recent Projects → `/projects`
  - Free On-Site Quote → `/court-services#contact`
- **Callouts:** Free On-Site Quote · 5.0 on Google · Written Warranty · Quote in 48 Hours · Owner-Operated

## Conversions (set up before launch)

| Conversion | How | Primary? |
|---|---|---|
| Quote form submit | GA4 `generate_lead` imported into Google Ads. Forms send `form_name` = `pickleball_construction_contact` / `tennis_construction_contact` / `court_resurfacing_contact`. | Yes |
| Calls from ads | Call asset, 60 seconds or longer | Yes |
| Phone click on site | GA4 `phone_click` | No (secondary, for observation) |

Before launch, submit one test lead from each page with `?gclid=test123&utm_source=google&utm_medium=cpc`. Check that the lead row shows `ft_channel = paid` and `ft_click_id = test123`, then delete the test lead.

## Daily check (about 5 minutes; paste the search-terms report to Claude)

1. Add a negative for anything that isn't a buyer.
2. If the average cost per click is over $40, check which terms are driving it.
3. Check `/admin/leads` for leads with `ft_channel = paid` and reply the same day.

## End of week: decide on week 2

| Result | Next step |
|---|---|
| Leads from Campaign A | Keep going. Add budget. Switch to Max Conversions. Build a dedicated `/backyard-basketball-court` page if basketball terms show up. |
| Leads from B only | San Antonio resurfacing works. Consider a San Antonio page and a business profile service area there. |
| Clicks but 0 leads | Landing page problem. Check form starts in GA4, and simplify the hero and form. Run one more week. |
| Few impressions | Widen A to 100 mi. Move budget toward whichever ad group gets the cheapest leads. |
| Mostly junk search terms | Tighten to exact match on the best 5–8 terms |

Log results in `aeo-metrics.md` and `campaign-plan.md`.
