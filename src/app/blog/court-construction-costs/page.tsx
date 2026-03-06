import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CostTable } from "../_components/CostTable";
import { CalloutBox } from "../_components/CalloutBox";
import { HiddenCostCard } from "../_components/HiddenCostCard";
import { BlogCTA } from "../_components/BlogCTA";

export const metadata: Metadata = {
  title: "Court Construction Costs in Texas: What GCs Need to Budget (2026) | Pro Court Surfaces",
  description: "Realistic court construction cost breakdowns for GC estimators in Central Texas. Tennis, pickleball, and multi-sport court budgeting data for 2026 bids.",
  keywords: "cost of tennis court construction, tennis court contractors, tennis court construction companies, court construction costs Texas",
  openGraph: {
    title: "Court Construction Costs in Texas: What GCs Need to Budget (2026)",
    description: "Realistic court construction cost breakdowns for GC estimators in Central Texas.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/court-construction-costs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Court Construction Costs in Texas: What GCs Need to Budget (2026)",
    description: "Realistic court construction cost breakdowns for GC estimators in Central Texas.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/court-construction-costs" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Court Construction Costs in Texas: What GCs Need to Budget in 2026",
  description: "Realistic court construction cost breakdowns for GC estimators in Central Texas.",
  author: { "@type": "Organization", name: "Pro Court Surfaces" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-02-21",
  dateModified: "2026-02-21",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/court-construction-costs" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does tennis court construction cost in Texas?", acceptedAnswer: { "@type": "Answer", text: "Full tennis court construction in Central Texas typically runs $45,000\u2013$120,000+ per court. Surfacing alone ranges from $7,500\u2013$15,000 per court." } },
    { "@type": "Question", name: "How much does it cost to install a pickleball court in Texas?", acceptedAnswer: { "@type": "Answer", text: "A single pickleball court in Central Texas runs $20,000\u2013$50,000 for full construction. Surfacing on an existing slab typically costs $3,500\u2013$7,000 per court." } },
    { "@type": "Question", name: "What hidden costs do GCs miss on court construction projects?", acceptedAnswer: { "@type": "Answer", text: "Common hidden costs include callbacks ($5,000/court), schedule delays ($1,500/day), change orders ($2,000/court), and early resurfacing within 3\u20135 years." } },
    { "@type": "Question", name: "How long does court surfacing take?", acceptedAnswer: { "@type": "Answer", text: "Acrylic court surfacing typically takes 5\u201310 business days per project depending on court count and weather." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Court Construction Costs", item: "https://www.procourtsurfaces.com/blog/court-construction-costs" },
  ],
};

const tocItems = [
  { href: "#why-cost-clarity", label: "Why do GCs need accurate court construction cost data?" },
  { href: "#tennis-costs", label: "How much does tennis court construction cost in Texas?" },
  { href: "#pickleball-costs", label: "How much does it cost to build a pickleball court in Texas?" },
  { href: "#multi-sport-costs", label: "How much do multi-sport courts cost to build?" },
  { href: "#cost-variance", label: "What factors affect court construction costs?" },
  { href: "#hidden-costs", label: "What hidden costs do GCs miss on court projects?" },
  { href: "#accurate-bid", label: "How do I get an accurate court surfacing bid?" },
];

export default function CourtConstructionCostsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogHero
        category="Cost Guide"
        date="Feb 21, 2026"
        readTime="12 min read"
        title="Court Construction Costs in Texas: What GCs Need to"
        titleAccent="Budget in 2026"
        subtitle="Real cost data for estimators building bids on tennis, pickleball, and multi-sport court projects in Central Texas. No fluff, just numbers you can use."
      />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <nav className="mb-12 p-6 bg-white border border-gray-200 rounded-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">In This Article</p>
          <ol className="space-y-2">
            {tocItems.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="flex items-center gap-3 text-sm text-brand-text-muted hover:text-brand-blue transition-colors py-1">
                  <span className="text-brand-text-muted font-serif">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="why-cost-clarity">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Why do GCs need accurate court construction cost data?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">If you are building an estimate for an amenity center with sport courts, you already know the problem: surfacing numbers are all over the map. One sub bids $5,000 per court, another bids $12,000, and neither one breaks down what is actually included. You are left guessing which number to carry, and guessing on a bid is how you end up eating costs or losing the job.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">This guide is built for GC estimators working on multi-family and amenity center projects in Central Texas. We are going to break down real cost ranges by court type, walk through what drives price variance, and flag the hidden costs that blow up budgets after the contract is signed.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">The goal is simple: give you numbers you can actually use when you are building your next bid.</p>
        </section>

        <section id="tennis-costs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much does tennis court construction cost in Texas?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">{"A standard tennis court is 60' x 120' (including overruns). Full construction from bare site to playable surface involves multiple trades and scopes. Here is what each component typically costs in Central Texas as of 2026."}</p>
          <CostTable title="Tennis Court Cost Breakdown (Per Court)" headers={["Component", "Cost Range"]} rows={[
            { label: "Site Prep & Grading", value: "$5,000 \u2013 $15,000" },
            { label: "Concrete Slab (4\u20136\u2033 post-tension or rebar)", value: "$25,000 \u2013 $45,000" },
            { label: "Acrylic Surface System", value: "$7,500 \u2013 $15,000" },
            { label: "Line Striping", value: "$800 \u2013 $2,000" },
            { label: "Net Posts & Hardware", value: "$1,500 \u2013 $3,500" },
            { label: "Fencing (10\u2019 chain link, per court)", value: "$8,000 \u2013 $20,000" },
            { label: "Lighting (LED, per court)", value: "$15,000 \u2013 $35,000" },
          ]} footer={{ label: "Total (Full Build)", value: "$62,800 \u2013 $135,500" }} />
          <CalloutBox title="Surfacing-Only Scope">
            <p>If your slab is already poured and you just need surfacing, the relevant line item is <strong className="text-brand-text">$7,500 \u2013 $15,000 per tennis court</strong> for a professional-grade acrylic system like <Link href="/" className="text-brand-blue hover:underline">ATS Sports Acrytech</Link>. That includes surface prep, multi-coat acrylic application, and game line striping.</p>
          </CalloutBox>
          <p className="text-brand-text-muted leading-relaxed mb-4">The wide range on surfacing comes down to the system you spec. A single-coat bargain acrylic runs cheaper upfront but wears through in 3{"\u2013"}5 years under heavy amenity center traffic. A professional multi-coat system like Acrytech holds up 8{"\u2013"}10+ years and eliminates the early resurface cycle.</p>
        </section>

        <section id="pickleball-costs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much does it cost to build a pickleball court in Texas?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">{"A standard pickleball court is 30' x 60' (including overruns) \u2014 roughly one-quarter the footprint of a tennis court. Smaller footprint means lower cost per court, which is why developers are adding 4\u20138 pickleball courts to amenity packages."}</p>
          <CostTable title="Pickleball Court Cost Breakdown (Per Court)" headers={["Component", "Cost Range"]} rows={[
            { label: "Site Prep & Grading", value: "$2,500 \u2013 $7,000" },
            { label: "Concrete Slab (4\u20136\u2033)", value: "$8,000 \u2013 $18,000" },
            { label: "Acrylic Surface System", value: "$3,500 \u2013 $7,000" },
            { label: "Line Striping", value: "$500 \u2013 $1,200" },
            { label: "Net Posts & Hardware", value: "$800 \u2013 $1,800" },
            { label: "Fencing (per court)", value: "$4,000 \u2013 $10,000" },
            { label: "Lighting (LED, per court)", value: "$6,000 \u2013 $15,000" },
          ]} footer={{ label: "Total (Full Build)", value: "$25,300 \u2013 $60,000" }} />
          <CalloutBox title="Multi-Court Pickleball Builds">
            <p>Most amenity center projects spec 4{"\u2013"}8 pickleball courts on a shared slab. For surfacing only on a multi-court slab, budget <strong className="text-brand-text">$3,500 {"\u2013"} $7,000 per pickleball court</strong> for a professional-grade system.</p>
          </CalloutBox>
          <p className="text-brand-text-muted leading-relaxed mb-4">The cost to install a pickleball court is roughly 40{"\u2013"}50% less than tennis on a per-court basis. But watch the total scope {"\u2014"} a project with 6 pickleball courts can easily match the total surfacing cost of 2 tennis courts.</p>
        </section>

        <section id="multi-sport-costs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much do multi-sport courts cost to build?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Multi-sport courts {"\u2014"} typically a tennis court with pickleball lines overlaid, or a dedicated pad with dual-line striping {"\u2014"} are increasingly common on amenity center projects.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Dual-Line Courts</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">The most cost-effective approach: a full-size tennis court with pickleball lines added. Striping dual lines adds <strong className="text-brand-text">$500 {"\u2013"} $1,500 per court</strong> over single-sport striping.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Conversion Projects</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">Converting an existing tennis court to add pickleball lines is common in amenity center renovations. Good condition: <strong className="text-brand-text">$1,500 {"\u2013"} $4,000 per court</strong> for restriping. Needs recoat: add <strong className="text-brand-text">$5,000 {"\u2013"} $10,000</strong> for resurfacing first.</p>
          <CostTable title="Multi-Sport Court Surfacing Costs (Per Court)" headers={["Scenario", "Cost Range"]} rows={[
            { label: "New build with dual lines (tennis + pickleball)", value: "$8,000 \u2013 $16,500" },
            { label: "Restripe existing court for dual sport", value: "$1,500 \u2013 $4,000" },
            { label: "Full resurface + dual-line restripe", value: "$6,500 \u2013 $14,000" },
          ]} />
        </section>

        <section id="cost-variance">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What factors affect court construction costs?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">You have seen the ranges. Here is what pushes a project toward the high end or the low end.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Site Conditions</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">Rocky or expansive clay soils (common in Central Texas) increase grading and prep costs. Sites with significant slope require more cut-and-fill work. If your geotech report shows problem soils, build in a contingency on the site prep line item.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Concrete Spec</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">{"Post-tension slabs run more than standard rebar but reduce cracking risk \u2014 a big deal on court surfaces where a hairline crack telegraphs through the acrylic. For amenity centers, most specs call for 5\" or 6\" post-tension."}</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Surface System Quality</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">This is where the biggest long-term cost difference lives. A cheap single-coat acrylic might save $2,000{"\u2013"}$4,000 per court on day one. But cheap systems break down under Central Texas UV and heat, requiring resurfacing in 3{"\u2013"}5 years at $5,000+ per court. A professional multi-coat system like <Link href="/" className="text-brand-blue hover:underline">ATS Sports Acrytech</Link> costs more upfront but lasts 8{"\u2013"}10+ years.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Number of Courts</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">Per-court costs decrease on multi-court builds. Mobilization, equipment, and crew costs get amortized across more courts.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Access and Staging</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">Tight site access, limited staging areas, or coordination constraints with other active trades can add cost. Call it out in your bid package so subs can price it accurately.</p>
        </section>

        <section id="hidden-costs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What hidden costs do GCs miss on court projects?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The bid number on the page is not the real cost. Here are the line items that never make it into the original estimate but show up during construction or within the first few years.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <HiddenCostCard costLabel="Avg. $5,000 / Court" title="Callbacks from Cheap Subs" description={"Cheap surface systems peel, blister, and crack within 1\u20132 years. The callback rate on bargain installs runs 35\u201340%."} />
            <HiddenCostCard costLabel="$5,000+ / Court" title={"Early Resurfacing (3\u20135 Years)"} description="Low-quality acrylic breaks down fast under Central Texas UV. When the property manager calls about peeling courts in year 3, someone is paying for a full resurface." />
            <HiddenCostCard costLabel="~$2,000 / Court" title="Change Orders" description="Vague bids lead to vague scopes. When a cheap sub does not itemize surface prep, crack repair, or primer coats, those extras show up as change orders mid-project." />
            <HiddenCostCard costLabel="$1,500 / Day" title="Project Delays" description="Unreliable subs cause schedule delays that cascade across your other trades. At $1,500/day in GC carrying costs, a 3-day delay costs more than the bid savings." />
          </div>
          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">The cheapest bid is almost never the cheapest project. The real cost is what happens in the 2{"\u2013"}5 years after the sub leaves the site.</p>
          </blockquote>
        </section>

        <section id="accurate-bid">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How do I get an accurate court surfacing bid?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">If you are carrying court surfacing on your next estimate, here is how to get a number you can stand behind.</p>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">What We Need From You</h3>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Court count and type</strong> {"\u2014"} Tennis, pickleball, multi-sport, or a mix</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Court dimensions</strong> {"\u2014"} Standard or custom sizing</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Slab status</strong> {"\u2014"} New pour (tell us the spec) or existing surface (condition and age)</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Color preferences</strong> {"\u2014"} If the owner or architect has a color spec</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Project timeline</strong> {"\u2014"} When the slab will be ready for surfacing</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Site plans</strong> {"\u2014"} If available, speeds up the bid significantly</li>
          </ul>
          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">What You Get Back</h3>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Detailed line-item bid</strong> {"\u2014"} Surface prep, materials, labor, striping, all broken out</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">48-hour turnaround</strong> {"\u2014"} We know you are working on a deadline</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Clear scope definition</strong> {"\u2014"} Exactly what is included and what is not</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Timeline commitment</strong> {"\u2014"} How many days on site, with a schedule you can plan around</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Warranty documentation</strong> {"\u2014"} Manufacturer material warranty + our 2-year workmanship warranty</li>
          </ul>
          <p className="text-brand-text-muted leading-relaxed mb-4">We handle surfacing only {"\u2014"} no fencing, lighting, or accessories. That means zero scope overlap with your other trades and a clean line item in your estimate.</p>
        </section>

        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">Request a court surfacing bid (48-hour turnaround)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need Surfacing Numbers for Your Next Bid?" description="Send us your court specs and project timeline. You will have a detailed, line-item bid back within 48 hours." />
      </article>
    </>
  );
}
