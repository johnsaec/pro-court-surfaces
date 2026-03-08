import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CostTable } from "../_components/CostTable";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";
import { BlogFAQ } from "../_components/BlogFAQ";

export const metadata: Metadata = {
  title: "Pickleball Court Installation in Austin TX | Pro Court Surfaces",
  description: "Pickleball court installation and surfacing for multi-family amenity centers in Central Texas. ATS Acrytech system, concrete specs, costs, and timelines.",
  keywords: "pickleball court installation, pickleball court surfacing, pickleball court cost, pickleball court dimensions, pickleball court resurfacing, Central Texas",
  openGraph: {
    title: "Pickleball Court Installation & Surfacing | Central Texas",
    description: "Pickleball court installation and surfacing for multi-family amenity centers in Central Texas.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/pickleball-court-installation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickleball Court Installation & Surfacing | Central Texas",
    description: "Pickleball court installation and surfacing for multi-family amenity centers in Central Texas.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/pickleball-court-installation" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pickleball Court Installation & Surfacing | Central Texas",
  description: "Pickleball court installation and surfacing for multi-family amenity centers in Central Texas.",
  author: { "@type": "Organization", name: "Pro Court Surfaces" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-05",
  dateModified: "2026-03-05",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/pickleball-court-installation" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are the standard pickleball court dimensions?", acceptedAnswer: { "@type": "Answer", text: "A regulation pickleball court is 20' x 44' for the playing area. With run-outs, the minimum slab is 30' x 60', with 34' x 64' recommended for competitive play." } },
    { "@type": "Question", name: "How thick is the ATS Acrytech pickleball surface?", acceptedAnswer: { "@type": "Answer", text: "The ATS Acrytech system applies 4\u20136 coats totaling 1/16\" to 1/8\" in thickness, including resurfacer, cushion coats, color coats, and line paint." } },
    { "@type": "Question", name: "Can you put pickleball lines on an existing tennis court?", acceptedAnswer: { "@type": "Answer", text: "Yes. Up to 4 pickleball courts fit within a single standard tennis court footprint, using distinct line colors per sport." } },
    { "@type": "Question", name: "How long does pickleball court surfacing take?", acceptedAnswer: { "@type": "Answer", text: "Surfacing a 2\u20134 court project typically takes 5\u20138 business days, weather permitting." } },
    { "@type": "Question", name: "What warranty do I get on a pickleball court surface?", acceptedAnswer: { "@type": "Answer", text: "You get dual warranty coverage: an ATS manufacturer material warranty plus our 2-year workmanship warranty." } },
    { "@type": "Question", name: "Do you handle pickleball court resurfacing?", acceptedAnswer: { "@type": "Answer", text: "Yes. We handle crack repair, patching, full recoat with ATS Acrytech, and new line striping on existing pickleball courts." } },
    { "@type": "Question", name: "What concrete spec does my concrete sub need to hit?", acceptedAnswer: { "@type": "Answer", text: "4\" thick minimum, 3000 PSI, steel-trowel or broom finish, 1% slope for drainage, expansion joints at perimeter only, and a full 28-day cure before surfacing." } },
    { "@type": "Question", name: "Can you do multi-sport courts with pickleball?", acceptedAnswer: { "@type": "Answer", text: "Yes. We stripe multi-sport courts with distinct line colors per sport so players can easily identify their playing area." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Pickleball Court Installation", item: "https://www.procourtsurfaces.com/blog/pickleball-court-installation" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pickleball Court Installation & Surfacing",
  provider: { "@type": "Organization", name: "Pro Court Surfaces" },
  areaServed: { "@type": "Place", name: "Central Texas" },
  description: "Professional pickleball court installation and surfacing using ATS Acrytech systems for multi-family amenity centers in Central Texas.",
  serviceType: "Court Surfacing",
};

const tocItems = [
  { href: "#market-demand", label: "Why is pickleball court demand surging for developers?" },
  { href: "#ats-acrytech", label: "What makes ATS Acrytech the right surface system?" },
  { href: "#concrete-specs", label: "What concrete specs does my slab need to meet?" },
  { href: "#court-dimensions", label: "What are the standard pickleball court dimensions?" },
  { href: "#costs", label: "How much does pickleball court surfacing cost?" },
  { href: "#cost-factors", label: "What factors affect pickleball court surfacing costs?" },
  { href: "#faq", label: "Frequently asked questions" },
];

const faqItems = [
  { question: "What are the standard pickleball court dimensions?", answer: "A regulation pickleball court is 20\u2019 x 44\u2019 for the playing area. With run-outs, the minimum slab is 30\u2019 x 60\u2019, with 34\u2019 x 64\u2019 recommended for competitive play. Net height is 36\" at the sidelines and 34\" at the center." },
  { question: "How thick is the ATS Acrytech pickleball surface?", answer: "The ATS Acrytech system applies 4\u20136 coats totaling 1/16\" to 1/8\" in thickness. This includes resurfacer, cushion coats, color coats, and line paint \u2014 building up a durable, UV-stable surface layer." },
  { question: "Can you put pickleball lines on an existing tennis court?", answer: "Yes. Up to 4 pickleball courts fit within a single standard tennis court footprint. We use distinct line colors per sport so players can easily identify their playing area." },
  { question: "How long does pickleball court surfacing take?", answer: "Surfacing a 2\u20134 court project typically takes 5\u20138 business days, weather permitting. Larger projects scale linearly \u2014 a 6\u20138 court build runs 8\u201312 days." },
  { question: "What warranty do I get on a pickleball court surface?", answer: "Dual warranty coverage: an ATS manufacturer material warranty covering the surface system, plus our 2-year workmanship warranty on installation, lines, and finish." },
  { question: "Do you handle pickleball court resurfacing?", answer: "Yes. We handle crack repair, patching, full recoat with ATS Acrytech, and new line striping on existing pickleball courts. Resurfacing typically runs $3,000\u2013$6,000 per court." },
  { question: "What concrete spec does my concrete sub need to hit?", answer: "4\" thick minimum, 3000 PSI, steel-trowel or broom finish, 1% slope for drainage, expansion joints at perimeter only (not through the playing surface), and a full 28-day cure before surfacing begins." },
  { question: "Can you do multi-sport courts with pickleball?", answer: "Yes. We stripe multi-sport courts with distinct line colors per sport \u2014 for example, white for pickleball and green for tennis. This keeps gameplay clear without visual clutter." },
];

export default function PickleballCourtInstallationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="Installation Guide"
        date="Mar 5, 2026"
        readTime="14 min read"
        title="Pickleball Court Installation & Surfacing |"
        titleAccent="Central Texas"
        subtitle="Pickleball court installation and surfacing for multi-family amenity centers in Central Texas. Concrete specs, ATS Acrytech system details, costs, and timelines for GCs and developers."
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

        {/* Market Demand */}
        <section id="market-demand">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Why is pickleball court demand surging for developers?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Pickleball is the fastest-growing sport in the U.S. and it is reshaping what tenants and homebuyers expect from amenity centers. Developers who add courts are seeing measurable returns in lease-up speed, rental premiums, and property valuations.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-6 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-2">48.3M</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Players in the U.S.</p>
              <p className="text-xs text-brand-text-muted">Fastest-growing sport, higher lease-up rates</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-2">4:1</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Courts per Tennis Court Footprint</p>
              <p className="text-xs text-brand-text-muted">Better ROI on slab</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-2">+12%</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Property Value Lift</p>
              <p className="text-xs text-brand-text-muted">Higher rents and appraisals</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">For multi-family and HOA projects, pickleball courts deliver more playable court area per square foot of slab than any other racquet sport. Four pickleball courts fit in the footprint of a single tennis court, giving property managers more programming capacity without more concrete.</p>
        </section>

        {/* ATS Acrytech Features */}
        <section id="ats-acrytech">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What makes ATS Acrytech the right surface system?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">We install <Link href="/" className="text-brand-blue hover:underline">ATS Sports Acrytech</Link> on every pickleball court project. It is a professional-grade acrylic system built for the demands of high-traffic amenity centers and the Central Texas climate.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">PPA-Approved Surface System</h3>
              <p className="text-sm text-brand-text-muted">Meets professional standards for ball bounce, surface speed, and traction. Your courts play the way competitive players expect.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Built for Central Texas Heat</h3>
              <p className="text-sm text-brand-text-muted">UV-stable acrylic formulation that holds color and integrity through 100-degree summers. No callbacks after the first season.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Full Color System Options</h3>
              <p className="text-sm text-brand-text-muted">Two-tone, three-tone, and custom color options. Match property branding or architect color specs.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Multi-Layer Durability</h3>
              <p className="text-sm text-brand-text-muted">Resurfacer, cushion coats, color coats, and line paint {"\u2014"} each layer serves a purpose in the system. The result is an 8{"\u2013"}10+ year surface life.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Dual Warranty Coverage</h3>
              <p className="text-sm text-brand-text-muted">ATS manufacturer material warranty plus our 2-year workmanship warranty. Two layers of protection for the property owner.</p>
            </div>
          </div>
        </section>

        {/* Concrete Specs */}
        <section id="concrete-specs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What concrete specs does my slab need to meet?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The slab is the foundation. If it is not right, the surface system cannot perform. Here are the specs your concrete sub needs to hit before we start surfacing.</p>

          <CalloutBox title="Slab Requirements">
            <ul className="space-y-2 list-disc pl-4">
              <li><strong className="text-brand-text">Thickness:</strong> 4{"\""} minimum</li>
              <li><strong className="text-brand-text">Strength:</strong> 3,000 PSI minimum</li>
              <li><strong className="text-brand-text">Finish:</strong> Steel-trowel or broom finish</li>
              <li><strong className="text-brand-text">Slope:</strong> 1% for drainage (no birdbaths)</li>
              <li><strong className="text-brand-text">Joints:</strong> Expansion joints at perimeter only {"\u2014"} not through the playing surface</li>
              <li><strong className="text-brand-text">Cure time:</strong> Full 28-day cure before surfacing begins</li>
            </ul>
          </CalloutBox>

          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">We send a full spec sheet with every bid. Your concrete sub gets exact requirements before they pour.</p>
          </blockquote>
        </section>

        {/* Court Dimensions */}
        <section id="court-dimensions">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are the standard pickleball court dimensions?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Getting the dimensions right matters for competitive play, insurance, and tenant satisfaction. Here are the numbers.</p>

          <CalloutBox title="Court Dimensions">
            <ul className="space-y-2 list-disc pl-4">
              <li><strong className="text-brand-text">Playing area:</strong> {"20' x 44'"}</li>
              <li><strong className="text-brand-text">Minimum with run-outs:</strong> {"30' x 60'"}</li>
              <li><strong className="text-brand-text">Recommended (competitive):</strong> {"34' x 64'"}</li>
              <li><strong className="text-brand-text">Multi-court spacing:</strong> {"10' between courts"}</li>
              <li><strong className="text-brand-text">Net height:</strong> {"36\" at sidelines, 34\" at center"}</li>
              <li><strong className="text-brand-text">Tennis court conversion:</strong> 4 pickleball courts fit on one standard tennis court</li>
            </ul>
          </CalloutBox>

          <p className="text-brand-text-muted leading-relaxed mb-4">{"For multi-court builds on a shared slab, the 10' spacing between courts is critical for player safety and keeps gameplay from overlapping. We recommend the 34' x 64' footprint whenever the slab allows it."}</p>
        </section>

        {/* Costs */}
        <section id="costs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much does pickleball court surfacing cost?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">These are surfacing-only costs for projects where the slab is already poured. All ranges are per court and reflect Central Texas pricing as of 2026.</p>

          <CostTable title="Pickleball Court Surfacing Costs (Per Court)" headers={["Scope Item", "Per Court Range"]} rows={[
            { label: "Surface System (Acrytech)", value: "$4,000 \u2013 $8,000" },
            { label: "Crack Repair / Leveling", value: "$500 \u2013 $2,000" },
            { label: "Custom Color System", value: "$500 \u2013 $1,500" },
            { label: "Line Striping", value: "$300 \u2013 $800" },
            { label: "Pickleball Court Resurfacing", value: "$3,000 \u2013 $6,000" },
          ]} />

          <div className="my-6 space-y-3 text-sm text-brand-text-muted">
            <p><strong className="text-brand-text">Surface System:</strong> Standard two-tone color. Multi-court projects trend toward the lower end of the range.</p>
            <p><strong className="text-brand-text">Crack Repair / Leveling:</strong> Only applies to existing slabs. New pours typically need no repair work.</p>
            <p><strong className="text-brand-text">Custom Color System:</strong> Multi-tone layouts, logos, or property-branded colors add to the base system cost.</p>
            <p><strong className="text-brand-text">Line Striping:</strong> Standard single-sport lines. Multi-sport line striping adds $200{"\u2013"}$400 per court.</p>
            <p><strong className="text-brand-text">Resurfacing:</strong> Full recoat plus new lines on an existing pickleball court.</p>
          </div>
        </section>

        {/* Cost Factors */}
        <section id="cost-factors">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What factors affect pickleball court surfacing costs?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Four variables drive most of the price variance on pickleball surfacing projects.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Court Count</h3>
              <p className="text-sm text-brand-text-muted">Per-court costs decrease on multi-court builds. Mobilization, equipment, and crew costs get amortized across more courts.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Slab Condition</h3>
              <p className="text-sm text-brand-text-muted">New pours in spec require minimal prep. Existing slabs with cracks, birdbaths, or poor finish add repair costs before surfacing can begin.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Color System</h3>
              <p className="text-sm text-brand-text-muted">Standard two-tone is included in the base price. Three-tone, custom colors, logos, or property-branded schemes add material and labor.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Multi-Sport Lines</h3>
              <p className="text-sm text-brand-text-muted">Adding a second or third sport to the line striping (e.g., tennis + pickleball) increases striping time and requires distinct colors per sport.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Frequently asked questions</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Quick answers to the questions GCs and developers ask most about pickleball court installation and surfacing.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing process, costs, and what to expect</Link></li>
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas: what GCs need to budget</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">Request a court surfacing bid (48-hour turnaround)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need a Pickleball Court Surfacing Bid?" description="Send us your court count, slab status, and project timeline. You will have a detailed, line-item bid back within 48 hours." />
      </article>

      <CTABanner />
    </>
  );
}
