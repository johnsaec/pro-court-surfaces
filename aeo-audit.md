# AEO Audit: Pro Court Surfaces
**Date:** February 24, 2026
**Domain:** www.procourtsurfaces.com
**Auditor:** Claude (AEO Skill v2)

---

## Executive Summary

Pro Court Surfaces is **nearly invisible to AI answer engines**. The brand appears in only 2 of 15 buyer queries tested (13%) — both branded or semi-branded. Zero presence on any non-branded, cost, GC-specific, or informational query. Meanwhile, competitors CourTex and KMS each appear in ~47% of tested queries. The site has only 17 ranked keywords in Google, with just one in the top 20 (branded term at #12). The site's ~4,800 words of total content are thin by AI extraction standards, headers are topic labels instead of questions, there's no answer-first structure, and blog/commercial pages are orphaned from main navigation. Reddit presence is zero. The biggest opportunity: Pro Court Surfaces owns an entirely uncontested positioning (GC surfacing sub) that no competitor claims — but the content doesn't make this extractable by LLMs.

---

## Content Structure Scores

Scored 0–3 per signal. Max score per page: 18.

### Homepage ( / )
| Signal | Score | Notes |
|--------|-------|-------|
| Question headers | 0 | All H2s are topic labels: "What We Do", "See the Difference", "Our Work", etc. |
| Answer-first | 0 | Conversion-focused hero → services → portfolio flow. No direct answers. |
| Chunk density | 1 | Very thin — ~720 words total, most sections under 80 words. |
| FAQ section | 2 | 5-question FAQ with accordion UI and question-format H3s. |
| Schema markup | 3 | LocalBusiness (12 cities, geo, hours) + Service (3 offers) + FAQPage (5 Qs). Strong. |
| Crawlability | 2 | SSR via Next.js, but all body sections are `"use client"` components. JSON-LD is server-rendered. AI crawlers that don't execute JS see schema but no body content. |
| **Total** | **8/18** | |

### Blog: Court Construction Costs ( /blog/court-construction-costs )
| Signal | Score | Notes |
|--------|-------|-------|
| Question headers | 1 | Mostly topic labels ("Tennis Court Construction Costs"). FAQ schema has questions but they aren't visible on-page. |
| Answer-first | 2 | Cost tables lead each section with data, then context. Good. |
| Chunk density | 2 | ~1,150 words across 7 sections. Most sections 120–250 words. |
| FAQ section | 1 | FAQ exists in schema only (4 Qs) — not rendered as visible content. |
| Schema markup | 3 | Article + FAQPage. datePublished, dateModified, author, publisher. |
| Crawlability | 3 | Server Component — clean SSR HTML. Best crawlable page on the site. |
| **Total** | **12/18** | |

### Blog: Court Surface Types ( /blog/court-surface-types )
| Signal | Score | Notes |
|--------|-------|-------|
| Question headers | 1 | Topic labels ("Acrylic Court Surfaces", "Modular Tile Systems"). FAQ section uses questions. |
| Answer-first | 2 | Recommendation section leads with answer ("spec acrylic"). Pros/cons format is extractable. |
| Chunk density | 2 | ~1,540 words. Comparison table, pros/cons, FAQ — good variety. |
| FAQ section | 3 | Visible on-page FAQ (6 Qs) with BlogFAQ accordion + FAQPage schema (5 Qs). Note: schema misses 1 question. |
| Schema markup | 3 | Article + FAQPage. Full metadata. |
| Crawlability | 3 | Server Component — clean SSR. |
| **Total** | **14/18** | |

### Commercial / GC Page ( /commercial )
| Signal | Score | Notes |
|--------|-------|-------|
| Question headers | 1 | Mix of conversational ("We Know What You're Thinking") and topic labels. FAQ H3s are questions. |
| Answer-first | 1 | Objection-handling structure (quote → response) is good for AI extraction but doesn't lead with direct answers. |
| Chunk density | 2 | ~890 words. Clean sections: hero, straight talk, scope, benefits, FAQ, calculator. |
| FAQ section | 2 | 6 on-page Q&A pairs (not accordion). But schema only has 3 of 6 — mismatch. |
| Schema markup | 2 | LocalBusiness + FAQPage. Missing: no canonical URL, FAQ schema incomplete (3 of 6 Qs). |
| Crawlability | 2 | CommercialSections is `"use client"`. JSON-LD is server-rendered. Body content needs JS execution. |
| **Total** | **10/18** | |

### Blog Index ( /blog )
| Signal | Score | Notes |
|--------|-------|-------|
| Question headers | 0 | One H1 topic label. Post titles as H2s. |
| Answer-first | 0 | Post listing only — ~60 words. No substantive content. |
| Chunk density | 0 | Essentially empty — just 2 post cards. |
| FAQ section | 0 | None. |
| Schema markup | 0 | None. No BlogPosting list, no BreadcrumbList. |
| Crawlability | 3 | Server Component — clean SSR. |
| **Total** | **3/18** | |

### Terms ( /terms )
| Signal | Score | Notes |
|--------|-------|-------|
| Question headers | 0 | Section titles ("Scope of Work", "Payment Terms") — not questions. |
| Answer-first | 0 | Legal boilerplate. N/A for AEO. |
| Chunk density | 1 | ~485 words across 7 accordion sections. |
| FAQ section | 0 | None. |
| Schema markup | 0 | None. No page title, no meta description, no H1. |
| Crawlability | 2 | Accordion components are client-rendered, default-expanded. |
| **Total** | **3/18** | |

### Score Summary

| Page | URL | Questions | Answer-First | Chunks | FAQ | Schema | Crawlable | Total |
|------|-----|-----------|-------------|--------|-----|--------|-----------|-------|
| Homepage | / | 0 | 0 | 1 | 2 | 3 | 2 | **8/18** |
| Court Construction Costs | /blog/court-construction-costs | 1 | 2 | 2 | 1 | 3 | 3 | **12/18** |
| Court Surface Types | /blog/court-surface-types | 1 | 2 | 2 | 3 | 3 | 3 | **14/18** |
| Commercial (GC) | /commercial | 1 | 1 | 2 | 2 | 2 | 2 | **10/18** |
| Blog Index | /blog | 0 | 0 | 0 | 0 | 0 | 3 | **3/18** |
| Terms | /terms | 0 | 0 | 1 | 0 | 0 | 2 | **3/18** |

**Overall Average: 8.3 / 18 (46%)**

---

## AI Crawler Access

Checked via robots.txt at `https://www.procourtsurfaces.com/robots.txt`:

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot (OpenAI/ChatGPT) | ✅ Allowed | Not mentioned — falls under `User-agent: *` Allow: / |
| ClaudeBot (Anthropic) | ✅ Allowed | Not mentioned — falls under wildcard |
| PerplexityBot | ✅ Allowed | Not mentioned — falls under wildcard |
| Google-Extended (Gemini) | ✅ Allowed | Not mentioned — falls under wildcard |
| CCBot (Common Crawl) | ✅ Allowed | Not mentioned — falls under wildcard |
| Applebot-Extended | ✅ Allowed | Not mentioned — falls under wildcard |
| FacebookBot (Meta AI) | ✅ Allowed | Explicitly allowed: `User-agent: facebookexternalhit` Allow: / |

**Sitemap:** `https://procourtsurfaces.com/sitemap.xml` — referenced in robots.txt.

**No AI crawlers are blocked.** This is correct — no action needed here.

---

## Gated Content Findings

| Content | Gated? | Assessment |
|---------|--------|------------|
| Pricing / cost data | No — published in blog posts | ✅ Good. Cost tables are publicly crawlable. |
| ROI Calculator | No — on /commercial page | ✅ Good. Interactive but JS-rendered — outputs aren't crawlable. |
| Quote form | No gate (form on /commercial) | ✅ No issue. |
| Portfolio / project photos | No gate | ✅ Accessible. |
| Case studies | ❌ None exist | **Gap:** No case studies or named client references on the site. |
| Comparison guides | Partially — blog posts cover this | Surface types comparison is public. No head-to-head competitor comparison. |

**Key Finding:** Nothing is improperly gated. The real issue is **missing content, not gated content.** The site has ~4,800 total words across 6 pages — competitors have 10x-50x more indexed content.

---

## Keyword Ranking Baseline (DataForSEO)

### Current Rankings (17 total keywords)

| Keyword | Volume/mo | Position | Page |
|---------|-----------|----------|------|
| pro court surfacing | 30 | **12** | / |
| procourt | 140 | 32 | / |
| pro court | 480 | 37 | / |
| quality court | 210 | 40 | / |
| pickleball court construction companies | 720 | 65 | / |
| pickleball surfaces | 170 | 67 | / |
| acrylic pickleball courts | 390 | 68 | / |
| tennis court repair company | 50 | 68 | / |
| pickleball court painting contractors | 50 | 69 | / |
| pro cushion tennis courts | 30 | 75 | / |
| pickleball court repair | 90 | 79 | / |
| pro courts | 480 | 81 | / |
| pickleball court installation company | 50 | 81 | / |
| court surfaces | 140 | 83 | / |
| pickleball court surface options | 50 | 85 | / |
| tennis court construction companies | 480 | 92 | / |
| pickleball surface | 170 | 97 | / |

**Only 1 keyword in top 20** (branded: "pro court surfacing" at #12).
**All rankings point to homepage** — blog and commercial pages rank for nothing.
**Zero page-1 visibility** for any non-branded term.

### Biggest Volume Opportunities (Not Ranking)

| Keyword | National Volume | Current Rank |
|---------|----------------|--------------|
| pickleball court construction | 12,100 | Not ranking |
| pickleball court construction cost | 2,900 | Not ranking |
| tennis court resurfacing | 1,600 | Not ranking |
| tennis court resurfacing contractors | 880 | Not ranking |
| tennis court resurfacing cost | 590 | Not ranking |
| tennis court resurfacing near me | 480 | Not ranking |
| pickleball court resurfacing | 480 | Not ranking |

### SERP Analysis: "pickleball court installer Austin TX"

**No Google AI Overview** appeared for this query.

**Top 5 organic results:**
1. pickletile.com
2. sportcourtofaustin.com
3. courtexconstruction.com
4. buildmycourts.com
5. pickleballcourtaustin.com

**procourtsurfaces.com does not appear** in top 10 organic or paid.

---

## AI Visibility Baseline

### Spot Check Results (15 queries)

| # | Query | Brand Found? | Competitors Found |
|---|-------|-------------|-------------------|
| 1 | Pro Court Surfaces Austin Texas | **YES** (#1) | CourTex, KMS, Sport Court of Austin |
| 2 | Pro Court Surfaces reviews | NO | None (brand confusion with FL company) |
| 3 | best court resurfacing company Austin TX | **YES** (#7) | CourTex (#3-6), KMS (#2) |
| 4 | pickleball court installer Austin Texas | NO | CourTex (#1, #4, #7) |
| 5 | tennis court resurfacing contractors Central Texas | NO | CourTex (#7), KMS (#4) |
| 6 | court surfacing subcontractor for GCs Texas | NO | KMS (#7) |
| 7 | ATS Sports Acrytech installer Texas | NO | None (Master Systems DFW) |
| 8 | pickleball court resurface cost Texas 2026 | NO | None |
| 9 | tennis court construction costs Texas GC budget | NO | CourTex (#3) |
| 10 | court surface types acrylic vs tile | NO | None |
| 11 | court surfacing sub amenity center Austin | NO | KMS (#10) |
| 12 | sport court surfacing bid for GC | NO | KMS (#7), Aguilar (#9) |
| 13 | best court surfacing sub apartment complex TX | NO | KMS (#5) |
| 14 | hire to resurface tennis courts apartment Austin | NO | CourTex (#2), KMS (#5), Aguilar (#8) |
| 15 | best surface for outdoor pickleball Texas heat | NO | None |

### Visibility Summary

| Metric | Result |
|--------|--------|
| **Brand mention rate** | **2 / 15 queries (13%)** |
| **CourTex mention rate** | 7 / 15 (47%) |
| **KMS mention rate** | 7 / 15 (47%) |
| **Aguilar mention rate** | 2 / 15 (13%) |
| Branded queries with brand | 1 / 2 (50%) — "reviews" query returns FL company |
| Non-branded buyer intent | 1 / 5 (20%) — only "best resurfacing Austin" |
| Cost / informational | 0 / 3 (0%) |
| GC-specific queries | 0 / 3 (0%) |
| Long-tail / AI-style | 0 / 2 (0%) |

---

## Reddit Presence

| Subreddit | Score | Members | Opportunity |
|-----------|-------|---------|-------------|
| r/pickleball | 0 / 3 | 100K+ | HIGH — court construction, surface Qs, contractor recs |
| r/tennis | 0 / 3 | 1M+ | MEDIUM — resurfacing cost/timeline questions |
| r/austin | 0 / 3 | 500K+ | HIGH — local authority, venue/contractor recs |
| r/HomeImprovement | 0 / 3 | 5M+ | MEDIUM — backyard court builds, cost Qs |
| r/HOA | 0 / 3 | Active | MEDIUM-HIGH — amenity center projects, tennis-to-pickleball |
| r/Construction | 0 / 3 | Active | MEDIUM — specialty sub discussions |
| r/GeneralContractor | 0 / 3 | Moderate | MEDIUM — sub relationships, specialty trades |

**Overall Reddit Score: 0 — No Presence**

Zero mentions of "Pro Court Surfaces" or "procourtsurfaces" anywhere on Reddit. No Reddit account exists. No participation in any subreddit.

**Brand confusion risk:** "Pro Court Surfacing LLC" (Orlando, FL) has a near-identical name. Without establishing Reddit presence, any future mentions could be attributed to the wrong company.

**Competitor Reddit presence is also low** — this is a first-mover opportunity. SportMaster and BuildMyCourts have the strongest brand recognition in court-related threads.

---

## Internal Linking & Navigation Gaps

| Issue | Impact |
|-------|--------|
| Homepage links to NO subpages | /blog and /commercial are orphaned — crawlers may not discover them |
| Navbar has only anchor links (#services, #portfolio, etc.) | No nav links to /blog, /commercial |
| Footer only links to /terms | Blog and commercial pages get zero link equity from homepage |
| Blog posts don't cross-link | Cost blog doesn't link to surface types blog, or vice versa |
| No breadcrumb navigation | No BreadcrumbList schema on any page |

**This is a critical structural issue.** Search engines and AI crawlers that start at the homepage cannot navigate to the blog or commercial pages. These pages depend entirely on the sitemap for discovery.

---

## Schema Markup Gaps

### Present (Good)
- ✅ LocalBusiness on homepage (12 cities, geo, hours, address, phone)
- ✅ Service with OfferCatalog on homepage
- ✅ FAQPage on homepage, both blog posts, and commercial page
- ✅ Article schema on both blog posts (with datePublished/dateModified)

### Missing
- ❌ **Organization** in root layout — should be site-wide, not just homepage
- ❌ **BreadcrumbList** — none on any page
- ❌ **VideoObject** — homepage has a drone hero video with no schema
- ❌ **Speakable** — not implemented on any page
- ❌ **sameAs** — no social profile links in any schema (no Google Business, no LinkedIn, no Reddit)
- ❌ **Review/AggregateRating** — no review schema (no Google reviews displayed)

### Schema Mismatches
- /commercial FAQPage has 3 questions but page displays 6 — 3 are invisible to schema consumers
- /blog/court-surface-types FAQPage has 5 questions but page displays 6 — 1 missing from schema
- /blog/court-construction-costs FAQPage has 4 questions that aren't rendered on-page at all — schema-only FAQ

---

## Critical Findings (Ranked by Priority)

### 1. CRITICAL: Near-zero non-branded visibility
Pro Court Surfaces appears in only 2 of 15 queries (13%). CourTex and KMS each appear in 47%. The GC subcontractor positioning — the company's primary differentiator — returns zero results in AI or traditional search. **If Matt the estimator searches for a court surfacing sub, he will not find Pro Court Surfaces.**

### 2. CRITICAL: Content is too thin for AI extraction
~4,800 total words across 6 pages. The homepage has ~720 words. For context, a single long-form blog post on a competitor site (HomeGuide, Angi, SportVenueCalculator) has 3,000-5,000 words. LLMs need substantive, structured text to extract and cite. There simply isn't enough content for an AI to learn what Pro Court Surfaces is and does.

### 3. CRITICAL: Blog and commercial pages are orphaned
No navigation links from homepage to /blog or /commercial. No cross-links between pages. Crawlers starting at the homepage have no path to the site's most valuable content. This directly suppresses indexing and ranking.

### 4. HIGH: Headers are topic labels, not questions
Across all pages, H2/H3 headers use topic labels ("What We Do", "Tennis Court Construction Costs") instead of natural questions ("How much does tennis court construction cost in Texas?"). LLMs pattern-match on question→answer structure. Topic labels require the AI to infer the question, which reduces citation probability.

### 5. HIGH: No answer-first content structure
The homepage is a conversion funnel (hero → services → portfolio → contact). Blog posts lead with context before data. The commercial page uses objection-handling format. None of these structures give LLMs a clean "question → direct answer → supporting detail" pattern to extract.

### 6. HIGH: Zero Reddit presence
Reddit is a direct input to ChatGPT (OpenAI partnership) and Perplexity (Reddit data access). Pro Court Surfaces has zero mentions, zero participation. Competitors are also absent — this is a first-mover opportunity in r/pickleball (100K members) and r/austin (500K members).

### 7. MEDIUM: Schema mismatches and gaps
FAQ schema doesn't match on-page FAQ content on /commercial (3 vs 6 Qs) and /blog/court-surface-types (5 vs 6 Qs). Missing Organization schema in root layout. No BreadcrumbList, no VideoObject for hero video, no sameAs social links, no AggregateRating.

### 8. MEDIUM: Brand confusion risk
"Pro Court Surfacing LLC" (Orlando, FL) has a near-identical name and appears in search results for "Pro Court Surfaces reviews." Without stronger branded signals (Google Business Profile reviews, social profiles, Reddit presence), AI systems may conflate the two companies.

### 9. MEDIUM: All rankings point to homepage
Blog posts and /commercial rank for zero keywords. The homepage carries the entire SEO burden. This concentrates risk and wastes the topical authority that dedicated service/content pages could build.

### 10. LOW: No Google AI Overview for key queries
DataForSEO SERP analysis shows no AI Overview triggered for "pickleball court installer Austin TX." This means traditional organic still controls visibility for this niche — AI Overviews aren't yet cannibalizing clicks. This could change as Google expands AI Overviews to more local service queries.

---

## Appendix: Site Crawl Technical Notes

- **Platform:** Next.js 16 (App Router) on Vercel
- **Rendering:** SSR for page shells + JSON-LD; body content in `"use client"` components (homepage, commercial). Blog articles are full Server Components (best crawlability).
- **Sitemap:** Referenced in robots.txt at `https://procourtsurfaces.com/sitemap.xml`
- **Total indexed pages:** ~6 (homepage, 2 blog posts, commercial, terms, blog index)
- **Total site words:** ~4,845
