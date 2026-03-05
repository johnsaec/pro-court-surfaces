# AEO Metrics: Pro Court Surfaces

## Baseline (as of February 24, 2026)

### Organic Traffic (Last 90 Days — Google Search Console)

| Metric | Value |
|--------|-------|
| Total clicks | 21 |
| Total impressions | 2,905 |
| CTR | 0.72% |
| Average position | 38.9 |

### Top Pages by Clicks

| Page | Clicks | Impressions | CTR | Avg Position |
|------|--------|-------------|-----|-------------|
| / (homepage) | 19 | 2,574 | 0.7% | 38.1 |
| /about | 1 | 142 | 0.7% | 9.8 |
| /contact | 1 | 126 | 0.8% | 29.8 |
| /pickleball-court-construction | 0 | 378 | 0.0% | 42.9 |
| /projects | 0 | 169 | 0.0% | 17.4 |
| /faq | 0 | 72 | 0.0% | 9.9 |

*Note: /blog, /blog/court-construction-costs, /blog/court-surface-types, and /commercial do not appear — they have zero impressions or are not indexed.*

### Top Queries by Impressions

| Query | Clicks | Impressions | Avg Position | Opportunity |
|-------|--------|-------------|-------------|-------------|
| pickleball court resurfacing | 0 | 136 | 50.5 | HIGH — needs dedicated page |
| acrylic court surfaces texas | 0 | 63 | 16.0 | QUICK WIN — nearly page 1 |
| court resurfacing services texas | 0 | 57 | 15.2 | QUICK WIN — nearly page 1 |
| court surfaces | 0 | 54 | 17.4 | QUICK WIN — nearly page 1 |
| pickleball court construction texas | 0 | 41 | 64.4 | Needs content |
| pickleball court contractors in texas | 0 | 41 | 58.9 | Needs content |
| court resurfacing services | 0 | 40 | 20.6 | Close to page 1 |
| pickleball court repair | 0 | 40 | 66.8 | Needs content |
| pickleball court construction companies | 0 | 38 | 87.9 | Too far out — long term |
| court resurfacing | 0 | 36 | 20.8 | Close to page 1 |

**Quick win queries** (position 15–21, easiest to push to page 1):
- "acrylic court surfaces texas" — pos 16.0
- "court resurfacing services texas" — pos 15.2
- "court surfaces" — pos 17.4
- "court resurfacing services" — pos 20.6
- "court resurfacing" — pos 20.8

### AI Overview Impressions

Zero AI Overview impressions recorded in GSC for this period. AI Overviews have not triggered for any queries where procourtsurfaces.com has impressions.

### DataForSEO Rankings (17 Keywords)

| Metric | Value |
|--------|-------|
| Total ranked keywords | 17 |
| Keywords in top 10 | 0 |
| Keywords in top 20 | 1 (branded: "pro court surfacing" at #12) |
| Keywords in top 50 | 4 |
| Highest-volume keyword | "pickleball court construction companies" (720/mo) at position 65 |

### AI Visibility Baseline

| # | Query | Brand Mentioned | Competitors Mentioned | AI Overview? |
|---|-------|----------------|----------------------|-------------|
| 1 | Pro Court Surfaces Austin Texas | YES | CourTex, KMS, Sport Court of Austin | N/A |
| 2 | Pro Court Surfaces reviews | NO | None (FL brand confusion) | N/A |
| 3 | best court resurfacing company Austin TX | YES (#7) | CourTex, KMS | No |
| 4 | pickleball court installer Austin Texas | NO | CourTex | No |
| 5 | tennis court resurfacing contractors Central TX | NO | CourTex, KMS | No |
| 6 | court surfacing subcontractor for GCs Texas | NO | KMS | No |
| 7 | ATS Sports Acrytech installer Texas | NO | None | No |
| 8 | pickleball court resurface cost Texas 2026 | NO | None | No |
| 9 | tennis court construction costs Texas GC budget | NO | CourTex | No |
| 10 | court surface types acrylic vs tile | NO | None | No |
| 11 | court surfacing sub amenity center Austin | NO | KMS | No |
| 12 | sport court surfacing bid for GC | NO | KMS, Aguilar | No |
| 13 | best court surfacing sub apartment complex TX | NO | KMS | No |
| 14 | hire to resurface tennis courts apartment Austin | NO | CourTex, KMS, Aguilar | No |
| 15 | best surface for outdoor pickleball Texas heat | NO | None | No |

**Baseline brand mention rate:** 2/15 (13%)
**Competitor mention rates:** CourTex 7/15 (47%), KMS 7/15 (47%), Aguilar 2/15 (13%)

### Reddit Presence

| Subreddit | Score (0-3) |
|-----------|-------------|
| r/pickleball | 0 |
| r/tennis | 0 |
| r/austin | 0 |
| r/HOA | 0 |
| r/Construction | 0 |

**Baseline Reddit score: 0 — No presence**

### Content Volume

| Page | Words |
|------|-------|
| Homepage | ~720 |
| Blog: Court Construction Costs | ~1,150 |
| Blog: Court Surface Types | ~1,540 |
| Commercial | ~890 |
| Blog Index | ~60 |
| Terms | ~485 |
| **Total** | **~4,845** |

### AEO Content Structure Scores

| Page | Score |
|------|-------|
| Homepage | 8/18 |
| Court Construction Costs | 12/18 |
| Court Surface Types | 14/18 |
| Commercial | 10/18 |
| Blog Index | 3/18 |
| Terms | 3/18 |
| **Average** | **8.3/18 (46%)** |

---

## AI Referral Traffic Setup

### GA4 Segment: AI Search Referrals

Create a custom audience or segment in GA4 (Property ID: 517027522) filtering `Session source` matching any of these domains:

```
perplexity.ai
chat.openai.com
chatgpt.com
gemini.google.com
claude.ai
you.com
phind.com
poe.com
copilot.microsoft.com
```

**Steps:**
1. Go to [GA4 Admin](https://analytics.google.com/analytics/web/#/a517027522) → Explore → Create new exploration
2. Add segment → User segment → Add condition: `Session source` matches regex:
   ```
   perplexity\.ai|chat\.openai\.com|chatgpt\.com|gemini\.google\.com|claude\.ai|you\.com|phind\.com|poe\.com|copilot\.microsoft\.com
   ```
3. Name it "AI Search Referrals"
4. Save and pin to dashboard

**Current AI referral traffic:** Not yet tracked — segment setup instructions above.

**Important:** AI referral traffic is significantly undercounted. Many AI-driven visits arrive as direct traffic (no referrer header) when users copy-paste URLs from AI responses. Track both AI referrals and overall direct traffic trends.

---

## Monthly Monitoring Script

Save as `scripts/monthly-aeo-check.ts` and run with `npx tsx scripts/monthly-aeo-check.ts`:

```typescript
/**
 * Monthly AEO Visibility Check
 *
 * Prerequisites:
 *   npm install anthropic
 *   ANTHROPIC_API_KEY in .env.local
 *
 * Usage:
 *   npx tsx scripts/monthly-aeo-check.ts
 */

import Anthropic from "@anthropic-ai/sdk";

const BRAND_NAME = "Pro Court Surfaces";
const COMPETITOR_NAMES = ["CourTex", "KMS Sport Surfaces", "Aguilar Athletic", "Build My Courts", "Sport Court of Austin"];

const QUERIES = [
  "Pro Court Surfaces Austin Texas",
  "Pro Court Surfaces reviews",
  "best court resurfacing company Austin TX",
  "pickleball court installer Austin Texas",
  "tennis court resurfacing contractors Central Texas",
  "court surfacing subcontractor for general contractors Texas",
  "ATS Sports Acrytech installer Texas",
  "how much does it cost to resurface a pickleball court in Texas",
  "tennis court construction costs Texas GC budget",
  "court surface types comparison acrylic vs tile",
  "court surfacing subcontractor amenity center multi-family Austin",
  "sport court surfacing bid for general contractor",
  "best court surfacing sub for apartment complex Texas",
  "who should I hire to resurface tennis courts at an apartment complex in Austin",
  "what is the best surface material for outdoor pickleball courts in Texas heat",
];

async function main() {
  const client = new Anthropic();
  const results: Array<{
    query: string;
    brandMentioned: boolean;
    competitorsMentioned: string[];
  }> = [];

  for (const query of QUERIES) {
    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [{ role: "user", content: query }],
      });

      const answer = response.content[0].type === "text" ? response.content[0].text : "";
      const brandMentioned = answer.toLowerCase().includes(BRAND_NAME.toLowerCase()) ||
        answer.toLowerCase().includes("procourtsurfaces");
      const competitorsMentioned = COMPETITOR_NAMES.filter(c =>
        answer.toLowerCase().includes(c.toLowerCase())
      );

      results.push({ query, brandMentioned, competitorsMentioned });

      // Rate limit
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error on query "${query}":`, err);
      results.push({ query, brandMentioned: false, competitorsMentioned: [] });
    }
  }

  // Print results
  const date = new Date().toISOString().split("T")[0];
  const brandCount = results.filter(r => r.brandMentioned).length;
  const brandRate = ((brandCount / results.length) * 100).toFixed(1);

  console.log(`\n## Monthly AEO Check — ${date}\n`);
  console.log(`| Query | Brand | Competitors |`);
  console.log(`|-------|-------|-------------|`);
  for (const r of results) {
    console.log(
      `| ${r.query} | ${r.brandMentioned ? "YES" : "NO"} | ${r.competitorsMentioned.join(", ") || "None"} |`
    );
  }
  console.log(`\n**Brand mention rate:** ${brandCount}/${results.length} (${brandRate}%)`);
  console.log(`\nAppend these results to aeo-metrics.md under "Monthly Check Log".`);
}

main();
```

---

## Monthly Check Log

| Date | Brand Rate | CourTex Rate | KMS Rate | AI Referrals | GSC Clicks (30d) | Notes |
|------|-----------|-------------|----------|-------------|-------------------|-------|
| 2026-02-24 | 2/15 (13%) | 7/15 (47%) | 7/15 (47%) | Not tracked | 21 (90d) | Baseline — Phase 1 audit |

---

## 90-Day Targets

| Metric | Baseline (Feb 24) | Target (May 24) |
|--------|-------------------|-----------------|
| AEO score (avg) | 8.3/18 (46%) | 14+/18 (78%) |
| Brand mention rate | 2/15 (13%) | 5/15 (33%) |
| GSC total clicks (90d) | 21 | 100+ |
| GSC total impressions (90d) | 2,905 | 8,000+ |
| Ranked keywords | 17 | 50+ |
| Page-1 keywords (non-branded) | 0 | 3+ |
| Reddit karma | 0 | 500+ |
| Total site word count | ~4,845 | ~12,000+ |
| AI referral sessions | Unknown | Tracked |
