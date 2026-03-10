import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Tennis & Pickleball Court Maintenance Guide (2026) | Pro Court Surfaces",
  description: "Court maintenance, cleaning, and pressure washing guide for tennis and pickleball courts in Austin, TX. How to extend your court's life and know when it's time to resurface.",
  keywords: "tennis court maintenance, tennis court cleaning, pickleball court maintenance, tennis court pressure washing, sport court maintenance, court cleaning, court maintenance schedule",
  openGraph: {
    title: "Tennis & Pickleball Court Maintenance Guide | Austin, TX",
    description: "Court maintenance, cleaning, and pressure washing guide for tennis and pickleball courts in Austin, TX.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/court-maintenance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis & Pickleball Court Maintenance Guide | Austin, TX",
    description: "Court maintenance, cleaning, and pressure washing guide for tennis and pickleball courts in Austin, TX.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/court-maintenance" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tennis & Pickleball Court Maintenance Guide (2026)",
  description: "Court maintenance, cleaning, and pressure washing guide for tennis and pickleball courts in Austin, TX. How to extend your court's life and know when it's time to resurface.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/court-maintenance" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How often should I clean my tennis court?", acceptedAnswer: { "@type": "Answer", text: "Sweep or blow debris off monthly and schedule a professional low-pressure wash annually. Courts under heavy tree cover may need more frequent cleaning." } },
    { "@type": "Question", name: "Can you pressure wash a pickleball court?", acceptedAnswer: { "@type": "Answer", text: "Yes, but only with low pressure — under 1,500 PSI. High-pressure settings will damage the acrylic surface coating." } },
    { "@type": "Question", name: "How much does court cleaning cost?", acceptedAnswer: { "@type": "Answer", text: "Cost depends on the number of courts and current condition. Contact us for a quote — we offer standalone cleaning as a service." } },
    { "@type": "Question", name: "Does court cleaning remove cracks?", acceptedAnswer: { "@type": "Answer", text: "No. Cleaning addresses dirt, algae, and staining. Cracks require structural repair with acrylic filler — a separate service." } },
    { "@type": "Question", name: "How do I prevent algae on my court in Austin?", acceptedAnswer: { "@type": "Answer", text: "Keep leaves and organic debris off the surface, ensure good drainage, and schedule an annual professional pressure wash. Trimming overhanging branches also helps by reducing shade and moisture." } },
    { "@type": "Question", name: "When should I resurface instead of just cleaning?", acceptedAnswer: { "@type": "Answer", text: "When you see widespread cracking, peeling, or significant fading and the surface is 8 or more years old, it's time for a full resurface rather than just cleaning." } },
    { "@type": "Question", name: "Do you offer court maintenance services?", acceptedAnswer: { "@type": "Answer", text: "Yes. We offer professional court cleaning, pressure washing, crack repair, color recoats, and full resurfacing for tennis, pickleball, and basketball courts in the Austin area." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Court Maintenance", item: "https://www.procourtsurfaces.com/blog/court-maintenance" },
  ],
};

const tocItems = [
  { href: "#why-maintenance-matters", label: "Why does court maintenance matter?" },
  { href: "#court-cleaning", label: "How do you clean a tennis or pickleball court?" },
  { href: "#maintenance-schedule", label: "What does a court maintenance schedule look like?" },
  { href: "#resurface-vs-clean", label: "How do you know when to resurface vs. just clean?" },
  { href: "#common-mistakes", label: "Common maintenance mistakes" },
  { href: "#faq", label: "Court maintenance FAQs" },
];

const faqItems = [
  {
    question: "How often should I clean my tennis court?",
    answer: "Sweep or blow debris off monthly and schedule a professional low-pressure wash annually. Courts under heavy tree cover in Austin, Round Rock, or Lakeway may need more frequent cleaning to prevent staining and algae buildup.",
  },
  {
    question: "Can you pressure wash a pickleball court?",
    answer: "Yes, but only with low pressure \u2014 under 1,500 PSI. High-pressure settings will damage the acrylic surface coating. We use commercial surface cleaners designed specifically for sport court acrylic.",
  },
  {
    question: "How much does court cleaning cost?",
    answer: "Cost depends on the number of courts and their current condition. Contact us for a quote \u2014 we offer standalone court cleaning as a service throughout the Austin metro area.",
  },
  {
    question: "Does court cleaning remove cracks?",
    answer: "No. Cleaning addresses dirt, algae, and surface staining. Cracks require structural repair with flexible acrylic filler \u2014 a separate service that we also provide.",
  },
  {
    question: "How do I prevent algae on my court in Austin?",
    answer: "Keep leaves and organic debris off the surface, ensure good drainage, and schedule an annual professional pressure wash. Trimming overhanging oak and pecan branches also helps by reducing shade and moisture retention.",
  },
  {
    question: "When should I resurface instead of just cleaning?",
    answer: "When you see widespread cracking, peeling, or significant fading and the surface is 8+ years old, it\u2019s time for a full resurface rather than just cleaning. A few isolated cracks or dirty patches can usually be repaired and cleaned without resurfacing.",
  },
  {
    question: "Do you offer court maintenance services?",
    answer: "Yes. We offer professional court cleaning, pressure washing, crack repair, color recoats, and full resurfacing for tennis, pickleball, and basketball courts across Austin, Round Rock, Cedar Park, Lakeway, and Central Texas.",
  },
];

export default function CourtMaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogHero
        category="Maintenance Guide"
        date="Mar 9, 2026"
        readTime="6 min read"
        title="Court Maintenance & Cleaning |"
        titleAccent="Austin, TX"
        subtitle="How to keep your tennis or pickleball court playing like new. Cleaning tips, maintenance schedules, pressure washing guidelines, and when it\u2019s time to call a pro."
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

        {/* Section 1: Why Maintenance Matters */}
        <section id="why-maintenance-matters">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Why does court maintenance matter?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">A properly maintained acrylic court surface lasts 8{"\u2013"}10+ years. Neglected courts degrade in as few as 3{"\u2013"}5 years {"\u2014"} cracking, fading, and delaminating well before their time. Regular maintenance is roughly 10x cheaper than premature resurfacing.</p>
          <p className="text-brand-text-muted leading-relaxed mb-8">In Austin{"\u2019"}s climate {"\u2014"} extreme summer heat, intense UV exposure, and occasional heavy rain {"\u2014"} court surfaces take more punishment than in milder regions. That makes a consistent maintenance routine especially critical for homeowners and facility managers across Austin, Round Rock, Cedar Park, and Lakeway.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-1">8{"\u2013"}10 yr</p>
              <p className="text-sm text-brand-text-muted">Surface life with maintenance</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-1">3{"\u2013"}5 yr</p>
              <p className="text-sm text-brand-text-muted">Surface life without maintenance</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-3xl font-bold text-brand-blue mb-1">10x cheaper</p>
              <p className="text-sm text-brand-text-muted">Maintenance vs. early resurface</p>
            </div>
          </div>
        </section>

        {/* Section 2: How to Clean a Court */}
        <section id="court-cleaning">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How do you clean a tennis or pickleball court?</h2>

          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Routine cleaning (monthly)</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">Blow or sweep leaves, dirt, and debris off the surface. Remove standing water after heavy rain {"\u2014"} a squeegee or leaf blower works well. This alone prevents most staining and organic buildup.</p>

          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">Pressure washing (annually or as needed)</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">A low-pressure wash {"\u2014"} under 1,500 PSI {"\u2014"} removes embedded dirt, mildew, and algae that sweeping can{"\u2019"}t reach. Austin{"\u2019"}s humidity drives green algae growth, especially on shaded courts near oak and pecan trees. An annual pressure wash keeps the surface clean, safe, and playing true.</p>

          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">What NOT to do</h3>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">No harsh chemicals or bleach</strong> {"\u2014"} they break down the acrylic coating</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">No high-pressure settings</strong> {"\u2014"} anything above 1,500 PSI can gouge and damage the surface</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">No wire brushes or abrasive tools</strong> {"\u2014"} they scratch the textured finish</li>
          </ul>

          <h3 className="text-xl font-semibold text-brand-text mt-8 mb-3">When to call a pro</h3>
          <p className="text-brand-text-muted leading-relaxed mb-4">If you see mildew or algae that won{"\u2019"}t come off with a standard wash, if the surface feels slippery even when dry, or if you notice discoloration that doesn{"\u2019"}t clean up {"\u2014"} it{"\u2019"}s time for a professional assessment.</p>

          <CalloutBox title="Standalone Court Cleaning">
            <p>We offer professional court cleaning as a standalone service across the Austin metro. No need to resurface just because your court is dirty {"\u2014"} a proper cleaning may be all you need.</p>
          </CalloutBox>
        </section>

        {/* Section 3: Maintenance Schedule */}
        <section id="maintenance-schedule">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What does a court maintenance schedule look like?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Follow this schedule to get the maximum life out of your court surface. Adjust frequency based on tree cover, usage, and exposure.</p>

          <div className="space-y-4 my-8">
            <div className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-24">
                <span className="text-sm font-bold text-brand-blue">Weekly</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">Sweep or blow debris off the surface. Check for standing water after rain and remove it promptly.</p>
            </div>
            <div className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-24">
                <span className="text-sm font-bold text-brand-blue">Monthly</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">Inspect for new cracks or surface damage. Remove any organic growth {"\u2014"} moss, mildew, or algae {"\u2014"} before it sets in.</p>
            </div>
            <div className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-24">
                <span className="text-sm font-bold text-brand-blue">Annually</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">Schedule a professional low-pressure wash and full surface inspection. This is the single most important maintenance step you can take.</p>
            </div>
            <div className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-24">
                <span className="text-sm font-bold text-brand-blue">Every 3{"\u2013"}5 yr</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">Consider a color recoat. This refreshes the appearance and adds a protective layer without requiring a full resurface.</p>
            </div>
            <div className="flex gap-5 p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex-shrink-0 w-24">
                <span className="text-sm font-bold text-brand-blue">Every 8{"\u2013"}10 yr</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">Plan for a full resurface {"\u2014"} complete surface prep, crack repair, multi-coat acrylic application, and new line striping.</p>
            </div>
          </div>

          <CalloutBox title="Austin\u2019s #1 Court Enemy: Oak Trees">
            <p>Live oaks and post oaks drop leaves, pollen, and small branches year-round in Central Texas. Leaves trap moisture against the surface, creating the perfect environment for mildew and staining. If your court is under tree cover, bump your cleaning frequency up.</p>
          </CalloutBox>
        </section>

        {/* Section 4: Resurface vs. Clean */}
        <section id="resurface-vs-clean">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How do you know when to resurface vs. just clean?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">Not every worn-looking court needs a full resurface. Here{"\u2019"}s how to assess what your court actually needs.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Just needs cleaning</h3>
              <ul className="text-sm text-brand-text-muted leading-relaxed space-y-1">
                <li>{"\u2022"} Surface is faded or dirty but structurally sound</li>
                <li>{"\u2022"} No cracks or peeling</li>
                <li>{"\u2022"} Good drainage, no ponding</li>
                <li>{"\u2022"} Game lines still visible</li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Needs repair</h3>
              <ul className="text-sm text-brand-text-muted leading-relaxed space-y-1">
                <li>{"\u2022"} A few isolated cracks</li>
                <li>{"\u2022"} Small delaminated spots</li>
                <li>{"\u2022"} Most of the surface is still in good shape</li>
                <li>{"\u2022"} Surface age under 8 years</li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Needs full resurface</h3>
              <ul className="text-sm text-brand-text-muted leading-relaxed space-y-1">
                <li>{"\u2022"} Widespread cracking or peeling</li>
                <li>{"\u2022"} Significant fading across the surface</li>
                <li>{"\u2022"} Surface is 8+ years old</li>
                <li>{"\u2022"} Ball bounce is inconsistent</li>
              </ul>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">If your court falls in the {"\u201c"}needs repair{"\u201d"} category, check out our <Link href="/blog/court-repair" className="text-brand-blue hover:underline">court repair guide</Link> for more on cracks, delamination, and when to fix vs. resurface. For courts that need the full treatment, our <Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">court resurfacing guide</Link> covers the process, costs, and timeline.</p>
        </section>

        {/* Section 5: Common Mistakes */}
        <section id="common-mistakes">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Common maintenance mistakes</h2>
          <p className="text-brand-text-muted leading-relaxed mb-8">These are the issues we see most often on courts across Austin and Central Texas. Every one of them is avoidable.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Using a high-pressure washer</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Anything over 1,500 PSI damages the acrylic coating. We{"\u2019"}ve seen courts where a well-intentioned pressure wash stripped the texture right off the surface. Low pressure only.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Ignoring small cracks</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Water gets into small cracks and {"\u2014"} during Austin{"\u2019"}s rare but real cold snaps {"\u2014"} can freeze and expand, turning hairline cracks into major structural issues. Fix cracks early while they{"\u2019"}re cheap to repair.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Parking equipment or vehicles on the court</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Point loads from tires, jacks, or heavy equipment crack the acrylic surface and can damage the slab underneath. Keep all vehicles and heavy equipment off the court.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Letting wet leaves sit on the surface</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Wet leaves stain the acrylic and create a humid microenvironment where mildew thrives. In Austin{"\u2019"}s oak-heavy neighborhoods {"\u2014"} Westlake, Tarrytown, Rollingwood {"\u2014"} this is the most common maintenance issue we see.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-1">Using the wrong cleaning chemicals</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Bleach, muriatic acid, and general-purpose degreasers break down acrylic coatings. Use only cleaners rated for sport court surfaces, or let a pro handle it.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Court maintenance FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions about tennis court maintenance, pickleball court cleaning, and pressure washing from homeowners and facility managers in Central Texas.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-repair" className="text-brand-blue hover:underline">Court repair: cracks, delamination, and when to fix vs. resurface</Link></li>
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing: process, costs, and what to expect</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/blog/pickleball-court-installation" className="text-brand-blue hover:underline">Pickleball court installation: dimensions, specs, and pricing</Link></li>
          </ul>
        </div>

        <BlogCTA
          title="Need Your Court Cleaned or Inspected?"
          description="We offer standalone court cleaning and free surface inspections. Send us photos or schedule a visit \u2014 we\u2019ll tell you what your court needs."
        />
      </article>

      <CTABanner />
    </>
  );
}
