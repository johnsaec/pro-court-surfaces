import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Pickleball Court Dimensions: Official Size, Layout & Spacing Guide | Pro Court Surfaces",
  description: "What are the official pickleball court dimensions? Full guide to court size (20x44ft), required spacing (30x60ft minimum), net height, kitchen zones, and layout diagrams for residential and competitive courts.",
  keywords: "pickleball court dimensions, pickleball court size, pickleball court measurements, pickleball court layout, pickleball court spacing, pickleball kitchen dimensions, pickleball net height, pickleball court diagram",
  openGraph: {
    title: "Pickleball Court Dimensions: Official Size, Layout & Spacing Guide",
    description: "Official pickleball court dimensions, required spacing, net height, kitchen zones, and layout guide for residential and competitive courts.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/pickleball-court-dimensions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickleball Court Dimensions: Official Size, Layout & Spacing Guide",
    description: "Official pickleball court dimensions, required spacing, net height, kitchen zones, and layout guide for residential and competitive courts.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/pickleball-court-dimensions" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pickleball Court Dimensions: Official Size, Layout & Spacing Guide",
  description: "Complete guide to official pickleball court dimensions, spacing requirements, net height, kitchen zones, and court layout for residential and competitive play.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/pickleball-court-dimensions" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are the official pickleball court dimensions?", acceptedAnswer: { "@type": "Answer", text: "The official pickleball court playing area is 20 feet wide by 44 feet long. This includes the non-volley zone (kitchen) which extends 7 feet from the net on each side. Lines are 2 inches wide and are considered part of the court." } },
    { "@type": "Question", name: "How much total space do you need for a pickleball court?", acceptedAnswer: { "@type": "Answer", text: "USAPA recommends a minimum total area of 30 feet by 60 feet (1,800 sq ft) to allow for adequate run-off space around the court. For competitive or tournament play, 34 feet by 64 feet (2,176 sq ft) is recommended." } },
    { "@type": "Question", name: "How many pickleball courts fit on a tennis court?", acceptedAnswer: { "@type": "Answer", text: "A full-size tennis court (60x120 feet) can fit 4 pickleball courts in a quadrant layout. If the tennis surface is compromised on one side, 2 courts side by side is the better option." } },
    { "@type": "Question", name: "What is the kitchen in pickleball?", acceptedAnswer: { "@type": "Answer", text: "The kitchen is the non-volley zone, a 7-foot-deep area on each side of the net where players cannot hit volleys (shots out of the air). It extends the full 20-foot width of the court and is marked by the kitchen line." } },
    { "@type": "Question", name: "How high is a pickleball net?", acceptedAnswer: { "@type": "Answer", text: "A pickleball net is 36 inches (3 feet) high at the posts and 34 inches (2 feet 10 inches) at the center. The net spans the full 20-foot width of the court plus overhang on each side." } },
    { "@type": "Question", name: "Can you play pickleball on a basketball court?", acceptedAnswer: { "@type": "Answer", text: "Yes. A standard basketball court is approximately 50 feet by 84 feet, which easily fits one pickleball court with generous run-off space on all sides. The flat, hard surface is also well-suited for pickleball play." } },
    { "@type": "Question", name: "What direction should a pickleball court face?", acceptedAnswer: { "@type": "Answer", text: "Pickleball courts should be oriented north-south to minimize sun glare during morning and evening play. This is especially important in southern states like Texas where the sun angle is intense for much of the year." } },
    { "@type": "Question", name: "What is the minimum concrete thickness for a pickleball court?", acceptedAnswer: { "@type": "Answer", text: "The concrete slab should be a minimum of 4 inches thick at 3,000 PSI compressive strength, with a proper slope of approximately 1 inch per 10 feet for drainage. The slab should extend beyond the playing area to cover the full run-off space." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Pickleball Court Dimensions", item: "https://www.procourtsurfaces.com/blog/pickleball-court-dimensions" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Pickleball Court Construction & Surfacing",
  provider: {
    "@type": "LocalBusiness",
    name: "Pro Court Surfaces",
    areaServed: { "@type": "Place", name: "Austin, TX" },
  },
  areaServed: { "@type": "Place", name: "Austin, TX" },
  description: "Professional pickleball court construction and surfacing in Austin and Central Texas. Expert court layout, dimensions consulting, and acrylic sport surface installation.",
  serviceType: "Court Surfacing",
};

const tocItems = [
  { href: "#official-dimensions", label: "What are the official pickleball court dimensions?" },
  { href: "#total-space", label: "How much space do you actually need?" },
  { href: "#multiple-courts", label: "Can you fit multiple pickleball courts on a tennis court?" },
  { href: "#setbacks", label: "What about setbacks and clearance?" },
  { href: "#diagram", label: "Pickleball court diagram and measurements" },
  { href: "#surface-slab", label: "Surface and slab requirements" },
  { href: "#orientation", label: "Orientation and sun position" },
  { href: "#faq", label: "Pickleball court dimension FAQs" },
];

const faqItems = [
  { question: "What are the official pickleball court dimensions?", answer: "The official pickleball court playing area is 20 feet wide by 44 feet long. This includes the non-volley zone (kitchen) which extends 7 feet from the net on each side. All lines are 2 inches wide and are considered in-bounds." },
  { question: "How much total space do you need for a pickleball court?", answer: "USAPA recommends a minimum total area of 30 feet by 60 feet (1,800 sq ft) including run-off space around the court. For competitive or tournament play, 34 feet by 64 feet (2,176 sq ft) is the standard. For a backyard recreational court, 30\u2019 x 60\u2019 is perfectly fine." },
  { question: "How many pickleball courts fit on a tennis court?", answer: "A full-size tennis court (60\u2019 x 120\u2019) can fit 4 pickleball courts in a quadrant layout. If the existing tennis surface is compromised or worn on one side, 2 courts side by side is the better option and still makes excellent use of the space." },
  { question: "What is the kitchen in pickleball?", answer: "The kitchen is the non-volley zone \u2014 a 7-foot-deep area on each side of the net (14 feet total) where players cannot hit volleys (shots out of the air). It extends the full 20-foot width of the court and is one of the most distinctive features of pickleball." },
  { question: "How high is a pickleball net?", answer: "A pickleball net is 36 inches (3 feet) high at the posts and 34 inches (2 feet 10 inches) at the center. The slight dip in the center is by design \u2014 it encourages cross-court play and adds strategic depth to the game." },
  { question: "Can you play pickleball on a basketball court?", answer: "Yes. A standard basketball court is approximately 50\u2019 x 84\u2019, which easily fits one pickleball court with generous run-off space on all sides. Many community centers and schools convert basketball courts into pickleball courts with just new lines and a portable net system." },
  { question: "What direction should a pickleball court face?", answer: "Courts should be oriented north-south to minimize sun glare during morning and evening play. This is especially important in Austin and Central Texas where the summer sun is intense and low-angle glare can make play difficult on east-west courts." },
  { question: "What is the minimum concrete thickness for a pickleball court?", answer: "The concrete slab should be a minimum of 4 inches thick at 3,000 PSI compressive strength. Proper slope of approximately 1 inch per 10 feet is needed for drainage. The slab should extend beyond the 20\u2019 x 44\u2019 playing area to cover the full run-off zone." },
];

export default function PickleballCourtDimensionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="Dimensions Guide"
        date="Mar 9, 2026"
        readTime="7 min read"
        title="Pickleball Court Dimensions |"
        titleAccent="Official Size, Layout & Spacing Guide"
        subtitle="Everything you need to know about pickleball court dimensions, spacing requirements, and layout. Official measurements for recreational and competitive courts."
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
        <p className="text-brand-text-muted leading-relaxed mb-8">Whether you are building a new court in your backyard, converting a tennis court, or planning a multi-court facility, the first thing you need to nail down is dimensions. Pickleball courts are smaller than most people expect {"\u2014"} but the total space you need is more than just the playing area. Here is a complete breakdown of every measurement that matters.</p>

        {/* Official Dimensions */}
        <section id="official-dimensions">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are the official pickleball court dimensions?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The official pickleball court playing area is 20 feet wide by 44 feet long {"\u2014"} the same size for both singles and doubles play. Here are the key measurements defined by USA Pickleball (USAPA).</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"20' x 44'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Playing Area</p>
              <p className="text-xs text-brand-text-muted">Baseline to baseline, sideline to sideline</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"7'"} each side</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Non-Volley Zone (Kitchen)</p>
              <p className="text-xs text-brand-text-muted">14{"\u2019"} total kitchen area from net</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"34\" center / 36\" posts"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Net Height</p>
              <p className="text-xs text-brand-text-muted">Slightly lower at center than posts</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"2\""} wide</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Line Width</p>
              <p className="text-xs text-brand-text-muted">All lines are in-bounds</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">The court is divided in half by the net. Each side has a 7-foot non-volley zone (the {"\u201c"}kitchen{"\u201d"}) and a 15-foot service area that is split down the middle by the centerline into left and right service courts.</p>

          <CalloutBox title="Key Detail">
            <p>Unlike tennis, pickleball uses the same court dimensions for singles and doubles. You do not need a wider court for doubles play.</p>
          </CalloutBox>
        </section>

        {/* Total Space */}
        <section id="total-space">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much space do you actually need?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The 20{"\u2019"} x 44{"\u2019"} playing area is just the court itself. You need additional run-off (buffer) space around the court for safe play {"\u2014"} players frequently move beyond the baseline and sidelines during rallies.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"30' x 60'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">USAPA Minimum</p>
              <p className="text-xs text-brand-text-muted">Recreational play (1,800 sq ft)</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"34' x 64'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Tournament Standard</p>
              <p className="text-xs text-brand-text-muted">Competitive play (2,176 sq ft)</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"30' x 60'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Backyard / Residential</p>
              <p className="text-xs text-brand-text-muted">Works great for home courts</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">For a backyard or residential court, the 30{"\u2019"} x 60{"\u2019"} minimum is perfectly adequate. That gives you 5 feet of buffer on each side and 8 feet behind each baseline. Most homeowners find this comfortable for recreational play with family and friends.</p>

          <p className="text-brand-text-muted leading-relaxed mb-4">For competitive or tournament play, the 34{"\u2019"} x 64{"\u2019"} standard provides 7 feet on each side and 10 feet behind baselines {"\u2014"} giving advanced players more room to chase down lobs and deep returns. If you have the space, go with the larger footprint. For a full guide on building a residential court, see our <Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">backyard pickleball court build guide</Link>.</p>
        </section>

        {/* Multiple Courts on Tennis Court */}
        <section id="multiple-courts">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Can you fit multiple pickleball courts on a tennis court?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Yes {"\u2014"} this is one of the most common conversion projects we do. A standard tennis court is 60{"\u2019"} x 120{"\u2019"} (including doubles alleys and run-off), which is a massive amount of space relative to pickleball.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Full Tennis Court ({"60' x 120'"})</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">4 Courts</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">A full-size tennis court fits 4 pickleball courts in a 2x2 quadrant layout. Each court gets adequate spacing for recreational play. This is the most efficient use of an existing tennis surface and is ideal for community centers, HOAs, and multi-family properties.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Half Tennis Court or Compromised Surface</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">2 Courts</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">If the tennis surface is cracked or worn on one side, 2 pickleball courts side by side is the practical choice. You resurface only the good half and still get two full courts with proper spacing.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Basketball Court ({"~50' x 84'"})</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">1 Court</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed">A standard basketball court easily accommodates 1 pickleball court with generous run-off on all sides. The flat, hard surface is already well-suited for pickleball. Many schools and recreation centers add pickleball lines to existing basketball courts for dual use.</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">For a detailed walkthrough of converting an existing court, see our <Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">pickleball court conversion guide</Link>.</p>
        </section>

        {/* Setbacks and Clearance */}
        <section id="setbacks">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What about setbacks and clearance?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Run-off space is not optional {"\u2014"} it is a safety requirement. Players regularly move 5{"\u2013"}10 feet beyond the baseline chasing lobs and deep shots. Without adequate buffer space, you risk injuries from running into fences, walls, or landscape features.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Behind Baselines</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Minimum 10 feet behind each baseline. This is where the most movement happens beyond the court. More space is always better {"\u2014"} competitive courts use 12{"\u2013"}14 feet.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Along Sidelines</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Minimum 5 feet on each side of the court. If you are building adjacent courts, shared sideline space of 8{"\u2013"}10 feet between courts is standard to prevent player collisions.</p>
            </div>
          </div>

          <CalloutBox title="Austin HOA Note">
            <p>Some HOAs in Austin-area communities (Westlake, Lakeway, Steiner Ranch) have specific setback requirements from property lines for any hardscaping or sport courts. Check your HOA{"\u2019"}s architectural review guidelines before finalizing court placement.</p>
          </CalloutBox>
        </section>

        {/* Court Diagram */}
        <section id="diagram">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Pickleball court diagram and measurements</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">Here is a textual breakdown of the court layout from one baseline to the other. All measurements are per USAPA official rules.</p>

          <div className="my-8 p-6 bg-white border border-gray-200 rounded-xl">
            <div className="space-y-4 text-sm text-brand-text-muted">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-brand-text">Baseline to Kitchen Line</span>
                <span className="font-bold text-brand-blue">{"15'"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-brand-text">Kitchen Line to Net</span>
                <span className="font-bold text-brand-blue">{"7'"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-brand-text">Net to Kitchen Line (other side)</span>
                <span className="font-bold text-brand-blue">{"7'"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-brand-text">Kitchen Line to Baseline (other side)</span>
                <span className="font-bold text-brand-blue">{"15'"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-brand-text">Total Length (baseline to baseline)</span>
                <span className="font-bold text-brand-blue">{"44'"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-semibold text-brand-text">Court Width (sideline to sideline)</span>
                <span className="font-bold text-brand-blue">{"20'"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-brand-text">Centerline</span>
                <span className="font-bold text-brand-blue">Divides each service area into left and right</span>
              </div>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">The centerline runs from the kitchen line to the baseline on each side, creating two equal service courts (left and right). The centerline does not extend through the kitchen {"\u2014"} the non-volley zone is one continuous 20{"\u2019"} x 7{"\u2019"} area on each side of the net.</p>
        </section>

        {/* Surface and Slab */}
        <section id="surface-slab">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Surface and slab requirements</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Getting the court dimensions right is only half the equation. The slab underneath needs to meet specific specs to support a proper acrylic sport surface.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Concrete Thickness</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">4 inches minimum. This is a firm requirement {"\u2014"} thinner slabs crack under thermal expansion and court use. Most builders pour 4{"\u2013"}5 inches for residential courts.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Concrete Strength</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">3,000 PSI compressive strength minimum. Standard ready-mix concrete meets this. Higher PSI is fine but unnecessary for sport courts.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Drainage Slope</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">1 inch per 10 feet (approximately 1% grade). The slope should run in one direction {"\u2014"} not crowned {"\u2014"} so water drains off one side consistently.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Slab Size</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">The slab needs to cover your full run-off area, not just the 20{"\u2019"} x 44{"\u2019"} playing surface. A 30{"\u2019"} x 60{"\u2019"} minimum slab is standard for a single residential court.</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">Expansion joints should be at the perimeter only {"\u2014"} never through the playing surface. Joints through the court create uneven surfaces and will telegraph through the acrylic coating over time. For a complete build walkthrough including concrete specs, see our <Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">backyard pickleball court build guide</Link>. For surface system comparisons, see our <Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">court surface types guide</Link>.</p>
        </section>

        {/* Orientation */}
        <section id="orientation">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Orientation and sun position</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Court orientation is one of the most overlooked aspects of court construction {"\u2014"} and one of the easiest to get right if you plan for it upfront.</p>

          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">Courts should run north-south so the sun travels across the court (east to west) rather than into players{"'"} eyes along the length of the court.</p>
          </blockquote>

          <p className="text-brand-text-muted leading-relaxed mb-4">This is especially important in Austin and Central Texas where the summer sun is intense and low-angle morning/evening sunlight can make play on an east-west court nearly impossible. A north-south orientation means the sun is to the side during peak play times rather than blinding the server or receiver.</p>

          <p className="text-brand-text-muted leading-relaxed mb-4">If your lot constraints force an east-west orientation, consider adding shade structures or windscreens on the east and west fence lines to reduce glare during morning and evening play.</p>

          <CalloutBox title="Planning Tip">
            <p>When scoping your court location, visit the site at 8 AM and 6 PM to see exactly where the sun sits. That 10 minutes of observation can save years of squinting.</p>
          </CalloutBox>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Pickleball court dimension FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions about pickleball court dimensions, spacing, and layout requirements.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">Backyard pickleball court: cost, size & build guide (2026)</Link></li>
            <li><Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">Pickleball court conversion: tennis and basketball court conversions</Link></li>
            <li><Link href="/blog/pickleball-court-installation" className="text-brand-blue hover:underline">Pickleball court installation: dimensions, specs, and pricing</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. tile vs. cushion vs. turf</Link></li>
          </ul>
        </div>

        <BlogCTA title="Planning a Pickleball Court?" description="Tell us your space dimensions and we'll map out exactly what fits — court size, spacing, orientation, and surface options. Free assessment, no obligation." />
      </article>

      <CTABanner />
    </>
  );
}
