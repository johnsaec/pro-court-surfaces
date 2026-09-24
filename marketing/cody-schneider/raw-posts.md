# Cody Schneider — raw posts (GTM / marketing engineering)

Source: LinkedIn posts by Cody Schneider (Graphed.com). Saved verbatim 2026-09-23, unorganized.

---

## Post 1 — Google Ads agency run through Claude Code

We just helped a Google ads agency cut their labor costs by 90% in 30 days

They're now managing 23 clients entirely through Claude code

{follow me Cody Schneider to learn marketing engineering}

They charge their clients $1,500 a month to manage the account

Their revenue is $34,500

Their new costs are $2000

Their margin went form 30% to 94% in a month

crazy

Anyone can do this

Here's how

First connected their clients Google ads Google analytics and CRM to a data warehouse

Then got a Google Ads API key

And created a bridge so that their Claude code can query the data warehouse for reads and do writes through the Google Ads API to manage the account

They then set up a testing and winners campaign for each client

Winning keywords, get their own ad set and move to the winners campaign

Each ad set gets a dedicated landing page created using Claude code

Winning keywords are connected to real converting deals in the CRM so they know where to spend money

All of this happens without them going into Google Ads

If you want this get started for free https://lnkd.in/eJqV6pTm

---

## Post 2 — Before/after static ads

Marketing Engineering you can do today

before and after static ads for your saas

{follow me Cody Schneider to learn marketing engineering}

how

First use exa ai api to scrape Reddit threads with people talking about their pain points and desired outcomes that your product solves

And make a template that's before or after like the one attached

Your brand style guide fonts colors etc

Then use what you scraped to make the before after statics

It's chat gp2 image 2.5 to generate the creative

Every ad that you make added to a Postgres database with the JSON that you use to make the ad and the pain point outcome variable all the information that you can store. This will be used for future when we're doing this recursive loop

bulk upload all of this to Facebook ads via the API into a single ad set

prune the losers, let the winners keep spending with the ad budget available

The next round of creative that you do, let it be influenced by the winners

You can build this whole thing in the next hour with Graphed CLI

just get claude or codex this post

Start a free trial graphed.com/platform

---

## Post 3 — GTM engineering 101 (signal-based outbound)

GTM engineering 101

Find a signal for outbound, like hiring for a position

{follow me Cody Schneider to learn GTM engineering}

EG say you're selling a bookkeeping software, if they're hiring a bookkeeper, you should reach out

Use apify to source job post listings from LinkedIn and extract the company

Use exa ai to research the company

Then find the company org structure by using something like Apollo

Have AI picked a decision maker based on titles org structure

Do a waterfall enrichment for their email

validate the email with million verifier

All this gets added to a Postgres database for you to build out a total addressable market map

And add the email and name to instantly campaign

Three word subject line

160 character or less, email

Focus on selling the desired outcome they want

people who positive response, Let that influence your next round of research

You can build this whole thing in the next hour with Graphed CLI

just get claude or codex this post

Start a free trial graphed.com/platform

---

## Post 4 — AI search via "best X for Y" posts

Ok why didn't I do this sooner, AI search is easy if you just do this.

And if you let me know you're business below, I'll send you the keywords for your business.

{follow me Cody Schneider to learn marketing engineering}

Use data for SEO to find bottom of phone keywords.

Keywords you're looking for our best X for Y

Then research was ranking on page one currently by using serper to extract the SERP results

Write the post based on this research

Published to your CMS via API

You can do three of these per day to start

Then include your product within these best X for Y

Track the referral traffic, UTM referer from chatgpt, gemini etc

And then also include called actions on the page. So if people click through to the citation, they sign up.

If you want this, get it below.

---

## Post 5 — What's happening in marketing engineering (the agent stack)

i need you to understand what is happening in marketing engineering right now

i want to try to explain this to you

{follow me Cody Schneider to learn marketing engineering}

if you give your claude code or codex:

- Data pipeline
- Data warehouse
- Cloud Server
- Media Storage (Images, Videos)
- Databases for agents (Postgres databases)
- Recurring tasks (Cron jobs)
- Application Authentication
- Sharable Links
- Git manager
- Tools API gateway (Nano banana, Apollo IO, Seed dance, Apify etc)

you can do in a day what a fortune 500 would do in a year

today you can make 40 facebook ads with seed dance 2.5

launch 30 google ads ad groups via google ads api

100 landing pages in your CMS for ads or SEO

write 3 guest blog posts for backlinks

cold email podcast hosts and book yourself on 4 podcasts

edit two vlog videos using astra and davinci resolve MCP

scheduled 25 tweets across 3 accounts

write 2 pieces of scripting software to give away as linkedin lead magnets

i dont think you understand what is happening in marketing engineering right now

and if you want this right now get started for free here

---

## Post 6 — AI UGC video ads that look like the customer

I wish I did this sooner

if your ads look and sound like the person you're selling to they perform so much better

{follow me Cody Schneider to learn marketing engineering}

how we're getting this to happen

find a good eleven labs voices like natasha

then generate an image of what your target customer looks like using chatgpt image 2.5

write a script with a hook + desired outcome

then send this all to seed dance 2.5 API

make 50 of these for $2.50 per video

upload all of them simultaneously to a facebook ad campaign CBO ad budget with open targeting on the ad set

all 50 into the same ad set

then let the andromeda find winning creative

prune creative that is spending but inefficient

---

## Post 7 — Competitor ad library teardown → gap ads

GTM engineering today

find all of your competitors Facebook ad libraries

{follow me Cody Schneider to learn marketing engineering like this}

and then use the apify API to extract all of their creative

take all of these and use gemini to write descriptions about the images and the videos

specifically focusing on the angles, the promises and the outcomes

once you have this, you have a map of how people are talking about themselves in the category

and have Claude analyze where are the gaps are in the market for us to go in after

to validate these gaps that it ideates have it scrape reddit using exa ai

at this point, you've got a good map of the industry

now go use nano banana and seed dance to make ads based on this analysis

and then upload these ads to Facebook via your API key

1 day later

connect graphed .com MCP into claude code to analyze what's working

use facebook ads API to turn off losers and move winners to their own ad sets with dedicated budget

once the system works, deploy this to a server so it runs on its own

---

## Post 8 — Video editing with DaVinci Resolve MCP + Codex

let go your $1600/mo video editor

davinci resolve MCP and GPT-6 Astra can now do video editing

here's how to get codex to do it

{follow me Cody Schneider to learn marketing engineering}

buy resolve studio 21.1

file > setup ai assistants. open chatgpt desktop, switch to work mode, tell codex to test the davinci resolve mcp connection

hand it the footage folder

from there it can transcribe the take, put a-roll and screen on separate tracks, cut dead air, pick cutaways, pull stills and b-roll that match 2–3 refs you attach, build titles and lower thirds, key greenscreen, do splitscreen, animate graphics, apply a power grade, mix audio to youtube loudness, and render 4k

a raw 75-minute recording can come back as a finished cut

a folder of clips can come back graded

a few hours of travel footage can come back as a 20-minute video in under 10 minutes

it talks to resolve through mcp

media pool, timeline, color page, render queue and no clicking around the gui

prompts that work:

cut the pauses.
match b-roll to these refs.
use this power grade.
this shot is overexposed, that one has a magenta tint, fix contrast, analyze and balance it again if it still looks off.
captions and titles.
greenscreen or splitscreen, or pick the layout.
mix it. render.

save that as a skill so you are not rewriting the same brief every video.

the last 5% of timing still needs your ear

$295 once for studio. astra tokens after that. studio is required for the official mcp. community servers exist. long runs chew a 20x plan, so reuse the skill

---

## Post 9 — "What to build first" (Patrick: "this may be the real bible")

if your "marketing engineer" doesn't know what to build first, please for the love of god fire them because they're fleecing you. or send them this so I don't have an aneurysm.

{follow me Cody Schneider to learn marketing engineering}

everything below is just agents, agents are just code with a thinking loop, connected to a live data stream they are making decisions on

to do everything below you need to give you coding agent access to the following:

- Data pipeline
- Data warehouse
- Cloud Server
- Media Storage (Images, Videos)
- Databases for agents (Postgres databases)
- Recurring tasks (Cron jobs)
- Application Authentication
- Sharable Links
- Git origin for multiplayer access
- API gateway (Nano banana, Apollo IO, Seed dance, Apify etc)

paid ads

google ads

find bottom of funnel keywords related to the product using data for SEO API and a coding agent then build a campaign that's optimizing for a conversion action as deep as you can go within the funnel structure your campaign with as many ad sets as you can ad sets are keyword families the keywords the ads and landing pages all align negative match any keywords that you show up for that don't produce results or don't have a search intent that's related to the product use an LLM to judge search intent

facebook ads

Figure out the desired outcomes of your target customer by scraping social media Then build ads around these desired outcomes present your products as the ads Make statics and UGC, they both work And then structure the campaign like this one Advantage+ campaign, broad, CBO, optimize for the deepest event that gets ~50/week, and spend all your time making more creative

linkedin ads

scrape linkedIn creators content within your category and remix their content into your own then publish that content and if the content already went viral, your remix version will also go viral then use that post to do a thought leadership ad have a call to action within the thought leadership ad to go and sign up for the thing and anybody who engages with the thought leadership ads, we're going to save those for cold outbound below and optimize for conversion action as deep within the funnel as you can go

SEO

traditional SEO

find bottom of funnel keywords that are related to the brand X vs Y, X alternative, X review, how to X that you integrate with then research what is ranking on page one for those keywords extract that right in article that's based on this put your own spin on it by providing a transcript of your unique point of view publish this article, refresh this article monthly

AI search

I have something to tell you AI search is just SEO, but the best content for this is best X for Y AI search sources, the results from page 1 through 3, you need to show up there how do you show up there by doing traditional SEO

_[Paste ends here. The post mentions "cold outbound below," but that section wasn't included.]_

---

## Post 10 — Facebook Ads explained (low IQ / midwit / high IQ)

Facebook Ads Explained

Low IQ:

one campaign, broad, all of USA, make a lot of ads, kill the losers.

{follow me Cody Schneider to learn marketing engineering}

Midwit:

14 ad sets split by interest stack ("Data Analytics," "Tableau," "CFOs 25–34")
1% / 2% / 3% lookalikes each in their own ad set
ABO with $20/day per ad set so nothing ever exits learning
Manual bid caps because "let's control CPA"
Exclusion lists layered 3 deep
Placement exclusions (turn off Audience Network, it's "junk traffic")
Dayparting to business hours
Separate cold / warm / hot "funnel" campaigns
Optimizing for landing page views or leads instead of the actual money event
Weekly optimization sessions moving budget between ad sets on 6-conversion samples

High IQ:

one Advantage+ campaign, broad, CBO, optimize for the deepest event that gets ~50/week, and spend all your time making more creative


---

## Post 11 — Google Ads explained (low IQ / midwit / high IQ)

Google Ads Explained

Low IQ:

One search campaign, a few dozen keywords on broad, Max Conversions, write good ads, kill the losers.

{follow me Cody Schneider to learn marketing engineering}

Midwit:

SKAGs — 300 ad groups, one keyword each, "for maximum Quality Score control"
Same keyword duplicated across three campaigns split by match type (Exact / Phrase / Broad), with cross-negatives between them so they don't "cannibalize"
Alpha/Beta structure: Beta campaign discovers queries, graduates them to Alpha, negatives them out of Beta
Manual CPC  or tCPA set 40% below actual CPA because "that's our target"
2,400 negative keywords, half of them added from a "universal negative list" they downloaded in 2019
Search Partners off, Display Network off, everything off
Bid adjustments stacked: -20% mobile, +15% desktop, -30% weekends, +10% for the 3 zip codes with good historical CPA
Brand campaign broken out and left running so the account ROAS looks like 12
RSAs with every asset pinned to a fixed position, defeating the entire mechanism
Optimizing to form fills instead of the deal that closed
Weekly bid-adjustment sessions on ad groups with 4 conversions

High IQ:

A handful of campaigns (one or two Search, PMax if the inventory/feed justifies it), broad match, Max Conversions or tROAS with a real target, consolidated budget, offline conversion import feeding actual closed revenue back to Google and spend all your time on offer, landing pages, and asset volume


---

## Post 12 — AI data analyst for the marketing team (warehouse + semantic layer + MCP)

Ok this is crazy I just gave my whole marketing team an AI data analyst that lives in their Claude Code and their Claude Cowork and their Claude IOS app.

{follow me Cody Schneider to learn marketing engineering}

It has access to every data source in our stack and can build live dashboards on the fly, do sales forecasting, and improve blog post content based on your data.

Here's how I did it:

1. First I created a data pipeline and data warehouse to unify my data

2. This data syncs continuously and is constantly being cleaned

3. Then I created a semantic layer so the AI data analyst understand the underlying data, with out this the analyst will just guess

4. Then I created an MCP integration that allows me to interact with the data warehouse from Claude Code or Co-Work or the iOS app

How I've used this so far for GTM engineering:

- I had it analyze all the Facebook ads CPM data and then turn off all the ads where the CPM was above a threshold

- I had a pull the top 100 blog posts from a traffic standpoint. Then I checked our Google Search Console query data vs what is published in our CMS for those pages, and had Claude refresh the posts based on keywords we we're accidentally ranking for but we're on the page

- I had it do HubSpot forecasting in pipeline, base case, and commit formats for me based on of the historical in our CRM

(Patrick's note on this one: "structure")
