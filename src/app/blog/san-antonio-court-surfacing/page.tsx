import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Pickleball & Tennis Court Surfacing San Antonio | Pro Court Surfaces",
  description: "Tennis court resurfacing and pickleball court installation in San Antonio, TX. Pro Court Surfaces is a sport court surfacing subcontractor for GCs building amenity centers across the San Antonio metro.",
  keywords: "tennis court resurfacing San Antonio, pickleball court installation San Antonio, court surfacing San Antonio TX, sport court contractor San Antonio, court resurfacing New Braunfels, pickleball court San Antonio",
  openGraph: {
    title: "Sport Court Surfacing in San Antonio, TX",
    description: "Tennis court resurfacing and pickleball court installation in San Antonio, TX. Surfacing subcontractor for GCs across the SA metro.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/san-antonio-court-surfacing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sport Court Surfacing in San Antonio, TX",
    description: "Tennis court resurfacing and pickleball court installation in San Antonio, TX.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/san-antonio-court-surfacing" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sport Court Surfacing in San Antonio, TX",
  description: "Tennis court resurfacing and pickleball court installation in San Antonio, TX. Pro Court Surfaces is a sport court surfacing subcontractor for GCs building amenity centers across the San Antonio metro.",
  author: { "@type": "Organization", name: "Pro Court Surfaces" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-05",
  dateModified: "2026-03-05",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/san-antonio-court-surfacing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Who does tennis court resurfacing in San Antonio?", acceptedAnswer: { "@type": "Answer", text: "Pro Court Surfaces handles tennis court resurfacing across San Antonio and the surrounding metro \u2014 New Braunfels, Boerne, Schertz, and the full I-35 corridor. We install ATS Sports Acrytech acrylic surfaces and work as a sub under your GC." } },
    { "@type": "Question", name: "How much does court resurfacing cost in San Antonio?", acceptedAnswer: { "@type": "Answer", text: "Pricing depends on court count, surface condition, and court type. We provide detailed line-item bids within 48 hours \u2014 surface prep, materials, labor, and striping broken out so you have real numbers for your estimate." } },
    { "@type": "Question", name: "Do you install pickleball courts in San Antonio?", acceptedAnswer: { "@type": "Answer", text: "Yes. We install pickleball court surfaces for multi-family amenity centers and commercial projects across the SA metro. ATS Sports Acrytech surfacing, color coating, and line striping \u2014 all to PPA spec." } },
    { "@type": "Question", name: "What warranty do you offer on San Antonio court projects?", acceptedAnswer: { "@type": "Answer", text: "Two layers: ATS Sports Acrytech\u2019s manufacturer warranty on materials, plus our 2-year workmanship warranty on the install. Both sets of documentation go straight into your closeout package." } },
    { "@type": "Question", name: "What areas around San Antonio do you cover?", acceptedAnswer: { "@type": "Answer", text: "Greater SA metro including New Braunfels, San Marcos, Boerne, Helotes, Schertz, Cibolo, and Seguin. We run the I-35 corridor from SA to Austin, so if your project is anywhere in between, we\u2019ve got it covered." } },
    { "@type": "Question", name: "Can you handle both my San Antonio and Austin projects?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. We serve the full Central Texas region. One sub, one bid process, consistent quality across both markets. No need to vet separate surfacing crews for each city." } },
    { "@type": "Question", name: "How does the San Antonio heat affect court surfaces?", acceptedAnswer: { "@type": "Answer", text: "San Antonio\u2019s UV exposure and summer temps are brutal on cheap surfaces. ATS Acrytech is engineered for thermal expansion and UV stability \u2014 no bubbling, no premature failure." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "San Antonio Court Surfacing", item: "https://www.procourtsurfaces.com/blog/san-antonio-court-surfacing" },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pro Court Surfaces",
  description: "Sport court surfacing subcontractor serving San Antonio, TX. Tennis court resurfacing, pickleball court installation, and multi-sport surfacing for general contractors and multi-family amenity centers.",
  areaServed: [
    { "@type": "City", name: "San Antonio", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "New Braunfels", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "San Marcos", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Boerne", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Helotes", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Schertz", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Cibolo", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Seguin", containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: ["Tennis Court Resurfacing", "Pickleball Court Installation", "Sport Court Surfacing", "Court Resurfacing", "Multi-Sport Court Surfacing"],
  knowsAbout: ["ATS Sports Acrytech", "Acrylic Sport Court Surfaces", "Multi-Family Amenity Centers"],
  url: "https://www.procourtsurfaces.com/blog/san-antonio-court-surfacing",
};

const serviceAreas = [
  { city: "San Antonio", note: "Primary service area", primary: true },
  { city: "New Braunfels", note: "I-35 corridor" },
  { city: "San Marcos", note: "I-35 corridor" },
  { city: "Boerne", note: "I-10 west" },
  { city: "Helotes", note: "NW San Antonio" },
  { city: "Schertz", note: "NE San Antonio" },
  { city: "Cibolo", note: "NE San Antonio" },
  { city: "Seguin", note: "I-10 east" },
];

const services = [
  {
    icon: "T",
    title: "Tennis Court Resurfacing",
    description: "Full resurfacing and recoating for existing tennis courts at multi-family amenity centers, parks, and commercial facilities across San Antonio. ATS Sports Acrytech acrylic systems \u2014 UV stable and built for South Texas heat.",
  },
  {
    icon: "P",
    title: "Pickleball Court Installation",
    description: "New pickleball court surfacing for the San Antonio metro\u2019s growing multi-family and commercial market. Proper court dimensions, color coating, and line striping \u2014 installed to PPA standards.",
  },
  {
    icon: "R",
    title: "Court Resurfacing & Recoating",
    description: "Existing courts showing wear? We handle acrylic resurfacing, crack repair, color recoating, and line restriping. Get your San Antonio amenity courts back to spec without tearing out the slab.",
  },
  {
    icon: "M",
    title: "Multi-Sport Court Surfacing",
    description: "Combined tennis and pickleball layouts, basketball overlays, and custom multi-sport configurations for amenity centers that need to serve a range of residents. One surface system, multiple game lines.",
  },
];

const benefits = [
  {
    title: "Growing Multi-Family Market",
    description: "San Antonio is one of the fastest-growing metros in Texas. New multi-family developments mean more amenity centers, more courts, and more need for a surfacing sub who can keep up with volume.",
  },
  {
    title: "I-35 Corridor Access",
    description: "We run the full I-35 corridor from San Antonio through New Braunfels, San Marcos, and into Austin. One sub for your SA and Austin projects \u2014 no need to source separate crews by market.",
  },
  {
    title: "48-Hour Bids, No Games",
    description: "Send us site plans and court specs. You\u2019ll have a detailed, line-item bid in 48 hours \u2014 real numbers you can plug into your estimate and stand behind at the bid table.",
  },
  {
    title: "2-Year Workmanship Warranty",
    description: "ATS Sports Acrytech manufacturer warranty on materials, plus our 2-year workmanship warranty on the install. Both go in your closeout package. No callbacks, no finger-pointing.",
  },
  {
    title: "South Texas Heat Tested",
    description: "San Antonio summers push surfaces hard. ATS Acrytech is engineered for UV stability and thermal expansion \u2014 no bubbling, no peeling, no early resurfacing from heat damage.",
  },
  {
    title: "Clean Scope, Zero Overlap",
    description: "Surfacing only. We don\u2019t touch fencing, lighting, net posts, or concrete. Your other trades stay in their lane, and so do we. No change orders from scope creep.",
  },
];

const projects = [
  {
    title: "Multi-Family Amenity Center",
    description: "Tennis and pickleball court surfacing for a 300+ unit apartment community",
    tags: ["Tennis", "Pickleball"],
    location: "San Antonio, TX",
  },
  {
    title: "HOA Court Resurfacing",
    description: "Full resurfacing and restriping of existing tennis courts at a master-planned community",
    tags: ["Resurfacing"],
    location: "New Braunfels, TX",
  },
  {
    title: "Commercial Multi-Sport Facility",
    description: "Multi-sport court surfacing with pickleball and basketball overlays",
    tags: ["Multi-Sport"],
    location: "Schertz, TX",
  },
];

const faqItems = [
  {
    question: "Who does tennis court resurfacing in San Antonio?",
    answer: "Pro Court Surfaces handles tennis court resurfacing across San Antonio and the surrounding metro \u2014 New Braunfels, Boerne, Schertz, and the full I-35 corridor. We install ATS Sports Acrytech acrylic surfaces and work as a sub under your GC.",
  },
  {
    question: "How much does court resurfacing cost in San Antonio?",
    answer: "Pricing depends on court count, surface condition, and court type. Rather than a vague range, we provide detailed line-item bids within 48 hours \u2014 surface prep, materials, labor, and striping broken out so you have real numbers for your estimate.",
  },
  {
    question: "Do you install pickleball courts in San Antonio?",
    answer: "Yes. We install pickleball court surfaces for multi-family amenity centers and commercial projects across the SA metro. ATS Sports Acrytech surfacing, color coating, and line striping \u2014 all to PPA spec.",
  },
  {
    question: "What warranty do you offer on San Antonio court projects?",
    answer: "Two layers: ATS Sports Acrytech\u2019s manufacturer warranty on materials, plus our 2-year workmanship warranty on the install. Both sets of documentation go straight into your closeout package.",
  },
  {
    question: "What areas around San Antonio do you cover?",
    answer: "Greater SA metro including New Braunfels, San Marcos, Boerne, Helotes, Schertz, Cibolo, and Seguin. We run the I-35 corridor from SA to Austin, so if your project is anywhere in between, we\u2019ve got it covered.",
  },
  {
    question: "Can you handle both my San Antonio and Austin projects?",
    answer: "Absolutely. We serve the full Central Texas region. One sub, one bid process, consistent quality across both markets. No need to vet separate surfacing crews for each city.",
  },
  {
    question: "How does the San Antonio heat affect court surfaces?",
    answer: "San Antonio\u2019s UV exposure and summer temps are brutal on cheap surfaces. ATS Acrytech is engineered for thermal expansion and UV stability \u2014 it\u2019s the same system used on commercial courts across the Sun Belt. No bubbling, no premature failure.",
  },
];

const tocItems = [
  { href: "#service-area", label: "What areas in San Antonio do you serve?" },
  { href: "#services", label: "What court surfacing services do you offer in San Antonio?" },
  { href: "#why-sa", label: "Why do San Antonio GCs choose Pro Court Surfaces?" },
  { href: "#projects", label: "What types of San Antonio projects do you handle?" },
  { href: "#faq", label: "San Antonio court surfacing FAQ" },
];

export default function SanAntonioCourtSurfacingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <BlogHero
        category="San Antonio, TX"
        date="Mar 5, 2026"
        readTime="8 min read"
        title="Sport Court Surfacing in"
        titleAccent="San Antonio, TX"
        subtitle="Tennis court resurfacing, pickleball court installation, and multi-sport surfacing for general contractors across the San Antonio metro. ATS Sports Acrytech surfaces — installed on your schedule, backed by a 2-year workmanship warranty."
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
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What areas in San Antonio do you serve?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">We cover San Antonio and the surrounding cities. If your project is along the I-35 corridor between SA and Austin, we can get there.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {serviceAreas.map((area) => (
              <div
                key={area.city}
                className={`p-4 rounded-xl border text-center transition-colors ${
                  area.primary
                    ? "border-brand-blue bg-blue-50"
                    : "border-gray-200 bg-white hover:border-brand-blue"
                }`}
              >
                <p className={`text-sm font-semibold ${area.primary ? "text-brand-blue" : "text-brand-text"}`}>{area.city}</p>
                <p className="text-xs text-brand-text-muted mt-0.5">{area.note}</p>
              </div>
            ))}
          </div>
          <CalloutBox title="I-35 Corridor Coverage">
            <p>{"We\u2019re based in Central Texas and operate across the full I-35 corridor from San Antonio through New Braunfels, San Marcos, and into Austin. For projects outside these cities, "}
              <Link href="/#contact" className="text-brand-blue hover:underline">reach out</Link>
              {" \u2014 if we can get there, we will."}
            </p>
          </CalloutBox>
        </section>

        {/* Services */}
        <section id="services">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What court surfacing services do you offer in San Antonio?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Surfacing only. Zero scope overlap with your other trades. Here is what we handle on San Antonio projects.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {services.map((service) => (
              <div key={service.title} className="p-6 bg-white border border-gray-200 rounded-xl hover:border-brand-blue transition-colors">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-brand-blue font-bold text-sm mb-3">
                  {service.icon}
                </div>
                <h3 className="text-base font-semibold text-brand-text mb-2">{service.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why SA GCs */}
        <section id="why-sa">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Why do San Antonio GCs choose Pro Court Surfaces?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">{"San Antonio\u2019s multi-family construction is booming. Here is why GCs across the metro bring us onto their court projects."}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {benefits.map((benefit, i) => (
              <div key={benefit.title} className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-blue transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-brand-blue font-bold text-sm font-serif">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-brand-text mb-1">{benefit.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What types of San Antonio projects do you handle?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Case studies coming soon. Here is a preview of the types of projects we handle for San Antonio general contractors.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {projects.map((project) => (
              <div key={project.title} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-blue transition-colors">
                <div className="h-40 bg-brand-bg-alt flex items-center justify-center">
                  <span className="text-sm text-brand-text-muted font-medium tracking-wide">Photo Coming Soon</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-brand-text mb-1">{project.title}</h3>
                  <p className="text-xs text-brand-text-muted leading-relaxed mb-2">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-brand-text-muted">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-blue-50 text-brand-blue px-2 py-0.5 rounded font-semibold">{tag}</span>
                    ))}
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">San Antonio court surfacing FAQ</h2>
          <p className="text-brand-text-muted leading-relaxed mb-2">Questions San Antonio GCs ask us.</p>
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
            <li><Link href="/blog/austin-court-surfacing" className="text-brand-blue hover:underline">Court surfacing in Austin, TX</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">Request a court surfacing bid (48-hour turnaround)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need a Surfacing Bid for Your San Antonio Project?" description="Send us your court specs and project timeline. You will have a detailed, line-item bid back within 48 hours. San Antonio metro, I-35 corridor, and surrounding areas." />
      </article>

      <CTABanner />
    </>
  );
}
