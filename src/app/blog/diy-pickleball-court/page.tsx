import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "DIY Pickleball Court: What You Can Do Yourself vs. What Needs a Pro (2026) | Pro Court Surfaces",
  description: "Honest guide to building a DIY pickleball court. What homeowners can do themselves, where DIY projects fail, and when to hire a professional court surfacing contractor.",
  keywords: "DIY pickleball court, how to build a pickleball court, build your own pickleball court, homemade pickleball court, pickleball court DIY, backyard pickleball court DIY, pickleball court construction",
  openGraph: {
    title: "DIY Pickleball Court: What You Can Do Yourself vs. What Needs a Pro (2026)",
    description: "Honest guide to building a DIY pickleball court. What you can do yourself and where you need a professional.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/diy-pickleball-court",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIY Pickleball Court: What You Can Do Yourself vs. What Needs a Pro (2026)",
    description: "Honest guide to building a DIY pickleball court. What you can do yourself and where you need a professional.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/diy-pickleball-court" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DIY Pickleball Court: What You Can Do Yourself vs. What Needs a Pro (2026)",
  description: "Honest guide to building a DIY pickleball court. What homeowners can do themselves, where DIY projects fail, and when to hire a professional court surfacing contractor.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/diy-pickleball-court" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can I build a pickleball court in my backyard?", acceptedAnswer: { "@type": "Answer", text: "Yes, if you have at least 30\u2019 x 60\u2019 (1,800 sq ft) of flat space. You can set up a temporary court yourself with a portable net and tape, but a permanent court with a concrete slab and acrylic surfacing requires professional work for durable results." } },
    { "@type": "Question", name: "How much does a DIY pickleball court cost?", acceptedAnswer: { "@type": "Answer", text: "A temporary setup (portable net + court tape) costs $200\u2013$500. A permanent court with a new concrete slab runs $12,000\u2013$25,000+ whether you DIY the surfacing or not, since you\u2019re hiring a concrete contractor regardless. Professional surfacing adds $6,000\u2013$12,000 but lasts 6\u20138+ years." } },
    { "@type": "Question", name: "Can I paint pickleball lines on my driveway?", acceptedAnswer: { "@type": "Answer", text: "Yes. Use court line paint (not house paint) for best results. Measure carefully \u2014 the playing area is 20\u2019 x 44\u2019 with a 7\u2019 non-volley zone on each side of the net. Lines should be 2 inches wide." } },
    { "@type": "Question", name: "What's the cheapest way to play pickleball at home?", acceptedAnswer: { "@type": "Answer", text: "A portable net system ($80\u2013$150) and court marking tape on any flat surface like a driveway or parking area. Total cost is around $200 and requires zero construction." } },
    { "@type": "Question", name: "Can I resurface a court myself?", acceptedAnswer: { "@type": "Answer", text: "It\u2019s possible but involves a steep learning curve. Proper resurfacing requires acid etching or shot-blasting to remove laitance, bird bath fills per ASBA nickel tolerance standards, and 2\u20134 coats of acrylic applied with parallel squeegee technique. The more you understand the process, the better your results will be." } },
    { "@type": "Question", name: "How long does a DIY court surface last vs professional?", acceptedAnswer: { "@type": "Answer", text: "Results vary based on application quality. Professional surfacing with systems like ATS Acrytech, Laykold, or SportMaster typically lasts 6\u20138+ years with proper maintenance. DIY longevity depends on how well the prep and application are executed." } },
    { "@type": "Question", name: "Do I need a permit to build a pickleball court?", acceptedAnswer: { "@type": "Answer", text: "In most cases, yes. Austin and Travis County typically require permits for concrete flatwork over a certain size (usually 200+ sq ft). Your concrete contractor usually handles the permit application. Check with your city and HOA before starting." } },
    { "@type": "Question", name: "Can I convert my driveway to a pickleball court?", acceptedAnswer: { "@type": "Answer", text: "Yes, if the driveway is flat, structurally sound, and at least 30\u2019 x 60\u2019. The concrete needs to be in good condition \u2014 no major cracks, heaving, or drainage problems. A professional can resurface it with acrylic coating and add regulation lines." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "DIY Pickleball Court", item: "https://www.procourtsurfaces.com/blog/diy-pickleball-court" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pickleball Court Surfacing",
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
    { "@type": "City", name: "Dripping Springs", containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Pickleball Court Surfacing",
  description: "Professional acrylic court surfacing for pickleball courts in Austin and Central Texas. ATS Acrytech, Laykold, and SportMaster systems.",
};

const tocItems = [
  { href: "#can-you-diy", label: "Can you build a pickleball court yourself?" },
  { href: "#what-you-can-do", label: "What you CAN do yourself" },
  { href: "#what-goes-wrong", label: "Common pitfalls to watch for" },
  { href: "#temporary-vs-permanent", label: "Temporary vs. permanent: choose your path" },
  { href: "#pro-process", label: "How professional surfacing actually works" },
  { href: "#cost-comparison", label: "The real cost comparison: DIY vs. pro" },
  { href: "#when-to-call", label: "When professional surfacing makes sense" },
  { href: "#faq", label: "DIY pickleball court FAQs" },
];

const faqItems = [
  {
    question: "Can I build a pickleball court in my backyard?",
    answer: "Yes, if you have at least 30\u2019 x 60\u2019 (1,800 sq ft) of flat space. You can set up a temporary court yourself with a portable net and tape, but a permanent court with a concrete slab and acrylic surfacing requires professional work for durable results.",
  },
  {
    question: "How much does a DIY pickleball court cost?",
    answer: "A temporary setup (portable net + court tape) costs $200\u2013$500. A permanent court with a new concrete slab runs $12,000\u2013$25,000+ whether you DIY the surfacing or not, since you\u2019re hiring a concrete contractor regardless. Professional surfacing adds $6,000\u2013$12,000 but lasts 6\u20138+ years.",
  },
  {
    question: "Can I paint pickleball lines on my driveway?",
    answer: "Yes. Use court line paint (not house paint) for best results. Measure carefully \u2014 the playing area is 20\u2019 x 44\u2019 with a 7\u2019 non-volley zone on each side of the net. Lines should be 2 inches wide. Painter\u2019s tape helps keep edges clean.",
  },
  {
    question: "What\u2019s the cheapest way to play pickleball at home?",
    answer: "A portable net system ($80\u2013$150) and court marking tape on any flat surface like a driveway or parking area. Total cost is around $200 and requires zero construction. This is the best way to try pickleball before investing in a permanent court.",
  },
  {
    question: "Can I resurface a court myself?",
    answer: "It\u2019s possible but involves a steep learning curve. Proper resurfacing requires acid etching or shot-blasting to remove laitance, bird bath fills per ASBA nickel tolerance standards, and 2\u20134 coats of acrylic applied with parallel squeegee technique keeping a wet edge at all times. The more you understand the process before starting, the better your results will be.",
  },
  {
    question: "How long does a DIY court surface last vs professional?",
    answer: "Results depend on how well the prep and application are done. Professional surfacing with a system like ATS Acrytech typically lasts 6\u20138+ years with basic maintenance. DIY longevity varies \u2014 proper surface prep, correct mixing, and good squeegee technique are the biggest factors.",
  },
  {
    question: "Do I need a permit to build a pickleball court?",
    answer: "In most cases, yes. Austin and Travis County typically require permits for concrete flatwork over a certain size (usually 200+ sq ft). Your concrete contractor usually handles the permit application. Always check with your city permitting office and HOA before starting.",
  },
  {
    question: "Can I convert my driveway to a pickleball court?",
    answer: "Yes, if the driveway is flat, structurally sound, and at least 30\u2019 x 60\u2019. The concrete needs to be in good condition \u2014 no major cracks, heaving, or drainage problems. A professional can resurface it with acrylic coating and add regulation lines. See our conversion guide for more details.",
  },
];

export default function DIYPickleballCourtPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="DIY Guide"
        date="Mar 9, 2026"
        readTime="10 min read"
        title="DIY Pickleball Court |"
        titleAccent="What You Can Do Yourself vs. What Needs a Pro"
        subtitle="Everything you need to know to plan a pickleball court project — what's straightforward to do yourself, what takes specialized knowledge, and how to get the best result either way."
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
        <p className="text-brand-text-muted leading-relaxed mb-8">You want a pickleball court in your backyard. The question is: how much of this can you actually do yourself? A temporary court on your driveway is a weekend project. A permanent court with a poured slab and acrylic surfacing has more moving parts. This guide breaks down the full process so you know what to expect at every stage {"\u2014"} whether you do it yourself, hire it out, or a mix of both.</p>

        {/* Can You DIY? */}
        <section id="can-you-diy">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Can you build a pickleball court yourself?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Short answer: parts of it, yes. The full answer depends on what kind of court you want.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Temporary court on a flat surface</h3>
                <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">100% DIY</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">Portable net, court tape, any flat surface (driveway, parking lot, gym floor). This is how most people should start. No construction, no permits, no risk. You can be playing in an hour.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Line striping on an existing surface</h3>
                <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">Doable DIY</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">If you already have a flat concrete pad, painting pickleball lines is a reasonable DIY project. You need court line paint, precise measurements, painter{"\u2019"}s tape, and patience. Mistakes are visible but fixable.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Concrete slab + acrylic surfacing</h3>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Specialized work</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">The concrete slab requires a contractor either way. The acrylic surfacing requires specialized equipment, specific weather conditions, and technique that takes time to learn. Understanding the process helps you make the right call for your project and budget.</p>
            </div>
          </div>
        </section>

        {/* What You CAN Do */}
        <section id="what-you-can-do">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What you CAN do yourself</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">There{"\u2019"}s plenty of legitimate DIY work in a pickleball court project. Here{"\u2019"}s what homeowners can confidently handle.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Set up a temporary court</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Any flat surface works {"\u2014"} driveway, parking lot, garage floor, or gym. Buy a portable net system ($80{"\u2013"}$150) and use court marking tape or chalk for lines. The playing area is 20{"\u2019"} x 44{"\u2019"}. This is the best way to try pickleball before committing to a permanent court.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Choose your court location and orientation</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Orient the court north-south to minimize sun glare during play. You need at least 30{"\u2019"} x 60{"\u2019"} of flat space (the 20{"\u2019"} x 44{"\u2019"} playing area plus required run-off on all sides). Factor in setbacks from property lines and structures. For a full breakdown of dimensions, see our <Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">backyard pickleball court guide</Link>.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Site clearing and basic grading</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">If you have a Bobcat or access to equipment, clearing brush and doing rough grading is doable. The final grade and compaction should be done by your concrete contractor, but removing trees, stumps, and debris yourself can save $1,000{"\u2013"}$3,000.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Getting permits</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Check Austin/Travis County requirements for concrete flatwork permits. Most municipalities require a permit for slabs over 200 sq ft. Your concrete contractor may handle this, but you can pull permits yourself and save the markup. Also check your HOA rules for court placement, fencing, and lighting.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Ongoing court maintenance</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Once your court is built, maintenance is 100% DIY. Regular sweeping, leaf removal, periodic pressure washing, and keeping vegetation off the edges. This is straightforward work that extends the life of your surface. See our <Link href="/blog/court-maintenance" className="text-brand-blue hover:underline">court maintenance guide</Link> for cleaning schedules and tips.</p>
            </div>
          </div>

          <CalloutBox title="Start Here Before You Build">
            <p>Set up a temporary court on your driveway first. Play on it for a month. If you{"\u2019"}re still using it every week, that{"\u2019"}s your signal to invest in a permanent court. Most people who build permanent courts started exactly this way.</p>
          </CalloutBox>
        </section>

        {/* What Goes Wrong */}
        <section id="what-goes-wrong">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Common pitfalls to watch for</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Whether you{"\u2019"}re doing the work yourself or managing a contractor, these are the six issues that cause the most problems with court projects. Knowing them upfront helps you avoid them.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">1. Flat slab or bad site drainage</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">The most common issue with any court project: the slab is poured flat with no slope, or it{"\u2019"}s built in a low-lying area without being raised over a proper base or substrate. You need a minimum 1% slope so water sheds off. Without it, the court holds water after every rain. In Central Texas, where we get sudden heavy downpours, this is worth getting right from the start.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">2. No vapor barrier</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">If the slab isn{"\u2019"}t prepped with a vapor barrier underneath, moisture emits through the concrete from below. This can cause adhesion issues, bubbling, and delamination of the acrylic surface over time. There are topside vapor barrier solutions, but results vary depending on how much moisture the slab is transmitting. Something to discuss with your concrete contractor before the pour.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">3. Concrete spec matters</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">The slab needs to be 4{"\u2033"} minimum at 3,000 PSI with proper rebar or wire mesh. Low PSI concrete, poor mix design, or curing agents left in the concrete can all affect adhesion of the acrylic coating. Curing compounds are especially worth asking your concrete contractor about {"\u2014"} they create a film on the surface that can prevent acrylic from bonding properly. Make sure your contractor knows the slab is getting a sport court coating.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">4. Surface prep before coating</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">An acid etch on a broom finish is generally THE MINIMUM acceptable prep before applying acrylic. For concrete that{"\u2019"}s lower PSI or mixes that produce more laitance (the calcium layer that rises to the surface during curing), you{"\u2019"}ll want to grind or shot-blast it off. If laitance is left on, the acrylic bonds to that weak layer instead of the concrete itself {"\u2014"} and over time the coating can delaminate in sheets. This step is easy to overlook but makes a big difference in longevity.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">5. Bird bath fills (nickel tolerance)</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Per ASBA (American Sports Builders Association) standards, you flood the court, wait 40 minutes, and then fill any puddles that remain that are over a nickel high {"\u2014"} this is called {"\u201C"}nickel tolerance.{"\u201D"} Those small low spots may not look like much, but they hold water after rain and become the puddles that shorten your surface{"\u2019"}s life. It{"\u2019"}s tedious work but worth doing right.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">6. Squeegee technique</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Squeegeeing acrylic coating is an art, not a science. The key is keeping a wet edge at all times and making your passes parallel. Squeegee marks are inevitable {"\u2014"} even pros leave them {"\u2014"} but they need to be parallel so the finished surface looks clean and uniform. Random, crossed squeegee marks create uneven texture and affect ball bounce. It{"\u2019"}s one of those things that looks straightforward until you{"\u2019"}re doing it across 1,800+ sq ft.</p>
            </div>
          </div>

          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">The more you understand about the process upfront, the better your court will turn out {"\u2014"} whether you do it yourself or bring someone in. Most of these pitfalls come down to knowing what to look for before you start.</p>
          </blockquote>
        </section>

        {/* Temporary vs Permanent */}
        <section id="temporary-vs-permanent">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Temporary vs. permanent: choose your path</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">There are three paths to a home pickleball court. The right one depends on your budget, your space, and how committed you are to the game.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Temporary / Portable</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">$200{"\u2013"}$500</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-2">Portable net + court tape on any flat surface. Set up in 30 minutes, take down when you{"\u2019"}re done. Perfect for trying pickleball before committing. No construction, no permits, no risk.</p>
              <p className="text-sm text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Best for:</strong> People who want to try pickleball, renters, or anyone not ready to invest in construction.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Converting existing concrete</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">$6K{"\u2013"}$12K</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-2">Professional acrylic surfacing on an existing concrete slab {"\u2014"} old basketball court, large patio, wide driveway, or unused tennis court. This is the sweet spot if you already have flat concrete. You skip the most expensive part (the slab) and go straight to surfacing and lines.</p>
              <p className="text-sm text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Best for:</strong> Homeowners with existing flat concrete in good condition. <Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">See our full conversion guide</Link>.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Full build from scratch</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">$20K{"\u2013"}$45K</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-2">New concrete slab + professional acrylic surfacing + net system. This is the premium path: a purpose-built court with proper drainage, correct dimensions, and a surface that{"\u2019"}ll last 8+ years. Site prep, concrete, curing, and surfacing take about 5 weeks total.</p>
              <p className="text-sm text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Best for:</strong> Homeowners who play regularly and want a permanent, high-quality court. <Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">See the full build guide</Link>.</p>
            </div>
          </div>
        </section>

        {/* Pro Process */}
        <section id="pro-process">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How professional surfacing actually works</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Here{"\u2019"}s what the full surfacing process looks like from start to finish, so you know what{"\u2019"}s involved at each stage.</p>

          <div className="space-y-6 my-8">
            {[
              { step: 1, title: "Surface Preparation", description: "Acid etch or shot-blast the slab to remove laitance and create a proper bonding surface. Pressure wash, fill cracks with flexible filler, and level low spots using the ASBA flood test \u2014 flood the court, wait 40 minutes, fill any remaining puddles over a nickel high. This prep step is the difference between a surface that lasts and one that peels." },
              { step: 2, title: "Primer Coat", description: "Apply acrylic primer to seal the concrete and create a bonding surface for the color coats. The primer must cure completely before the next step \u2014 timing depends on temperature and humidity." },
              { step: 3, title: "Acrylic Color Coats (2\u20134 coats)", description: "Each coat is mixed with silica sand for texture and traction, then applied with specialized rubber squeegees in overlapping passes. Even coverage is critical for consistent ball bounce. Each coat must cure before the next is applied \u2014 a pro crew knows exactly when conditions are right." },
              { step: 4, title: "Color Zone Application", description: "Different colors for the inside (playing area), outside (run-off), and kitchen (non-volley zone) if desired. Color transitions need clean, straight edges \u2014 this is where experience matters most." },
              { step: 5, title: "Precision Line Striping", description: "Regulation lines measured and marked with precision, then painted with specialized court line paint. Lines are exactly 2\u2033 wide. A pro crew uses laser levels and snap lines to ensure every line is straight and square." },
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

          <p className="text-brand-text-muted leading-relaxed mb-4">The whole surfacing process takes 3{"\u2013"}5 days with proper cure times between coats. A pro crew has done this hundreds of times {"\u2014"} they know when humidity is too high to coat, how to feather edges between color zones, and how to get a consistent texture that plays well. For more on our surfacing process, see our <Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">court surface types comparison</Link>.</p>
        </section>

        {/* Cost Comparison */}
        <section id="cost-comparison">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">The real cost comparison: DIY vs. pro</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Here{"\u2019"}s what the numbers actually look like. The main cost difference between DIY and professional is in the surfacing portion {"\u2014"} the concrete slab is the same cost either way.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-3">DIY Surfacing</h3>
              <ul className="space-y-2 text-sm text-brand-text-muted">
                <li className="flex justify-between"><span>Acrylic coating materials</span><span className="font-semibold text-brand-text">$800{"\u2013"}$1,500</span></li>
                <li className="flex justify-between"><span>Primer and crack filler</span><span className="font-semibold text-brand-text">$200{"\u2013"}$400</span></li>
                <li className="flex justify-between"><span>Squeegees, rollers, tape</span><span className="font-semibold text-brand-text">$150{"\u2013"}$300</span></li>
                <li className="flex justify-between"><span>Line paint and stencils</span><span className="font-semibold text-brand-text">$100{"\u2013"}$200</span></li>
                <li className="flex justify-between"><span>Wasted material (learning curve)</span><span className="font-semibold text-brand-text">$300{"\u2013"}$600</span></li>
                <li className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span className="font-semibold text-brand-text">DIY total</span><span className="font-bold text-brand-text">$1,500{"\u2013"}$3,000</span></li>
              </ul>
              <p className="text-xs text-brand-text-muted mt-3">Results depend on application technique and conditions.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-3">Professional Surfacing</h3>
              <ul className="space-y-2 text-sm text-brand-text-muted">
                <li className="flex justify-between"><span>Surface prep and crack repair</span><span className="font-semibold text-brand-text">Included</span></li>
                <li className="flex justify-between"><span>Primer coat</span><span className="font-semibold text-brand-text">Included</span></li>
                <li className="flex justify-between"><span>Acrylic color coats (2{"\u2013"}4)</span><span className="font-semibold text-brand-text">Included</span></li>
                <li className="flex justify-between"><span>Precision line striping</span><span className="font-semibold text-brand-text">Included</span></li>
                <li className="flex justify-between"><span>Equipment and labor</span><span className="font-semibold text-brand-text">Included</span></li>
                <li className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span className="font-semibold text-brand-text">Pro total</span><span className="font-bold text-brand-text">$6,000{"\u2013"}$12,000</span></li>
              </ul>
              <p className="text-xs text-brand-text-muted mt-3">Typical lifespan: 6{"\u2013"}8+ years with basic maintenance.</p>
            </div>
          </div>

          <div className="my-6 p-5 bg-brand-bg-alt border border-gray-200 rounded-xl">
            <p className="text-sm font-semibold text-brand-text mb-2">The bottom line</p>
            <div className="space-y-2 text-sm text-brand-text-muted">
              <p><strong className="text-brand-text">Concrete slab:</strong> $12,000{"\u2013"}$25,000 either way {"\u2014"} you{"\u2019"}re hiring a concrete contractor regardless.</p>
              <p><strong className="text-brand-text">DIY surfacing saves:</strong> $4,000{"\u2013"}$8,000 upfront on the surfacing portion.</p>
              <p><strong className="text-brand-text">Worth considering:</strong> If a DIY surface needs to be redone, stripping and resurfacing adds cost on top of the original materials. Factor that into your decision.</p>
            </div>
          </div>

          <CalloutBox title="The Big Picture">
            <p>The concrete slab is the biggest line item in any court project ($12,000{"\u2013"}$25,000). The surfacing is what protects it and gives you the playing surface. However you approach the surfacing {"\u2014"} DIY or professional {"\u2014"} make sure the prep work and application are done thoroughly. The surface is what takes all the weather, UV, and foot traffic.</p>
          </CalloutBox>
        </section>

        {/* When to Call a Pro */}
        <section id="when-to-call">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">When professional surfacing makes sense</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Here are the scenarios where most homeowners bring in a pro.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">You have an existing slab that needs resurfacing</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Acrylic surfacing over existing concrete involves prep work (crack filling, leveling, priming) and multi-coat application that benefits from professional equipment and experience. See our <Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">conversion guide</Link> for what{"\u2019"}s involved in the process.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">You want maximum longevity</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Professional acrylic systems like ATS Acrytech, Laykold, and SportMaster are PPA-approved and designed for the Texas climate. Applied correctly, they{"\u2019"}re built to last 6{"\u2013"}8+ years.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">You{"\u2019"}re dealing with cracks, delamination, or drainage issues</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">These are structural problems that need diagnosis and repair before any surfacing. Understanding what{"\u2019"}s causing them helps you choose the right fix. Our <Link href="/blog/court-repair" className="text-brand-blue hover:underline">court repair guide</Link> covers what to look for.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">You{"\u2019"}re still deciding</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Start with a portable net on your driveway for $200. Play on it for a few months. If you{"\u2019"}re still out there every week, you{"\u2019"}ll know it{"\u2019"}s time to invest in a permanent court.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">DIY pickleball court FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions from homeowners considering a DIY pickleball court project.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">Backyard pickleball court: cost, size, and build guide (2026)</Link></li>
            <li><Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">Convert a tennis court to pickleball: cost, layout, and process</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
            <li><Link href="/blog/court-maintenance" className="text-brand-blue hover:underline">Court maintenance guide: cleaning schedules and pressure washing tips</Link></li>
            <li><Link href="/blog/court-repair" className="text-brand-blue hover:underline">Court repair guide: cracks, delamination, and when to resurface</Link></li>
            <li><Link href="/blog/pickleball-court-dimensions" className="text-brand-blue hover:underline">Pickleball court dimensions: official size and spacing guide</Link></li>
          </ul>
        </div>

        <BlogCTA title="Have Questions About Your Court Project?" description="We're happy to talk through your project — whether you're doing it yourself, hiring it out, or still deciding. Free assessment, no obligation." />
      </article>

      <CTABanner />
    </>
  );
}
