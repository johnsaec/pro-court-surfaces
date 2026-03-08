import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Sport Court Surfacing in Austin, TX | Pro Court Surfaces",
  description: "Tennis court resurfacing, pickleball court installation, and sport court surfacing in Austin, TX. Serving Austin, Round Rock, Cedar Park, Georgetown, and the full Central Texas metro.",
  keywords: "court surfacing Austin TX, tennis court resurfacing Austin, pickleball court installation Austin, sport court surfacing Central Texas, court resurfacing Round Rock, court surfacing Cedar Park",
  openGraph: {
    title: "Sport Court Surfacing in Austin, TX",
    description: "Tennis court resurfacing, pickleball court installation, and sport court surfacing in Austin, TX.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/austin-court-surfacing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sport Court Surfacing in Austin, TX",
    description: "Tennis court resurfacing, pickleball court installation, and sport court surfacing in Austin, TX.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/austin-court-surfacing" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sport Court Surfacing in Austin, TX",
  description: "Tennis court resurfacing, pickleball court installation, and sport court surfacing in Austin, TX.",
  author: { "@type": "Organization", name: "Pro Court Surfaces" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-05",
  dateModified: "2026-03-05",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/austin-court-surfacing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What areas in Austin does Pro Court Surfaces serve?", acceptedAnswer: { "@type": "Answer", text: "We serve the full Austin metro area including Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Leander, Kyle, Buda, and Lakeway." } },
    { "@type": "Question", name: "What is the typical lead time for an Austin court surfacing project?", acceptedAnswer: { "@type": "Answer", text: "Most projects have a 2\u20133 week lead time from signed contract to mobilization. Once on site, surfacing typically takes 5\u201310 business days depending on court count and weather." } },
    { "@type": "Question", name: "Do you handle tennis court resurfacing in Austin?", acceptedAnswer: { "@type": "Answer", text: "Yes. We resurface tennis courts using ATS Sports Acrytech acrylic systems, including crack repair, leveling, multi-coat application, and USTA-spec line striping." } },
    { "@type": "Question", name: "Can you install pickleball courts at Austin amenity centers?", acceptedAnswer: { "@type": "Answer", text: "Yes. We install both dedicated pickleball courts and dual-use tennis/pickleball courts with proper USAPA-compliant dimensions and line layouts." } },
    { "@type": "Question", name: "What warranty do you provide on Austin court projects?", acceptedAnswer: { "@type": "Answer", text: "Every project includes the ATS Sports Acrytech manufacturer material warranty plus our own 2-year workmanship warranty covering labor and application quality." } },
    { "@type": "Question", name: "How fast can you turn around a bid for an Austin project?", acceptedAnswer: { "@type": "Answer", text: "We return detailed, line-item bids within 48 hours of receiving your project specs and site plans." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Austin Court Surfacing", item: "https://www.procourtsurfaces.com/blog/austin-court-surfacing" },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pro Court Surfaces",
  description: "Professional sport court surfacing, tennis court resurfacing, and pickleball court installation in Austin, TX and Central Texas.",
  url: "https://www.procourtsurfaces.com",
  telephone: "",
  areaServed: [
    { "@type": "City", name: "Austin", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Round Rock", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Cedar Park", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Georgetown", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Pflugerville", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Leander", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Kyle", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Buda", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Lakeway", containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

const serviceAreas = [
  { city: "Austin", note: "Downtown, South Austin, East Austin, North Austin" },
  { city: "Round Rock", note: "Fast-growing family communities and amenity centers" },
  { city: "Cedar Park", note: "New developments and HOA sport courts" },
  { city: "Georgetown", note: "Sun City and surrounding master-planned communities" },
  { city: "Pflugerville", note: "Rapidly expanding residential and mixed-use projects" },
  { city: "Leander", note: "New construction corridors along US-183" },
  { city: "Kyle", note: "I-35 growth corridor south of Austin" },
  { city: "Buda", note: "Southern metro development and amenity centers" },
  { city: "Lakeway", note: "Lake Travis area private clubs and residential courts" },
];

const services = [
  {
    title: "Tennis Court Surfacing",
    description: "New construction surfacing and full resurfacing using ATS Sports Acrytech acrylic systems. USTA-spec line striping, UV-stable color coats, and multi-coat application for 8\u201310+ year durability under Central Texas sun.",
  },
  {
    title: "Pickleball Court Surfacing",
    description: "Dedicated pickleball court builds and tennis-to-pickleball conversions. USAPA-compliant dimensions, proper NVZ (kitchen) line layouts, and color-coded zones for multi-court facilities.",
  },
  {
    title: "Court Resurfacing & Repair",
    description: "Crack repair, low-spot leveling, full recoats, and color changes on existing courts. We assess surface condition and provide honest recommendations on repair vs. full resurface.",
  },
  {
    title: "Multi-Sport Courts",
    description: "Multi-game line layouts with color-coded zones for tennis, pickleball, and other sports on shared slabs. Custom configurations for amenity centers, parks, and HOA common areas.",
  },
];

const benefits = [
  {
    title: "Local to Austin",
    description: "Central Texas based, no travel markups. We know the local soil conditions, climate challenges, and permitting requirements that affect court surfacing in the Austin metro.",
  },
  {
    title: "Quick Response on Austin Bids",
    description: "48-hour detailed line-item pricing on every bid request. We know you are working on a deadline and cannot wait a week for a number to carry in your estimate.",
  },
  {
    title: "Familiar with Austin Developments",
    description: "From Mueller to Leander to Kyle growth corridors, we have surfaced courts across the metro. We understand the pace and expectations of Central Texas development projects.",
  },
  {
    title: "No Callbacks, No Change Orders",
    description: "ATS Acrytech systems are UV-tested for Texas heat. Every project includes a 2-year workmanship warranty. Clear scopes with no surprise extras mid-project.",
  },
];

const faqItems = [
  {
    question: "What areas in Austin does Pro Court Surfaces serve?",
    answer: "We serve the full Austin metro area including Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Leander, Kyle, Buda, and Lakeway. No travel markups anywhere in the Central Texas metro.",
  },
  {
    question: "What is the typical lead time for an Austin court surfacing project?",
    answer: "Most projects have a 2\u20133 week lead time from signed contract to mobilization. Once on site, surfacing typically takes 5\u201310 business days depending on court count and weather conditions.",
  },
  {
    question: "Do you handle tennis court resurfacing in Austin?",
    answer: "Yes. We resurface tennis courts using ATS Sports Acrytech acrylic systems, including crack repair, leveling, multi-coat application, and USTA-spec line striping. We handle both new construction surfacing and existing court resurfacing.",
  },
  {
    question: "Can you install pickleball courts at Austin amenity centers?",
    answer: "Yes. We install both dedicated pickleball courts and dual-use tennis/pickleball courts with proper USAPA-compliant dimensions and line layouts. Multi-court pickleball builds on shared slabs are one of our most common project types.",
  },
  {
    question: "What warranty do you provide on Austin court projects?",
    answer: "Every project includes the ATS Sports Acrytech manufacturer material warranty plus our own 2-year workmanship warranty covering labor and application quality. No fine print, no exclusions for normal wear.",
  },
  {
    question: "How fast can you turn around a bid for an Austin project?",
    answer: "We return detailed, line-item bids within 48 hours of receiving your project specs and site plans. Every bid breaks out surface prep, materials, labor, and striping so you can carry accurate numbers in your estimate.",
  },
];

const tocItems = [
  { href: "#service-area", label: "What areas in Austin does Pro Court Surfaces serve?" },
  { href: "#services", label: "What court surfacing services are available in Austin?" },
  { href: "#why-austin-gcs", label: "Why do Austin GCs work with Pro Court Surfaces?" },
  { href: "#faq", label: "Frequently asked questions about Austin court surfacing" },
];

export default function AustinCourtSurfacingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <BlogHero
        category="Service Area"
        date="Mar 5, 2026"
        readTime="6 min read"
        title="Sport Court Surfacing in"
        titleAccent="Austin, TX"
        subtitle="Tennis court resurfacing, pickleball court installation, and sport court surfacing for GCs and developers across the Austin metro. ATS Acrytech systems, 48-hour bids, no travel markups."
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

        {/* Service Area */}
        <section id="service-area">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What areas in Austin does Pro Court Surfaces serve?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">We serve the full Austin metro area with no travel markups. Whether your project is in downtown Austin or one of the fast-growing suburbs along I-35 and US-183, we are local and ready to mobilize.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
            {serviceAreas.map((area) => (
              <div key={area.city} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-base font-semibold text-brand-text mb-1">{area.city}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{area.note}</p>
              </div>
            ))}
          </div>
          <p className="text-brand-text-muted leading-relaxed mb-4">All nine cities fall within our standard service radius. No travel fees, no mileage markups. Your bid reflects material and labor costs only.</p>
        </section>

        {/* Services */}
        <section id="services">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What court surfacing services are available in Austin?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">We handle surfacing only {"\u2014"} no fencing, lighting, or accessories. That means zero scope overlap with your other trades and a clean line item in your estimate.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-text mb-2">{service.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <p className="text-brand-text-muted leading-relaxed mb-4">Every service uses <Link href="/" className="text-brand-blue hover:underline">ATS Sports Acrytech</Link> acrylic systems {"\u2014"} the same professional-grade materials used on club and municipal courts across the country.</p>
        </section>

        {/* Why Austin GCs */}
        <section id="why-austin-gcs">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Why do Austin GCs work with Pro Court Surfaces?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Court surfacing is a specialty trade. Most GCs carry it as a sub line item and need a partner who delivers on time, on budget, and without callbacks. Here is what sets us apart in the Austin market.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-brand-text mb-2">{benefit.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">We handle surfacing only. No scope creep, no trade overlap, no surprises. Just a clean sub line item you can count on.</p>
          </blockquote>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Frequently asked questions about Austin court surfacing</h2>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing process, costs, and what to expect</Link></li>
            <li><Link href="/blog/pickleball-court-installation" className="text-brand-blue hover:underline">Pickleball court installation: dimensions, specs, and pricing</Link></li>
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas: what GCs need to budget</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/blog/san-antonio-court-surfacing" className="text-brand-blue hover:underline">Court surfacing in San Antonio, TX</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">Request a court surfacing bid (48-hour turnaround)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need a Court Surfacing Bid in Austin?" description="Send us your court specs and project timeline. You will have a detailed, line-item bid back within 48 hours. No travel markups anywhere in the Austin metro." />
      </article>

      <CTABanner />
    </>
  );
}
