import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CostTable } from "../_components/CostTable";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Pickleball Court Conversion Guide (2026) | Pro Court Surfaces",
  description: "How to convert a tennis court or basketball court to pickleball. How many pickleball courts fit on a tennis court, conversion costs, process, and timeline for Austin and Central Texas.",
  keywords: "pickleball court conversion, convert tennis court to pickleball, tennis court to pickleball conversion, how many pickleball courts fit on a tennis court, convert basketball court to pickleball, pickleball conversion cost",
  openGraph: {
    title: "Pickleball Court Conversion Guide (2026)",
    description: "Convert your tennis or basketball court to pickleball. Court count, costs, process, and timeline for Austin and Central Texas.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/pickleball-court-conversion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickleball Court Conversion Guide (2026)",
    description: "Convert your tennis or basketball court to pickleball. Court count, costs, process, and timeline for Austin and Central Texas.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/pickleball-court-conversion" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pickleball Court Conversion Guide (2026)",
  description: "How to convert a tennis court or basketball court to pickleball. Court count, costs, process, and timeline for Austin and Central Texas.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/pickleball-court-conversion" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How many pickleball courts fit on a tennis court?", acceptedAnswer: { "@type": "Answer", text: "A standard tennis court (120\u2019 x 60\u2019 with run-outs) can fit up to 4 pickleball courts. If one side of the tennis court is compromised by cracks or damage, 2 courts is the more practical option." } },
    { "@type": "Question", name: "How much does it cost to convert a tennis court to pickleball?", acceptedAnswer: { "@type": "Answer", text: "A tennis-to-pickleball conversion typically costs $7,000\u2013$10,000 per pickleball court created, including surface prep, acrylic resurfacing, and PPA-spec line striping. Net post systems add $200\u2013$600 per court." } },
    { "@type": "Question", name: "Can you keep tennis lines and add pickleball lines?", acceptedAnswer: { "@type": "Answer", text: "Yes. Dual-use courts with both tennis and pickleball lines are common. Each sport\u2019s lines are striped in different colors so players can easily distinguish between them." } },
    { "@type": "Question", name: "Can you convert a basketball court to pickleball?", acceptedAnswer: { "@type": "Answer", text: "Yes. A regulation basketball court (50\u2019 x 84\u2019) has plenty of room for a spacious pickleball court with full run-outs. Multi-sport line striping lets you keep basketball functional while adding pickleball." } },
    { "@type": "Question", name: "How long does a pickleball court conversion take?", acceptedAnswer: { "@type": "Answer", text: "Once surface prep is complete, the acrylic application and line striping typically take 3\u20135 days. Total project timeline depends on the condition of the existing surface and any repair work needed." } },
    { "@type": "Question", name: "What surface do you use for pickleball court conversions?", acceptedAnswer: { "@type": "Answer", text: "We use professional acrylic sport court systems including ATS Acrytech, Laykold, and SportMaster. All are PPA-approved and designed for consistent ball bounce, traction, and long-term durability in the Texas climate." } },
    { "@type": "Question", name: "Do you serve Austin, TX for pickleball conversions?", acceptedAnswer: { "@type": "Answer", text: "Yes. We serve Austin, Round Rock, Cedar Park, Georgetown, Lakeway, and the broader Central Texas metro area for all pickleball court conversions." } },
    { "@type": "Question", name: "Is converting a tennis court to pickleball worth it?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. One underused tennis court becomes up to 4 pickleball courts, multiplying your playable court count. Pickleball demand has grown over 150% in the last 5 years, making conversions one of the highest-ROI facility upgrades available." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Pickleball Court Conversion", item: "https://www.procourtsurfaces.com/blog/pickleball-court-conversion" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pickleball Court Conversion",
  provider: {
    "@type": "LocalBusiness",
    name: "Pro Court Surfaces",
    url: "https://www.procourtsurfaces.com",
    telephone: "(512) 893-0466",
    address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Austin", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Round Rock", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Cedar Park", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Georgetown", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Lakeway", containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Pickleball Court Conversion",
  description: "Professional tennis-to-pickleball and basketball-to-pickleball court conversions in Central Texas. Full resurfacing, PPA-spec line striping, and net post installation.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pickleball Court Conversion Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tennis to Pickleball Conversion" }, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: "7000", maxPrice: "10000" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Basketball to Pickleball Conversion" }, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: "7000", maxPrice: "10000" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Net Post System Installation" }, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD", minPrice: "200", maxPrice: "600" } },
    ],
  },
};

const tocItems = [
  { href: "#how-many-courts", label: "How many pickleball courts fit on a tennis court?" },
  { href: "#basketball-conversion", label: "Can you convert a basketball court to pickleball?" },
  { href: "#conversion-cost", label: "What does a pickleball court conversion cost?" },
  { href: "#conversion-process", label: "What\u2019s the conversion process?" },
  { href: "#net-posts", label: "Do I need to remove the tennis net and posts?" },
  { href: "#faq", label: "Pickleball court conversion FAQs" },
];

const faqItems = [
  {
    question: "How many pickleball courts fit on a tennis court?",
    answer: "A standard tennis court with run-outs (120\u2019 x 60\u2019) can fit up to 4 pickleball courts. Each pickleball court needs approximately 30\u2019 x 60\u2019 with run-outs. If one side of the existing tennis court is compromised by cracks or structural damage, 2 courts is the more practical layout.",
  },
  {
    question: "How much does it cost to convert a tennis court to pickleball?",
    answer: "A tennis-to-pickleball conversion typically costs $7,000\u2013$10,000 per pickleball court created. That includes surface prep, acrylic resurfacing, and PPA-spec line striping. Net post systems add $200\u2013$600 per court. Multi-court conversions bring the per-court cost down.",
  },
  {
    question: "Can you keep tennis lines and add pickleball lines?",
    answer: "Yes. Dual-use courts with both tennis and pickleball lines are one of the most popular requests we get. Each sport\u2019s lines are striped in a different color so players can easily tell them apart during play.",
  },
  {
    question: "Can you convert a basketball court to pickleball?",
    answer: "Yes. A regulation basketball court (50\u2019 x 84\u2019) has plenty of room for a spacious pickleball court with full run-outs. Multi-sport line striping in different colors lets you keep basketball functional while adding dedicated pickleball lines.",
  },
  {
    question: "How long does a pickleball court conversion take?",
    answer: "Once surface prep is complete, the acrylic application and line striping typically take 3\u20135 days. Total project timeline depends on the condition of the existing surface and any crack repair or leveling needed beforehand.",
  },
  {
    question: "What surface do you use for pickleball court conversions?",
    answer: "We use professional acrylic sport court systems including ATS Acrytech, Laykold, and SportMaster. All are PPA-approved and designed for consistent ball bounce, player traction, and long-term durability in the Central Texas climate.",
  },
  {
    question: "Do you serve Austin, TX for pickleball conversions?",
    answer: "Yes. We serve Austin, Round Rock, Cedar Park, Georgetown, Lakeway, Dripping Springs, and the broader Central Texas metro area for all pickleball court conversions and resurfacing projects.",
  },
  {
    question: "Is converting a tennis court to pickleball worth it?",
    answer: "One underused tennis court becomes up to 4 pickleball courts \u2014 that\u2019s 4x the playable courts from a single conversion. With pickleball demand growing every year, conversions are one of the highest-ROI facility upgrades for HOAs, clubs, and homeowners in Central Texas.",
  },
];

export default function PickleballCourtConversionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="Conversion Guide"
        date="Mar 9, 2026"
        readTime="8 min read"
        title="Pickleball Court Conversion |"
        titleAccent="Tennis & Basketball to Pickleball"
        subtitle="How many pickleball courts fit on a tennis court? What does it cost? Full conversion guide for homeowners, HOAs, and GCs in Austin and Central Texas."
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

        {/* How Many Pickleball Courts Fit on a Tennis Court */}
        <section id="how-many-courts">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How many pickleball courts fit on a tennis court?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">A full-size tennis court with run-outs measures roughly 120{"\u2019"} x 60{"\u2019"}. A single pickleball court with proper run-outs needs about 30{"\u2019"} x 60{"\u2019"}. Split the tennis court into quadrants and you get <strong className="text-brand-text">4 pickleball courts</strong> from one tennis court footprint.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">That said, 4 courts isn{"\u2019"}t always the right call. If one side of the existing tennis court has significant cracking, delamination, or structural damage, converting to 2 courts on the sound half is more cost-effective than repairing the entire slab. Some homeowners also prefer 2 courts for more spacious play and better run-out room.</p>
          <p className="text-brand-text-muted leading-relaxed mb-8">Either way, the ROI is hard to beat: one conversion turns a single underused tennis court into up to 4x the playable courts.</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-1">4 Courts</p>
              <p className="text-sm text-brand-text-muted">Max pickleball courts per tennis court</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-1">120{"\u2019"} x 60{"\u2019"}</p>
              <p className="text-sm text-brand-text-muted">Standard tennis court footprint</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-1">$7K{"\u2013"}$10K</p>
              <p className="text-sm text-brand-text-muted">Per pickleball court created</p>
            </div>
          </div>

          <CalloutBox title="Dual-Use Option">
            <p>Not ready to commit to a full conversion? We can add pickleball lines to your existing tennis court in a contrasting color. You keep the tennis court and gain pickleball play {"\u2014"} no construction required, just resurfacing and line striping.</p>
          </CalloutBox>
        </section>

        {/* Basketball Court to Pickleball */}
        <section id="basketball-conversion">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Can you convert a basketball court to pickleball?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Yes. A regulation basketball court is approximately 50{"\u2019"} x 84{"\u2019"} {"\u2014"} that{"\u2019"}s plenty of room for a spacious pickleball court with full run-outs, and you can still keep the basketball court functional.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">Multi-sport line striping is the key. Each sport gets its own line color so players can easily distinguish between basketball and pickleball boundaries. This is especially popular with HOAs, apartment complexes, and amenity centers across Austin, Round Rock, and Cedar Park that want to maximize their existing court investment without building new.</p>
          <p className="text-brand-text-muted leading-relaxed mb-8">The process is the same as any conversion: assess the surface condition, prep and repair as needed, apply the acrylic system, and stripe for both sports.</p>
        </section>

        {/* Conversion Cost */}
        <section id="conversion-cost">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What does a pickleball court conversion cost?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Conversion costs depend on the existing surface condition, how many courts you{"\u2019"}re creating, and whether it{"\u2019"}s a dedicated pickleball conversion or a dual-use setup. Here are the typical ranges for Central Texas as of 2026.</p>
          <CostTable
            title="Pickleball Conversion Cost Guide"
            headers={["Item", "Cost Range"]}
            rows={[
              { label: "Acrylic surface system \u2014 per sq ft", value: "$4 \u2013 $5" },
              { label: "Per pickleball court created \u2014 surface + lines", value: "$7,000 \u2013 $10,000" },
              { label: "Crack repair & leveling \u2014 if needed", value: "$500 \u2013 $3,000" },
              { label: "Net post system \u2014 per court", value: "$200 \u2013 $600" },
              { label: "Multi-sport line striping \u2014 additional sport", value: "$300 \u2013 $800" },
            ]}
          />
          <p className="text-brand-text-muted leading-relaxed mb-4">Line striping for the primary sport is included in the per-court cost. Net post pricing covers permanent sleeve-set posts {"\u2014"} portable net systems are a lower-cost alternative if you want flexibility.</p>
          <CalloutBox title="Multi-Court Savings">
            <p>Converting one tennis court to 4 pickleball courts is significantly cheaper per court than 4 separate builds. Mobilization, surface prep, and acrylic application are done once across the full slab. Ask for multi-court pricing on your bid.</p>
          </CalloutBox>
        </section>

        {/* Conversion Process */}
        <section id="conversion-process">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What{"\u2019"}s the conversion process?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Our conversion process follows five steps. Whether you{"\u2019"}re converting a tennis court, basketball court, or multi-sport surface, the workflow is the same.</p>
          <div className="space-y-6 my-8">
            {[
              {
                step: 1,
                title: "Assessment",
                description: "We inspect the existing surface for cracks, delamination, low spots, and drainage issues. We measure the court and confirm how many pickleball courts will fit with proper run-outs. You get a written scope of work within 48 hours.",
              },
              {
                step: 2,
                title: "Surface Prep",
                description: "Crack filling with flexible acrylic filler, delamination repair, pressure washing, and low-spot leveling. This is the most important step \u2014 proper prep determines how long the new surface lasts.",
              },
              {
                step: 3,
                title: "Acrylic Application",
                description: "3\u20135 coats of professional acrylic sport court coating (ATS Acrytech, Laykold, or SportMaster) applied per manufacturer specifications. Each coat is weather-monitored for temperature and humidity.",
              },
              {
                step: 4,
                title: "Line Striping",
                description: "Precision pickleball lines applied per PPA specifications. For dual-use courts, each sport gets a distinct line color. For dedicated conversions, color zones (inside, outside, lines) are applied per your selection.",
              },
              {
                step: 5,
                title: "Net Posts & Hardware",
                description: "Permanent sleeve-set net posts installed at regulation height and position. Posts, sleeves, nets, and center straps included. Courts are ready for play once the final cure is complete.",
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-blue">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-brand-text mb-1">{step.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-brand-text-muted leading-relaxed mb-4"><strong className="text-brand-text">Timeline:</strong> 3{"\u2013"}5 days for surfacing and line striping once prep is complete. Total project duration depends on the condition of your existing surface. For a full breakdown of the resurfacing process, see our <Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">court resurfacing guide</Link>.</p>
        </section>

        {/* Net Posts */}
        <section id="net-posts">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Do I need to remove the tennis net and posts?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">It depends on the type of conversion.</p>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Dedicated pickleball conversion</strong> {"\u2014"} Yes. The tennis net and posts are removed, sleeves are filled, and new pickleball net posts are installed at the correct positions for each court.</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Dual-use (tennis + pickleball lines)</strong> {"\u2014"} No. The existing tennis net stays in place. Pickleball lines are added in a contrasting color, and players use the tennis net or add a portable pickleball net as needed.</li>
          </ul>
          <p className="text-brand-text-muted leading-relaxed mb-8">We handle all net post removal and installation as part of the conversion scope {"\u2014"} no need to coordinate a separate contractor.</p>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Pickleball court conversion FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions from homeowners, HOAs, and general contractors about converting existing courts to pickleball.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing: process, costs, and what to expect</Link></li>
            <li><Link href="/blog/pickleball-court-installation" className="text-brand-blue hover:underline">Pickleball court installation: dimensions, specs, and pricing</Link></li>
            <li><Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">Backyard pickleball court: cost, size, and build guide</Link></li>
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas (2026)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Ready to Convert Your Court?" description="Send us photos of your existing court and we\u2019ll tell you exactly how many pickleball courts fit and what it\u2019ll cost. Free assessment." />
      </article>

      <CTABanner />
    </>
  );
}
