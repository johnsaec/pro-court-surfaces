import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CostTable } from "../_components/CostTable";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Backyard Pickleball Court: Cost, Size & Build Guide (2026) | Pro Court Surfaces",
  description: "How much does a backyard pickleball court cost in Texas? Full guide to sizing, surface options, concrete specs, and costs for building a home pickleball court in Austin and Central Texas.",
  keywords: "backyard pickleball court, home pickleball court, backyard pickleball court cost, small backyard pickleball court, pickleball court construction cost, backyard pickleball court size, home pickleball court cost, pickleball court backyard",
  openGraph: {
    title: "Backyard Pickleball Court: Cost, Size & Build Guide (2026)",
    description: "How much does a backyard pickleball court cost? Full guide to sizing, surface options, and costs for homeowners in Central Texas.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/backyard-pickleball-court",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backyard Pickleball Court: Cost, Size & Build Guide (2026)",
    description: "How much does a backyard pickleball court cost? Sizing, surface options, and costs for homeowners in Central Texas.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/backyard-pickleball-court" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Backyard Pickleball Court: Cost, Size & Build Guide (2026)",
  description: "Complete guide to building a backyard pickleball court in Central Texas. Costs, dimensions, surface options, and step-by-step process.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/backyard-pickleball-court" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How much does a backyard pickleball court cost?", acceptedAnswer: { "@type": "Answer", text: "A backyard pickleball court in Central Texas typically costs $20,000 to $45,000 total, including concrete slab ($12,000\u2013$25,000) and professional acrylic surfacing ($6,000\u2013$12,000). Costs vary based on site prep, drainage, and color options." } },
    { "@type": "Question", name: "How big does my backyard need to be for a pickleball court?", acceptedAnswer: { "@type": "Answer", text: "You need a minimum area of 30\u2019 x 60\u2019 (1,800 sq ft) for one court with basic run-outs. For comfortable play, 34\u2019 x 64\u2019 (2,176 sq ft) is recommended. This is about one-third the size of a tennis court." } },
    { "@type": "Question", name: "Can you build a pickleball court on an existing patio or driveway?", acceptedAnswer: { "@type": "Answer", text: "Sometimes. If the existing concrete is at least 4 inches thick, structurally sound, and relatively level, we can resurface it with an acrylic sport court system. Cracks, low spots, and drainage issues would need to be addressed first." } },
    { "@type": "Question", name: "What is the best surface for a backyard pickleball court?", acceptedAnswer: { "@type": "Answer", text: "Professional acrylic sport court surfaces are the gold standard. Top systems include ATS Acrytech, Laykold, and SportMaster. They provide consistent ball bounce, good traction, and last 8\u201310 years in the Texas climate. Modular tiles are an alternative but offer inferior play quality." } },
    { "@type": "Question", name: "Do I need a permit to build a backyard pickleball court?", acceptedAnswer: { "@type": "Answer", text: "Most Texas municipalities require a permit for pouring a concrete slab. HOAs may also have rules about court placement, fencing, and lighting. Check with your city and HOA before starting." } },
    { "@type": "Question", name: "How long does it take to build a backyard pickleball court?", acceptedAnswer: { "@type": "Answer", text: "Total timeline is typically around 5 weeks: 1 week for site prep and excavation, 1 week for concrete pour, 2\u20133 weeks for curing, then 3\u20135 days for surfacing and line striping." } },
    { "@type": "Question", name: "Will a pickleball court increase my home value?", acceptedAnswer: { "@type": "Answer", text: "In neighborhoods where pickleball is popular (like Westlake, Lakeway, and Dripping Springs), a well-built court can increase property value by $10,000\u2013$30,000+. It is increasingly viewed as a premium amenity alongside pools and outdoor kitchens." } },
    { "@type": "Question", name: "Can I fit a pickleball court in a small backyard?", acceptedAnswer: { "@type": "Answer", text: "You need at least 30\u2019 x 50\u2019 (1,500 sq ft) for a tight-fit court with minimal run-outs. This works for casual play but is not regulation-sized. If you have less space, consider a half-court practice area with a wall." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Backyard Pickleball Court", item: "https://www.procourtsurfaces.com/blog/backyard-pickleball-court" },
  ],
};

const tocItems = [
  { href: "#size", label: "How big does my backyard need to be?" },
  { href: "#cost", label: "How much does a backyard pickleball court cost?" },
  { href: "#surface", label: "What surface should I use?" },
  { href: "#small-backyard", label: "What if my backyard is too small?" },
  { href: "#process", label: "How is a backyard court built?" },
  { href: "#permits", label: "Do I need permits or HOA approval?" },
  { href: "#faq", label: "Backyard pickleball court FAQs" },
];

const faqItems = [
  { question: "How much does a backyard pickleball court cost?", answer: "A backyard pickleball court in Central Texas typically costs $20,000 to $45,000 total, including concrete slab ($12,000\u2013$25,000) and professional acrylic surfacing ($6,000\u2013$12,000). Costs vary based on site prep needs, drainage, fencing, and color options." },
  { question: "How big does my backyard need to be for a pickleball court?", answer: "You need a minimum area of 30\u2019 x 60\u2019 (1,800 sq ft) for one court with basic run-outs. For comfortable, regulation play, 34\u2019 x 64\u2019 (2,176 sq ft) is recommended. This is about one-third the size of a standard tennis court." },
  { question: "Can you build a pickleball court on an existing patio or driveway?", answer: "Sometimes. If the existing concrete is at least 4\" thick, structurally sound, and relatively level, we can resurface it with an acrylic sport court system. Cracks, low spots, and drainage issues would need to be addressed first." },
  { question: "What is the best surface for a backyard pickleball court?", answer: "Professional acrylic sport court surfaces are the gold standard for backyard pickleball courts. Top systems include ATS Acrytech, Laykold, and SportMaster \u2014 all provide consistent ball bounce, good traction, and last 8\u201310 years in the Texas climate. Modular snap-together tiles are an alternative but offer inferior play quality and less durability." },
  { question: "Do I need a permit to build a backyard pickleball court?", answer: "Most Texas municipalities require a permit for pouring a concrete slab over a certain size. HOAs may also have rules about court placement, fencing, lighting, and setbacks. Always check with your city permitting office and HOA before starting." },
  { question: "How long does it take to build a backyard pickleball court?", answer: "Total timeline is typically around 5 weeks: 1 week for site prep and excavation, 1 week for the concrete pour, 2\u20133 weeks for curing, then 3\u20135 days for surfacing and line striping." },
  { question: "Will a pickleball court increase my home value?", answer: "In neighborhoods where pickleball is popular \u2014 like Westlake, Lakeway, and Dripping Springs \u2014 a well-built court can increase property value by $10,000\u2013$30,000+. It\u2019s increasingly viewed as a premium amenity alongside pools and outdoor kitchens." },
  { question: "Can I fit a pickleball court in a small backyard?", answer: "You need at least 30\u2019 x 50\u2019 (1,500 sq ft) for a tight-fit court with minimal run-outs. This works for casual play but is not regulation-sized. If you have less space, consider a half-court practice area with a rebound wall." },
];

export default function BackyardPickleballCourtPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogHero
        category="Homeowner Guide"
        date="Mar 9, 2026"
        readTime="10 min read"
        title="Backyard Pickleball Court |"
        titleAccent="Cost, Size & Build Guide"
        subtitle="Everything you need to know about building a pickleball court in your backyard in Austin and Central Texas. Dimensions, costs, surface options, and the step-by-step process."
      />

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Table of Contents */}
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

        {/* Intro */}
        <p className="text-brand-text-muted leading-relaxed mb-8">Pickleball is the fastest-growing sport in the country, and homeowners across Austin and Central Texas are adding courts to their backyards. Whether you have a half-acre lot in Westlake or a ranch property in Dripping Springs, a dedicated pickleball court is more attainable than most people think {"\u2014"} and it costs a fraction of a swimming pool.</p>

        {/* Size Requirements */}
        <section id="size">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How big does my backyard need to be for a pickleball court?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">A pickleball court is significantly smaller than a tennis court, which is why it works in most backyards. Here are the numbers you need.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"20' x 44'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Playing Area</p>
              <p className="text-xs text-brand-text-muted">The court itself</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"30' x 60'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Minimum Slab</p>
              <p className="text-xs text-brand-text-muted">With basic run-outs (1,800 sq ft)</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"34' x 64'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Recommended</p>
              <p className="text-xs text-brand-text-muted">Comfortable play (2,176 sq ft)</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">For context, a standard two-car garage is about 20{"\u2019"} x 20{"\u2019"}. A backyard pickleball court slab is roughly 4.5 garage footprints {"\u2014"} substantial but very doable on lots of {"\u00bc"} acre or more.</p>

          <CalloutBox title="Quick Rule of Thumb">
            <p>If you can fit a pool, you can fit a pickleball court. Most backyard courts take up less total space than a pool + deck + equipment pad.</p>
          </CalloutBox>
        </section>

        {/* Cost */}
        <section id="cost">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much does a backyard pickleball court cost?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Total cost depends on your starting point. If you already have a concrete slab (patio, old basketball court, tennis court), the cost drops significantly. If you are starting from bare ground, you are building a slab + surface. Here are 2026 ranges for Central Texas.</p>

          <CostTable title="Backyard Pickleball Court Costs (2026)" headers={["Item", "Cost Range"]} rows={[
            { label: "Site prep & grading", value: "$2,000 \u2013 $8,000" },
            { label: "Concrete slab (4\" min, 30'x60' to 34'x64')", value: "$12,000 \u2013 $25,000" },
            { label: "Acrylic surface system", value: "$6,000 \u2013 $12,000" },
            { label: "Line striping", value: "$300 \u2013 $800" },
            { label: "Net post system + net", value: "$200 \u2013 $600" },
            { label: "Fencing (optional, per side)", value: "$1,500 \u2013 $4,000" },
          ]} />

          <div className="my-6 p-5 bg-brand-bg-alt border border-gray-200 rounded-xl">
            <p className="text-sm font-semibold text-brand-text mb-2">Typical total cost ranges</p>
            <div className="space-y-2 text-sm text-brand-text-muted">
              <p><strong className="text-brand-text">New build (from bare ground):</strong> $20,000 {"\u2013"} $45,000</p>
              <p><strong className="text-brand-text">Resurface existing slab:</strong> $6,000 {"\u2013"} $14,000</p>
              <p><strong className="text-brand-text">Convert tennis court to pickleball:</strong> $8,000 {"\u2013"} $18,000</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">For comparison, a backyard swimming pool in Austin runs $50,000{"\u2013"}$100,000+. A pickleball court gives you a year-round outdoor amenity at a fraction of that cost, with almost zero ongoing maintenance. For more detailed cost breakdowns, see our <Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">court construction cost guide</Link>.</p>
        </section>

        {/* Surface Options */}
        <section id="surface">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What surface should I use for a backyard pickleball court?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">There are several options depending on your budget and how seriously you play. All professional-grade systems are acrylic {"\u2014"} the difference is the brand and coating system.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Acrylic Sport Surface Systems</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">Recommended</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-3">Multi-coat acrylic systems are the gold standard for backyard pickleball courts. They give you consistent ball bounce, excellent traction, custom colors, and 8{"\u2013"}10+ year lifespan in the Texas climate. The three main systems we work with:</p>
              <ul className="space-y-2 text-sm text-brand-text-muted pl-4 list-disc">
                <li><strong className="text-brand-text">ATS Acrytech</strong> {"\u2014"} Our primary system. PPA-approved, multi-coat acrylic built for high-traffic commercial and residential courts. The same system used on tournament-level facilities.</li>
                <li><strong className="text-brand-text">Laykold</strong> {"\u2014"} A premium acrylic system used on professional venues worldwide (including the Australian Open). Excellent durability and color retention. A top-tier option for homeowners who want the best.</li>
                <li><strong className="text-brand-text">SportMaster</strong> {"\u2014"} A widely available acrylic court paint system. Good performance at a more accessible price point. Solid choice for residential courts where budget matters.</li>
              </ul>
              <p className="text-sm text-brand-text-muted leading-relaxed mt-3">All three are professional acrylic systems applied over concrete. We will recommend the best fit based on your budget, court usage, and preferences. <Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types in detail</Link>.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Modular Snap-Together Tiles</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Interlocking plastic tiles installed over a flat slab. Lower upfront cost ($2,000{"\u2013"}$5,000 for materials) but shorter lifespan, inconsistent bounce, and tiles can shift or crack in Texas heat. Fine for casual play; not recommended for anyone who plays regularly.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Bare Concrete</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">You can play on bare concrete with painted lines, but the ball bounce is unpredictable, it is tough on joints, and the surface degrades quickly under sun exposure. We don{"\u2019"}t recommend it {"\u2014"} the surfacing investment pays for itself in playability and durability.</p>
            </div>
          </div>
        </section>

        {/* Small Backyard Options */}
        <section id="small-backyard">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What if my backyard is too small for a full court?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Not everyone has room for a full 34{"\u2019"} x 64{"\u2019"} court. Here are options for smaller spaces.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Tight-Fit Court ({"30' x 50'"})</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Minimum run-outs on all sides. Works for recreational play and practice. Not regulation but still a real court with proper lines and net. Requires about 1,500 sq ft.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Half-Court Practice Area</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">A 20{"\u2019"} x 30{"\u2019"} surfaced area with a rebound wall. Great for drilling, warming up, and solo practice. Can fit in spaces as small as 600{"\u2013"}800 sq ft.</p>
            </div>
          </div>

          <CalloutBox title="Not Sure If It Fits?">
            <p>Send us your lot dimensions or a screenshot of your property from Google Maps. We will tell you exactly what fits and what it would cost {"\u2014"} no charge, no obligation.</p>
          </CalloutBox>
        </section>

        {/* Build Process */}
        <section id="process">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How is a backyard pickleball court built?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">The process takes about 5 weeks from start to finish. Here is what each phase looks like.</p>

          <div className="space-y-6 my-8">
            {[
              { step: 1, title: "Site Assessment", description: "We visit your property, measure the space, check grade and drainage, and discuss court placement, orientation (north-south is ideal to avoid sun glare), and color preferences. You get a detailed proposal within 48 hours." },
              { step: 2, title: "Site Prep & Excavation", description: "Clearing, grading, and compacting the subbase. If your lot has slope, this phase includes cut-and-fill work to create a level pad. Drainage is addressed here \u2014 proper slope away from the court and your home. Typically 1 week." },
              { step: 3, title: "Concrete Pour", description: "4\" minimum slab at 3,000 PSI. Steel-trowel or broom finish. Expansion joints at the perimeter only \u2014 not through the playing surface. Your concrete contractor handles this phase." },
              { step: 4, title: "Cure Time", description: "The concrete needs 2\u20133 weeks to cure before surfacing can begin. Surfacing over uncured concrete causes adhesion failure and bubbling, so this step cannot be rushed." },
              { step: 5, title: "Surfacing & Lines", description: "We apply the ATS Acrytech system: filler coats, color coats (your choice of colors for inside, outside, and lines), and precision line striping. This takes 3\u20135 days, weather permitting." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-blue">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-brand-text mb-1">{item.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">We handle the surfacing (steps 1 and 5). For the concrete work, we can recommend concrete contractors we{"\u2019"}ve worked with on court projects in the Austin area, or work with your existing contractor. For details on our <Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">resurfacing process</Link>, see our dedicated guide.</p>
        </section>

        {/* Permits & HOA */}
        <section id="permits">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Do I need permits or HOA approval?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Short answer: probably yes for both. Here is what to check before you start.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">City Permits</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Most Austin-area municipalities require a building permit for concrete flatwork over a certain size (typically 200+ sq ft). Your concrete contractor usually handles the permit pull. Typical turnaround: 1{"\u2013"}2 weeks.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">HOA Approval</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">If you are in an HOA, submit your court plan before you do anything else. Most HOAs want to see: court location on your lot, setback distances, fencing details, and confirmation that it does not impact drainage for neighbors.</p>
            </div>
          </div>

          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">Pro tip: Courts oriented north-south minimize sun glare during play. Some HOAs also have rules about lighting {"\u2014"} check before you plan evening play.</p>
          </blockquote>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Backyard pickleball court FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions from homeowners considering a backyard pickleball court in Central Texas.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas: full breakdown (2026)</Link></li>
            <li><Link href="/blog/pickleball-court-installation" className="text-brand-blue hover:underline">Pickleball court installation: dimensions, specs, and pricing</Link></li>
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing: process, costs, and what to expect</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/blog/court-maintenance" className="text-brand-blue hover:underline">Court maintenance guide: cleaning schedules and pressure washing tips</Link></li>
            <li><Link href="/blog/pickleball-court-dimensions" className="text-brand-blue hover:underline">Pickleball court dimensions: official size and spacing guide</Link></li>
            <li><Link href="/blog/diy-pickleball-court" className="text-brand-blue hover:underline">DIY pickleball court: what you can do yourself vs. what needs a pro</Link></li>
          </ul>
        </div>

        <BlogCTA title="Ready to Build Your Backyard Court?" description="Send us your lot size and we'll tell you exactly what fits and what it costs. Free assessment, no obligation." />
      </article>

      <CTABanner />
    </>
  );
}
