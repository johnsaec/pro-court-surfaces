import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CostTable } from "../_components/CostTable";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";

export const metadata: Metadata = {
  title: "Tennis & Pickleball Court Resurfacing | Central Texas | Pro Court Surfaces",
  description: "Tennis court resurfacing, pickleball court resurfacing, and basketball court refinishing in Central Texas. Process, cost guide, and FAQs from Pro Court Surfaces.",
  keywords: "court resurfacing, tennis court resurfacing, pickleball court resurfacing, basketball court resurfacing, court refinishing, Central Texas",
  openGraph: {
    title: "Tennis & Pickleball Court Resurfacing | Central Texas",
    description: "Tennis court resurfacing, pickleball court resurfacing, and basketball court refinishing in Central Texas.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/court-resurfacing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis & Pickleball Court Resurfacing | Central Texas",
    description: "Tennis court resurfacing, pickleball court resurfacing, and basketball court refinishing in Central Texas.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/court-resurfacing" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tennis & Pickleball Court Resurfacing in Central Texas",
  description: "Tennis court resurfacing, pickleball court resurfacing, and basketball court refinishing in Central Texas.",
  author: { "@type": "Organization", name: "Pro Court Surfaces" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-05",
  dateModified: "2026-03-05",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/court-resurfacing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is the difference between court resurfacing and court refinishing?", acceptedAnswer: { "@type": "Answer", text: "Court resurfacing involves a full acrylic system application: surface prep, crack repair, leveling, multiple coats of acrylic, and new line striping. Refinishing typically refers to a lighter maintenance scope such as a single recoat or color refresh without full prep work. Resurfacing restores structural and playing performance; refinishing is cosmetic." } },
    { "@type": "Question", name: "How long does tennis court resurfacing take?", acceptedAnswer: { "@type": "Answer", text: "A single tennis court typically takes 5-7 business days from surface prep through final line striping. Multi-court projects run 7-12 business days depending on court count and weather conditions." } },
    { "@type": "Question", name: "Do courts need to be closed during resurfacing?", acceptedAnswer: { "@type": "Answer", text: "Yes, courts must be fully closed during resurfacing and curing. For multi-court facilities, we can phase the work so some courts remain playable while others are being resurfaced." } },
    { "@type": "Question", name: "How often do sport courts need to be resurfaced?", acceptedAnswer: { "@type": "Answer", text: "With a professional-grade system like ATS Sports Acrytech, courts typically last 7-10 years before needing resurfacing. Lower-quality systems may require resurfacing in as few as 3-5 years." } },
    { "@type": "Question", name: "What surface system do you use for resurfacing?", acceptedAnswer: { "@type": "Answer", text: "We use the ATS Sports Acrytech system, a PPA-approved multi-coat acrylic system. It includes filler coats, color coats, and a textured finish designed for consistent ball bounce and player traction." } },
    { "@type": "Question", name: "Can you resurface a tennis court into pickleball courts?", acceptedAnswer: { "@type": "Answer", text: "Yes. We can convert a tennis court to dedicated pickleball courts or add pickleball lines for dual-use play. Conversions include full resurfacing, new color zones, and precision line striping per PPA specs." } },
    { "@type": "Question", name: "What do you need from us to bid a resurfacing project?", acceptedAnswer: { "@type": "Answer", text: "Court count and type, court dimensions, current surface condition and age, project timeline, and photos of the existing surface. Site plans are helpful if available." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Court Resurfacing", item: "https://www.procourtsurfaces.com/blog/court-resurfacing" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Court Resurfacing",
  provider: {
    "@type": "Organization",
    name: "Pro Court Surfaces",
    url: "https://www.procourtsurfaces.com",
  },
  areaServed: {
    "@type": "State",
    name: "Texas",
  },
  serviceType: "Sport Court Resurfacing",
  description: "Professional tennis, pickleball, basketball, and multi-sport court resurfacing in Central Texas using the ATS Sports Acrytech system.",
};

const tocItems = [
  { href: "#what-we-resurface", label: "What types of courts do you resurface?" },
  { href: "#resurfacing-process", label: "What is the court resurfacing process?" },
  { href: "#cost-guide", label: "How much does court resurfacing cost?" },
  { href: "#cost-factors", label: "What factors affect resurfacing cost?" },
  { href: "#faq", label: "Court resurfacing FAQs" },
  { href: "#get-a-bid", label: "How do I get a resurfacing bid?" },
];

const courtTypes = [
  {
    title: "Tennis Court Resurfacing",
    description: "Full acrylic resurface with crack repair, leveling, multi-coat application, and USTA-spec line striping.",
  },
  {
    title: "Pickleball Court Resurfacing",
    description: "PPA-approved acrylic system for dedicated pickleball courts and tennis-to-pickleball conversions.",
  },
  {
    title: "Basketball Court Resurfacing",
    description: "Durable acrylic surface system with custom colors, built for heavy traffic and outdoor exposure.",
  },
  {
    title: "Multi-Sport Court Resurfacing",
    description: "Multi-game line striping with color-coded zones for combined tennis, pickleball, and basketball play.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Site Assessment",
    description: "We inspect the existing surface for cracks, delamination, drainage issues, and structural concerns. You receive a written condition report within 48 hours with a recommended scope of work.",
  },
  {
    step: 2,
    title: "Surface Prep",
    description: "Pressure washing to remove dirt, debris, and loose material. Crack filling with flexible acrylic filler. Low-spot leveling to restore proper drainage and a smooth playing surface.",
  },
  {
    step: 3,
    title: "Acrytech Application",
    description: "3\u20135 coats of ATS Sports Acrytech acrylic applied per manufacturer specifications. Each coat is weather-monitored for temperature and humidity to ensure proper adhesion and curing.",
  },
  {
    step: 4,
    title: "Curing",
    description: "24\u201372 hours of cure time depending on conditions. Courts remain closed during this phase. On multi-court projects, we coordinate with other trades to minimize downtime.",
  },
  {
    step: 5,
    title: "Line Striping",
    description: "Precision game lines applied per USTA and PPA specifications. Multi-sport courts receive color-coded line systems. Closeout documentation and warranty paperwork delivered at project completion.",
  },
];

const faqItems = [
  {
    question: "What is the difference between court resurfacing and court refinishing?",
    answer: "Court resurfacing involves a full acrylic system application: surface prep, crack repair, leveling, multiple coats of acrylic, and new line striping. Refinishing typically refers to a lighter maintenance scope such as a single recoat or color refresh without full prep work. Resurfacing restores structural and playing performance; refinishing is cosmetic.",
  },
  {
    question: "How long does tennis court resurfacing take?",
    answer: "A single tennis court typically takes 5\u20137 business days from surface prep through final line striping. Multi-court projects run 7\u201312 business days depending on court count and weather conditions.",
  },
  {
    question: "Do courts need to be closed during resurfacing?",
    answer: "Yes, courts must be fully closed during resurfacing and curing. For multi-court facilities, we can phase the work so some courts remain playable while others are being resurfaced.",
  },
  {
    question: "How often do sport courts need to be resurfaced?",
    answer: "With a professional-grade system like ATS Sports Acrytech, courts typically last 7\u201310 years before needing resurfacing. Lower-quality systems may require resurfacing in as few as 3\u20135 years.",
  },
  {
    question: "What surface system do you use for resurfacing?",
    answer: "We use the ATS Sports Acrytech system, a PPA-approved multi-coat acrylic system. It includes filler coats, color coats, and a textured finish designed for consistent ball bounce and player traction.",
  },
  {
    question: "Can you resurface a tennis court into pickleball courts?",
    answer: "Yes. We can convert a tennis court to dedicated pickleball courts or add pickleball lines for dual-use play. Conversions include full resurfacing, new color zones, and precision line striping per PPA specs.",
  },
  {
    question: "What do you need from us to bid a resurfacing project?",
    answer: "Court count and type, court dimensions, current surface condition and age, project timeline, and photos of the existing surface. Site plans are helpful if available.",
  },
];

export default function CourtResurfacingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="Resurfacing Guide"
        date="Mar 5, 2026"
        readTime="8 min read"
        title="Tennis & Pickleball Court Resurfacing |"
        titleAccent="Central Texas"
        subtitle="Tennis court resurfacing, pickleball court resurfacing, and basketball court refinishing in Central Texas. Process, pricing, and everything GCs and facility managers need to know."
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

        {/* What We Resurface */}
        <section id="what-we-resurface">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What types of courts do you resurface?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">We resurface all standard sport court types across Central Texas. Every project uses the ATS Sports Acrytech acrylic system {"\u2014"} a professional-grade, multi-coat surface built for outdoor durability and consistent play performance.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {courtTypes.map((court) => (
              <div key={court.title} className="p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-blue/30 transition-colors">
                <h3 className="text-base font-semibold text-brand-text mb-2">{court.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{court.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resurfacing Process */}
        <section id="resurfacing-process">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What is the court resurfacing process?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Our resurfacing process follows five phases, from initial assessment through final line striping. Each phase has clear deliverables so you know exactly where the project stands.</p>
          <div className="space-y-6 my-8">
            {processSteps.map((step) => (
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
          <CalloutBox title="Weather & Scheduling">
            <p>Acrylic application requires dry conditions and temperatures above 50{"\u00b0"}F. We monitor weather forecasts daily and adjust scheduling to avoid rain delays. In Central Texas, the best resurfacing windows are March{"\u2013"}May and September{"\u2013"}November.</p>
          </CalloutBox>
        </section>

        {/* Cost Guide */}
        <section id="cost-guide">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much does court resurfacing cost?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The table below shows typical per-court resurfacing costs in Central Texas as of 2026. All ranges include surface prep, 3{"\u2013"}5 coats of acrylic, and game line striping.</p>
          <CostTable
            title="Court Resurfacing Cost Guide (Per Court)"
            headers={["Court Type", "Cost Range"]}
            rows={[
              { label: "Tennis Court Resurfacing \u2014 Prep, 3\u20135 coats, lines", value: "$6,000 \u2013 $12,000" },
              { label: "Pickleball Court Resurfacing \u2014 Prep, 3\u20135 coats, lines", value: "$3,500 \u2013 $7,000" },
              { label: "Basketball Court Resurfacing \u2014 Prep, 3\u20135 coats, lines", value: "$5,000 \u2013 $10,000" },
              { label: "Multi-Sport Court Resurfacing \u2014 Prep, 3\u20135 coats, multi-line", value: "$5,000 \u2013 $11,000" },
            ]}
          />
          <CalloutBox title="Multi-Court Pricing">
            <p>Per-court costs decrease on projects with multiple courts. Mobilization, equipment, and crew costs get spread across more courts. Request a bid with your full court count for accurate project pricing.</p>
          </CalloutBox>
        </section>

        {/* Cost Factors */}
        <section id="cost-factors">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What factors affect resurfacing cost?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Three primary factors drive where your project lands within the cost ranges above.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Surface Condition</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Courts with significant cracking, delamination, or drainage issues require more prep work {"\u2014"} crack filling, leveling, and potentially patching {"\u2014"} which increases the scope and cost.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Court Count</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">More courts on a single project means lower per-court costs. Mobilization, equipment transport, and crew setup get amortized across the full scope.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Color System</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Multi-color court designs with separate inside, outside, and line colors require additional masking and application passes compared to single-color layouts.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Court resurfacing FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions from GCs, facility managers, and property owners about the resurfacing process.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Get a Bid */}
        <section id="get-a-bid">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How do I get a resurfacing bid?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Send us the following and we will have a detailed, line-item bid back within 48 hours.</p>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Court count and type</strong> {"\u2014"} Tennis, pickleball, basketball, multi-sport, or a mix</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Court dimensions</strong> {"\u2014"} Standard or custom sizing</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Current surface condition</strong> {"\u2014"} Age of existing surface and known issues (cracking, peeling, ponding)</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Project timeline</strong> {"\u2014"} When you need the work completed</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Photos</strong> {"\u2014"} A few photos of the existing court surface help us scope accurately</li>
          </ul>
          <p className="text-brand-text-muted leading-relaxed mb-4">We handle surfacing only {"\u2014"} no fencing, lighting, or accessories. That means zero scope overlap with your other trades and a clean line item in your estimate.</p>
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas: what GCs need to budget (2026)</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">Request a court surfacing bid (48-hour turnaround)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need a Resurfacing Bid?" description="Send us your court details and timeline. You will have a detailed, line-item bid back within 48 hours." />
      </article>
    </>
  );
}
