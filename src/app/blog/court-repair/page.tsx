import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Tennis & Pickleball Court Repair in Austin TX | Pro Court Surfaces",
  description: "Court crack repair, delamination fixes, and surface restoration in Austin, TX. Pro Court Surfaces handles standalone repairs and full resurfacing for tennis, pickleball, and basketball courts.",
  keywords: "tennis court repair, tennis court repair austin, tennis court crack repair, pickleball court repair, court repair near me, tennis court repair cost, court delamination repair",
  openGraph: {
    title: "Tennis & Pickleball Court Repair | Austin, TX",
    description: "Court crack repair, delamination fixes, and surface restoration in Austin, TX. Standalone repairs and full resurfacing for tennis, pickleball, and basketball courts.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/court-repair",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis & Pickleball Court Repair | Austin, TX",
    description: "Court crack repair, delamination fixes, and surface restoration in Austin, TX. Standalone repairs and full resurfacing for tennis, pickleball, and basketball courts.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/court-repair" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tennis & Pickleball Court Repair in Austin, TX",
  description: "Court crack repair, delamination fixes, and surface restoration in Austin, TX. Standalone repairs and full resurfacing for tennis, pickleball, and basketball courts.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/court-repair" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can you repair court cracks without resurfacing?", acceptedAnswer: { "@type": "Answer", text: "Yes. We do standalone crack repair for isolated damage. If the rest of the surface is in good condition, there\u2019s no need for a full resurface \u2014 we fill and seal the cracks and you\u2019re back to playing." } },
    { "@type": "Question", name: "What causes tennis court delamination?", acceptedAnswer: { "@type": "Answer", text: "Delamination is caused by moisture trapped under the surface, applying coatings over uncured concrete, poor surface prep before coating, or using low-quality paint instead of a proper acrylic system." } },
    { "@type": "Question", name: "How long does court repair take?", acceptedAnswer: { "@type": "Answer", text: "Standalone repairs typically take 1\u20133 days depending on the scope. If combined with a full resurface, the total project runs 3\u20135 days." } },
    { "@type": "Question", name: "Do you repair pickleball courts?", acceptedAnswer: { "@type": "Answer", text: "Yes. The repair process is the same for pickleball courts \u2014 crack filling, delamination removal, low-spot leveling, and surface patching. We work on dedicated pickleball courts and shared tennis/pickleball courts." } },
    { "@type": "Question", name: "Do you repair basketball courts?", acceptedAnswer: { "@type": "Answer", text: "Yes. We repair all sport court types including basketball courts. Crack repair, delamination fixes, and leveling apply to any acrylic sport surface." } },
    { "@type": "Question", name: "Can you fix ponding or birdbaths on my court?", acceptedAnswer: { "@type": "Answer", text: "Yes. Low-spot leveling uses acrylic filler to build up depressions where water collects. This restores proper drainage and eliminates standing water after rain." } },
    { "@type": "Question", name: "Do you serve Austin?", acceptedAnswer: { "@type": "Answer", text: "Yes. We serve the full Austin metro area including Round Rock, Cedar Park, Georgetown, and surrounding Central Texas communities." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Court Repair", item: "https://www.procourtsurfaces.com/blog/court-repair" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Court Repair",
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
  ],
  serviceType: "Sport Court Repair",
  description: "Professional tennis, pickleball, and basketball court repair in Austin, TX. Crack repair, delamination fixes, low-spot leveling, and surface patching.",
};

const tocItems = [
  { href: "#repair-types", label: "What types of court repairs do we handle?" },
  { href: "#crack-causes", label: "What causes court cracks in Austin?" },
  { href: "#delamination", label: "What is court delamination?" },
  { href: "#repair-vs-resurface", label: "When should I repair vs resurface?" },
  { href: "#faq", label: "Court repair FAQs" },
];

const repairTypes = [
  {
    title: "Crack Repair",
    description: "The most common court repair. Cracks caused by bad concrete, settling, tree roots, or thermal expansion are filled and sealed to restore a smooth playing surface.",
  },
  {
    title: "Delamination Repair",
    description: "Surface coating peeling away from the concrete underneath. We remove the failed coating, prep the concrete, and reapply a proper acrylic system.",
  },
  {
    title: "Low-Spot Leveling",
    description: "Birdbaths and ponding areas where water collects after rain. Acrylic filler builds up depressions to restore proper drainage across the court.",
  },
  {
    title: "Surface Patching",
    description: "Localized damage repair for areas where the surface has chipped, worn through, or been physically damaged. Targeted fixes without touching the rest of the court.",
  },
];

const crackCauses = [
  {
    title: "Bad Concrete",
    description: "Insufficient thickness, wrong PSI rating, or improper curing during original construction. The most common root cause of early cracking.",
  },
  {
    title: "Ground Settling",
    description: "Central Texas clay soil expands and contracts with moisture changes. This movement shifts the concrete slab and opens cracks over time.",
  },
  {
    title: "Tree Root Pressure",
    description: "Common in older Austin neighborhoods. Roots growing under the slab lift and crack the concrete from below.",
  },
  {
    title: "Thermal Expansion",
    description: "Extreme Texas heat cycles cause rigid concrete to expand and contract repeatedly, eventually cracking at stress points.",
  },
  {
    title: "Age",
    description: "All court surfaces degrade eventually. A typical acrylic surface lasts 8\u201310 years before repairs or resurfacing become necessary.",
  },
];

const faqItems = [
  {
    question: "Can you repair court cracks without resurfacing?",
    answer: "Yes. We do standalone crack repair for isolated damage. If the rest of the surface is in good condition, there\u2019s no need for a full resurface \u2014 we fill and seal the cracks and you\u2019re back to playing.",
  },
  {
    question: "What causes tennis court delamination?",
    answer: "Delamination is caused by moisture trapped under the surface, applying coatings over uncured concrete, poor surface prep before coating, or using low-quality paint instead of a proper acrylic system.",
  },
  {
    question: "How long does court repair take?",
    answer: "Standalone repairs typically take 1\u20133 days depending on the scope. If combined with a full resurface, the total project runs 3\u20135 days.",
  },
  {
    question: "Do you repair pickleball courts?",
    answer: "Yes. The repair process is the same for pickleball courts \u2014 crack filling, delamination removal, low-spot leveling, and surface patching. We work on dedicated pickleball courts and shared tennis/pickleball courts.",
  },
  {
    question: "Do you repair basketball courts?",
    answer: "Yes. We repair all sport court types including basketball courts. Crack repair, delamination fixes, and leveling apply to any acrylic sport surface.",
  },
  {
    question: "Can you fix ponding or birdbaths on my court?",
    answer: "Yes. Low-spot leveling uses acrylic filler to build up depressions where water collects. This restores proper drainage and eliminates standing water after rain.",
  },
  {
    question: "Do you serve Austin?",
    answer: "Yes. We serve the full Austin metro area including Round Rock, Cedar Park, Georgetown, and surrounding Central Texas communities.",
  },
];

export default function CourtRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="Repair Guide"
        date="Mar 9, 2026"
        readTime="7 min read"
        title="Tennis & Pickleball Court Repair |"
        titleAccent="Austin, TX"
        subtitle="Court crack repair, delamination fixes, and surface restoration in Austin, TX. We handle standalone repairs and full resurfacing for tennis, pickleball, and basketball courts."
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

        {/* What Types of Court Repairs Do We Handle? */}
        <section id="repair-types">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What types of court repairs do we handle?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">We handle the four most common court repair issues across the Austin metro area. Every repair uses professional-grade acrylic materials designed for outdoor sport surfaces {"\u2014"} not hardware-store crack filler or house paint.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            {repairTypes.map((repair) => (
              <div key={repair.title} className="p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-blue/30 transition-colors">
                <h3 className="text-base font-semibold text-brand-text mb-2">{repair.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{repair.description}</p>
              </div>
            ))}
          </div>
          <CalloutBox title="Standalone Repairs Available">
            <p>You don{"\u2019"}t always need a full resurface. If the damage is isolated {"\u2014"} a few cracks, a small delaminated area, one low spot {"\u2014"} we can repair just those areas without touching the rest of the court. We also do repair + resurface together when the scope calls for it.</p>
          </CalloutBox>
        </section>

        {/* What Causes Court Cracks in Austin? */}
        <section id="crack-causes">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What causes court cracks in Austin?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Cracks are the number one court repair issue in Central Texas. Understanding the root cause helps determine the right fix {"\u2014"} and whether the cracks will come back.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            {crackCauses.map((cause) => (
              <div key={cause.title} className="p-5 bg-white border border-gray-200 rounded-xl hover:border-brand-blue/30 transition-colors">
                <h3 className="text-base font-semibold text-brand-text mb-2">{cause.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{cause.description}</p>
              </div>
            ))}
          </div>
          <CalloutBox title="Austin-Specific Note">
            <p>Central Texas clay soil is one of the most expansive soil types in the country. Courts built on untreated clay are significantly more likely to develop cracks from ground movement. If you{"\u2019"}re in Austin, Round Rock, Cedar Park, or Georgetown, soil conditions are a major factor in court longevity.</p>
          </CalloutBox>
        </section>

        {/* What Is Court Delamination? */}
        <section id="delamination">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What is court delamination?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Delamination is when the surface coating separates from the concrete underneath. It looks like bubbling, peeling, or flaking {"\u2014"} and it gets worse over time as water works its way under the loose coating.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4"><strong className="text-brand-text">Common causes:</strong></p>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Moisture trapped under the surface</strong> {"\u2014"} Water vapor migrating up through the concrete pushes the coating off</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Coating applied over uncured concrete</strong> {"\u2014"} New concrete needs proper cure time before coating; rushing causes adhesion failure</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Poor surface prep</strong> {"\u2014"} Coating applied over dirty, dusty, or unsealed concrete won{"\u2019"}t bond</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Low-quality paint</strong> {"\u2014"} House paint or cheap coatings aren{"\u2019"}t formulated for sport court adhesion and UV exposure</li>
          </ul>
          <p className="text-brand-text-muted leading-relaxed mb-4"><strong className="text-brand-text">The fix:</strong> Remove all failed coating down to bare concrete, pressure wash and prep the surface, then reapply a proper multi-coat acrylic system designed for outdoor sport courts.</p>
          <CalloutBox title="Why Delamination Happens">
            <p>Delamination is usually a sign the original surfacing was done wrong. A proper acrylic system like ATS Acrytech bonds correctly to prepared concrete and won{"\u2019"}t delaminate. If your court is peeling, the root cause is almost always in the original prep or materials {"\u2014"} not normal wear.</p>
          </CalloutBox>
        </section>

        {/* When Should I Repair vs Resurface? */}
        <section id="repair-vs-resurface">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">When should I repair vs resurface?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Not every court needs a full resurface. Here{"\u2019"}s how to know which scope makes sense for your situation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Repair Only</h3>
              <ul className="space-y-2 pl-4 list-disc">
                <li className="text-sm text-brand-text-muted leading-relaxed">Isolated cracks in an otherwise sound surface</li>
                <li className="text-sm text-brand-text-muted leading-relaxed">Small delaminated areas {"\u2014"} less than 20% of total surface</li>
                <li className="text-sm text-brand-text-muted leading-relaxed">Minor low spots causing localized ponding</li>
                <li className="text-sm text-brand-text-muted leading-relaxed">Surface is less than 8 years old and in generally good condition</li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Full Resurface</h3>
              <ul className="space-y-2 pl-4 list-disc">
                <li className="text-sm text-brand-text-muted leading-relaxed">Widespread cracking across multiple areas</li>
                <li className="text-sm text-brand-text-muted leading-relaxed">Significant fading, chalking, or color loss</li>
                <li className="text-sm text-brand-text-muted leading-relaxed">Multiple problem areas {"\u2014"} cracks, peeling, and ponding together</li>
                <li className="text-sm text-brand-text-muted leading-relaxed">Surface is 8+ years old and showing overall wear</li>
              </ul>
            </div>
          </div>
          <CalloutBox title="Rule of Thumb">
            <p>If more than 20{"\u2013"}30% of the surface has issues, a full resurface is more cost-effective than patching everywhere. Patching a heavily damaged court creates an uneven patchwork that doesn{"\u2019"}t play well and won{"\u2019"}t last. See our <Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">full resurfacing guide</Link> for process, pricing, and what to expect.</p>
          </CalloutBox>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Court repair FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions about court crack repair, delamination fixes, and surface restoration in Austin and Central Texas.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing: process, costs, and what to expect</Link></li>
            <li><Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">Pickleball court conversion guide</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">Request a court surfacing bid (48-hour turnaround)</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need a Court Repair Assessment?" description="Send us photos of the damage and we'll tell you whether you need a repair, a resurface, or both. Free assessment, 48-hour response." />
      </article>

      <CTABanner />
    </>
  );
}
