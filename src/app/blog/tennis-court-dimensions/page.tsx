import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { CalloutBox } from "../_components/CalloutBox";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";
import { CTABanner } from "@/components/landing/CTABanner";

export const metadata: Metadata = {
  title: "Tennis Court Dimensions: Official Size, Layout & Space Requirements | Pro Court Surfaces",
  description: "What are the official tennis court dimensions? Singles court is 78ft x 27ft, doubles is 78ft x 36ft. Full guide to total space requirements, surface types, slab specs, and conversion to pickleball.",
  keywords: "tennis court dimensions, tennis court size, tennis court measurements, tennis court layout, how big is a tennis court, tennis court square footage, tennis court space requirements, tennis court net height",
  openGraph: {
    title: "Tennis Court Dimensions: Official Size, Layout & Space Requirements",
    description: "Official tennis court dimensions, total space requirements, surface types, and conversion options. Everything you need to know about tennis court sizing.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/tennis-court-dimensions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis Court Dimensions: Official Size, Layout & Space Requirements",
    description: "Official tennis court dimensions, total space requirements, surface types, and conversion options.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/tennis-court-dimensions" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tennis Court Dimensions: Official Size, Layout & Space Requirements",
  description: "Complete guide to official tennis court dimensions, total space requirements, surface types, slab specifications, and pickleball conversion options.",
  author: { "@type": "Person", name: "Patrick Johnson" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-03-09",
  dateModified: "2026-03-09",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/tennis-court-dimensions" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What are official tennis court dimensions?", acceptedAnswer: { "@type": "Answer", text: "A doubles tennis court is 78 feet long by 36 feet wide. A singles court uses the same length but is narrower at 27 feet wide. These are the dimensions set by the ITF (International Tennis Federation) and used at every level of play." } },
    { "@type": "Question", name: "How much space do you need for a backyard tennis court?", acceptedAnswer: { "@type": "Answer", text: "The USTA recommends a minimum total area of 120 feet by 60 feet (7,200 sq ft) to allow for proper overruns behind the baselines and on the sides. For recreational or backyard use, 110 feet by 56 feet can work but will feel tight during competitive play." } },
    { "@type": "Question", name: "How high is a tennis net?", acceptedAnswer: { "@type": "Answer", text: "A regulation tennis net is 3 feet (36 inches) high at the center and 3 feet 6 inches (42 inches) at the net posts. The net posts are placed 3 feet outside the doubles sideline on each side." } },
    { "@type": "Question", name: "How many pickleball courts fit on a tennis court?", acceptedAnswer: { "@type": "Answer", text: "A standard 60-foot by 120-foot tennis court area can fit 4 pickleball courts. Each pickleball court requires a 30-foot by 60-foot area including overruns. If the tennis court surface is compromised or space is tight, 2 pickleball courts is a more comfortable layout." } },
    { "@type": "Question", name: "What is the best surface for a tennis court?", acceptedAnswer: { "@type": "Answer", text: "Acrylic hard court surfaces are the most common and lowest-maintenance option for tennis courts. They provide consistent ball bounce, excellent durability, and can be customized with any color combination. Pro Court Surfaces installs ATS Acrytech, Laykold, and SportMaster acrylic systems." } },
    { "@type": "Question", name: "How thick should a tennis court concrete slab be?", acceptedAnswer: { "@type": "Answer", text: "A tennis court concrete slab should be a minimum of 4 inches thick with a compressive strength of 3,500 PSI. The larger surface area of a tennis court (compared to pickleball) makes proper slab thickness and expansion joints critical to prevent cracking." } },
    { "@type": "Question", name: "How often should a tennis court be resurfaced?", acceptedAnswer: { "@type": "Answer", text: "Most tennis courts need resurfacing every 4 to 8 years depending on usage, climate, and surface quality. In hot climates like Austin, TX, sun exposure and heat can accelerate wear, often requiring resurfacing closer to the 4-5 year mark." } },
    { "@type": "Question", name: "Which direction should a tennis court face?", acceptedAnswer: { "@type": "Answer", text: "A tennis court should be oriented north-south to minimize sun glare in players' eyes during morning and evening play. This is the standard recommendation from the USTA and applies to both residential and commercial court construction." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Tennis Court Dimensions", item: "https://www.procourtsurfaces.com/blog/tennis-court-dimensions" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tennis Court Surfacing & Resurfacing",
  provider: {
    "@type": "LocalBusiness",
    name: "Pro Court Surfaces",
    url: "https://www.procourtsurfaces.com",
    telephone: "(512) 893-0466",
    address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
  },
  areaServed: [
    { "@type": "City", name: "Austin", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "San Antonio", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Round Rock", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Cedar Park", containedInPlace: { "@type": "State", name: "Texas" } },
    { "@type": "City", name: "Georgetown", containedInPlace: { "@type": "State", name: "Texas" } },
  ],
  serviceType: "Tennis Court Surfacing",
  description: "Professional tennis court surfacing and resurfacing in Central Texas using ATS Acrytech, Laykold, and SportMaster acrylic systems.",
};

const tocItems = [
  { href: "#official-dimensions", label: "What are the official tennis court dimensions?" },
  { href: "#total-space", label: "How much total space do you need?" },
  { href: "#pickleball-conversion", label: "Can you convert a tennis court to pickleball?" },
  { href: "#surface-types", label: "Tennis court surface types" },
  { href: "#concrete-slab", label: "Concrete slab requirements" },
  { href: "#orientation-fencing", label: "Court orientation and fencing" },
  { href: "#resurfacing", label: "When does a tennis court need resurfacing?" },
  { href: "#faq", label: "Tennis court dimension FAQs" },
];

const faqItems = [
  { question: "What are official tennis court dimensions?", answer: "A doubles tennis court is 78 feet long by 36 feet wide (2,808 sq ft). A singles court uses the same length but is narrower at 27 feet wide (2,106 sq ft). These dimensions are set by the ITF and used at every level from recreational to professional." },
  { question: "How much space do you need for a backyard tennis court?", answer: "The USTA recommends a minimum total area of 120 feet by 60 feet (7,200 sq ft) to allow for proper overruns. That means 21 feet behind each baseline and 12 feet on each side. For recreational or backyard use, 110 feet by 56 feet can work but will feel tight." },
  { question: "How high is a tennis net?", answer: "A regulation tennis net is 3 feet (36 inches) high at the center and 3 feet 6 inches (42 inches) at the net posts. The net posts are positioned 3 feet outside the doubles sideline on each side." },
  { question: "How many pickleball courts fit on a tennis court?", answer: "A standard 60-foot by 120-foot tennis court area can fit 4 pickleball courts (each 30' x 60'). If the surface is compromised or you want more comfortable spacing, 2 pickleball courts is a practical alternative." },
  { question: "What is the best surface for a tennis court?", answer: "Acrylic hard court surfaces are the most common and lowest-maintenance option. They provide consistent ball bounce, excellent durability, and can be customized with any color combination. Pro Court Surfaces installs ATS Acrytech, Laykold, and SportMaster systems." },
  { question: "How thick should a tennis court concrete slab be?", answer: "A tennis court slab should be a minimum of 4 inches thick with a compressive strength of 3,500 PSI. The larger surface area of a tennis court makes proper expansion joints especially important to prevent cracking over time." },
  { question: "How often should a tennis court be resurfaced?", answer: "Most tennis courts need resurfacing every 4 to 8 years depending on usage, climate, and surface quality. In hot climates like Central Texas, sun exposure and heat accelerate wear, often requiring resurfacing closer to the 4-5 year mark." },
  { question: "Which direction should a tennis court face?", answer: "A tennis court should be oriented north-south to minimize sun glare during morning and evening play. This is the standard USTA recommendation and applies to both residential and commercial installations." },
];

export default function TennisCourtDimensionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <BlogHero
        category="Court Guide"
        date="Mar 9, 2026"
        readTime="8 min read"
        title="Tennis Court Dimensions |"
        titleAccent="Official Size, Layout & Space Requirements"
        subtitle="Everything you need to know about tennis court dimensions, total space requirements, surface types, and how tennis courts compare to pickleball."
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
        <p className="text-brand-text-muted leading-relaxed mb-8">Whether you are building a new tennis court, resurfacing an existing one, or considering a conversion to pickleball, it all starts with understanding the dimensions. Tennis courts are larger than most people realize {"\u2014"} and the total space you need goes well beyond the playing lines. Here is a complete breakdown of official tennis court measurements, space requirements, and everything that affects layout planning.</p>

        {/* Official Dimensions */}
        <section id="official-dimensions">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are the official tennis court dimensions?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The International Tennis Federation (ITF) sets the official court dimensions used at every level of play, from your local rec center to the US Open. Here are the key measurements.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"78' x 36'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Doubles Court</p>
              <p className="text-xs text-brand-text-muted">2,808 sq ft playing area</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"78' x 27'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Singles Court</p>
              <p className="text-xs text-brand-text-muted">2,106 sq ft playing area</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"21' x 13.5'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Service Box</p>
              <p className="text-xs text-brand-text-muted">4 boxes total (2 per side)</p>
            </div>
          </div>

          <div className="space-y-3 my-8">
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <span className="text-brand-blue font-bold text-sm mt-0.5">Net Height</span>
              <p className="text-sm text-brand-text-muted">3 feet at the center, 3 feet 6 inches at the net posts. Posts are positioned 3 feet outside the doubles sideline on each side.</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <span className="text-brand-blue font-bold text-sm mt-0.5">Lines</span>
              <p className="text-sm text-brand-text-muted">All lines are part of the court {"\u2014"} a ball landing on any line is considered in. Baselines are 2 inches wide; all other lines are 1{"\u2013"}2 inches wide. The center service line divides each service area into two equal boxes.</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <span className="text-brand-blue font-bold text-sm mt-0.5">Doubles Alleys</span>
              <p className="text-sm text-brand-text-muted">The 4.5-foot alleys on each side are the difference between singles (27{"\u2019"}) and doubles (36{"\u2019"}) width. Most courts are built to doubles dimensions even if primarily used for singles.</p>
            </div>
          </div>

          <CalloutBox title="Key Takeaway">
            <p>Almost all tennis courts are built to doubles dimensions (78{"\u2019"} x 36{"\u2019"}) regardless of primary use. The singles lines are simply marked within the doubles court, so you always have the option for both formats.</p>
          </CalloutBox>
        </section>

        {/* Total Space */}
        <section id="total-space">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How much total space do you need for a tennis court?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The playing area is 78{"\u2019"} x 36{"\u2019"}, but you cannot just pave a 78-by-36-foot slab and call it a court. Players need room to run behind the baseline and beside the sidelines. These {"\u201c"}overruns{"\u201d"} are critical for safe, competitive play.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"120' x 60'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">USTA Recommended</p>
              <p className="text-xs text-brand-text-muted">7,200 sq ft total area</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"110' x 56'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Recreational Minimum</p>
              <p className="text-xs text-brand-text-muted">6,160 sq ft (tight but playable)</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl text-center">
              <p className="text-2xl font-bold text-brand-blue mb-1">{"21' + 12'"}</p>
              <p className="text-sm font-semibold text-brand-text mb-1">Overrun Space</p>
              <p className="text-xs text-brand-text-muted">21{"\u2019"} behind baselines, 12{"\u2019"} on sides</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">The USTA minimum of 120{"\u2019"} x 60{"\u2019"} gives you 21 feet behind each baseline and 12 feet on each side. This is comfortable for competitive play and meets tournament standards. For a backyard or recreational court, 110{"\u2019"} x 56{"\u2019"} can work {"\u2014"} you are trading some run-out space for a smaller footprint, which is a reasonable tradeoff if your property cannot accommodate the full USTA spec.</p>

          <p className="text-brand-text-muted leading-relaxed mb-4">For comparison, a regulation pickleball court only needs 30{"\u2019"} x 60{"\u2019"} total area {"\u2014"} about one-quarter the space of a tennis court. If space is tight, a pickleball court may be the better option. See our <Link href="/blog/backyard-pickleball-court" className="text-brand-blue hover:underline">backyard pickleball court guide</Link> for details.</p>
        </section>

        {/* Pickleball Conversion */}
        <section id="pickleball-conversion">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Can you convert a tennis court to pickleball?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Yes {"\u2014"} and it is one of the most popular conversions we do. A standard 60{"\u2019"} x 120{"\u2019"} tennis court area can accommodate up to 4 pickleball courts, making it one of the most efficient sport court conversions available.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">4-Court Layout</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">The full tennis court footprint (60{"\u2019"} x 120{"\u2019"}) divides cleanly into four 30{"\u2019"} x 60{"\u2019"} pickleball courts. This is the standard conversion for parks, HOAs, and recreation centers that want to maximize court count.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">2-Court Layout</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">If the existing surface has damage in certain areas, or you want more generous spacing between courts, a 2-court layout works well. This gives each court extra overrun room and is common for residential conversions.</p>
            </div>
          </div>

          <div className="my-6 p-5 bg-brand-bg-alt border border-gray-200 rounded-xl">
            <p className="text-sm font-semibold text-brand-text mb-2">Typical tennis-to-pickleball conversion cost</p>
            <div className="space-y-2 text-sm text-brand-text-muted">
              <p><strong className="text-brand-text">Per pickleball court:</strong> $7,000 {"\u2013"} $10,000</p>
              <p><strong className="text-brand-text">Full 4-court conversion:</strong> $28,000 {"\u2013"} $40,000</p>
              <p><strong className="text-brand-text">Includes:</strong> surface prep, crack repair, acrylic resurfacing, new line striping, and net post installation</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">The conversion keeps the existing concrete slab and applies a fresh acrylic surface system with new pickleball lines. If the existing surface is still in good shape, you can also add pickleball lines alongside the tennis lines for a dual-use court. For a complete walkthrough, see our <Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">pickleball court conversion guide</Link>.</p>
        </section>

        {/* Surface Types */}
        <section id="surface-types">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Tennis court surface types and how they affect play</h2>
          <p className="text-brand-text-muted leading-relaxed mb-6">There are four main tennis court surface types. Each plays differently and has different maintenance requirements. Pro Court Surfaces specializes in acrylic hard court systems {"\u2014"} the most common and practical option for Texas courts.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-brand-text">Acrylic Hard Court</h3>
                <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">Most Common</span>
              </div>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-3">Multi-coat acrylic surface applied over concrete. This is the surface used at the US Open and Australian Open. It provides a fast, consistent ball bounce, excellent durability, and low maintenance. Custom color combinations are standard.</p>
              <ul className="space-y-1 text-sm text-brand-text-muted pl-4 list-disc">
                <li><strong className="text-brand-text">ATS Acrytech</strong> {"\u2014"} Our primary system. PPA-approved, multi-coat acrylic built for high-traffic courts.</li>
                <li><strong className="text-brand-text">Laykold</strong> {"\u2014"} Premium system used on professional venues worldwide. Excellent durability and color retention.</li>
                <li><strong className="text-brand-text">SportMaster</strong> {"\u2014"} Widely available acrylic system at a more accessible price point. Solid choice for residential courts.</li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Clay</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Slower ball speed, higher bounce. The surface of the French Open. Requires significant daily maintenance {"\u2014"} watering, rolling, and line sweeping. Not practical for most Texas residential courts due to maintenance demands and water usage.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Grass</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Fast, low bounce. Used at Wimbledon. Extremely high maintenance and not viable in the Texas climate. You will not find grass tennis courts outside of elite clubs in cooler, wetter regions.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Synthetic Turf</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Artificial grass infilled with sand. Low maintenance and plays similar to clay but without the watering. Used at some clubs but far less common than hard court or clay for dedicated tennis facilities.</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">For most residential and commercial courts in Central Texas, acrylic hard court is the right choice. It handles the heat, requires minimal maintenance, and lasts 8{"\u2013"}10 years between resurfacings. For a deeper comparison, see our <Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">court surface types guide</Link>.</p>
        </section>

        {/* Concrete Slab */}
        <section id="concrete-slab">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Concrete slab requirements for a tennis court</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">The concrete slab is the foundation of your court. Tennis courts are significantly larger than pickleball courts, which makes slab quality even more critical. Here are the key specs.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Minimum Specifications</h3>
              <ul className="space-y-2 text-sm text-brand-text-muted pl-4 list-disc">
                <li><strong className="text-brand-text">Thickness:</strong> 4 inches minimum</li>
                <li><strong className="text-brand-text">Compressive strength:</strong> 3,500 PSI recommended</li>
                <li><strong className="text-brand-text">Finish:</strong> Steel-trowel or medium broom</li>
                <li><strong className="text-brand-text">Slope:</strong> 1% grade in one direction for drainage</li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Why 3,500 PSI?</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">A tennis court slab at 120{"\u2019"} x 60{"\u2019"} is 7,200 square feet of concrete. That is roughly 89 cubic yards. The larger surface area creates more thermal expansion and contraction, which means higher PSI and proper jointing are essential to prevent cracking.</p>
            </div>
          </div>

          <CalloutBox title="Expansion Joints Matter">
            <p>On a 120-foot slab, expansion joints are critical. They should be placed at the perimeter and at strategic intervals {"\u2014"} but never through the playing surface where they would affect ball bounce. Your concrete contractor should plan joint placement before the pour.</p>
          </CalloutBox>

          <p className="text-brand-text-muted leading-relaxed mt-6 mb-4">For full cost breakdowns on concrete, site prep, and surfacing, see our <Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">court construction cost guide</Link>.</p>
        </section>

        {/* Orientation & Fencing */}
        <section id="orientation-fencing">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Court orientation and fencing</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Court placement on your property matters more than most people think. Orientation and fencing affect playability, safety, and long-term satisfaction.</p>

          <div className="space-y-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Orientation</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">The USTA recommends a north-south orientation for the long axis of the court. This minimizes sun glare for players serving and returning, especially during morning and evening play. If north-south is not possible due to lot shape, a slight deviation (up to 22 degrees) is acceptable.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Fencing</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Tennis court fencing is typically 10 feet high on the ends (behind baselines) and can be 8{"\u2013"}10 feet on the sides. Chain-link is standard; vinyl-coated chain-link in black or green is the upgrade most homeowners choose. Wind screens can be added for privacy and wind reduction.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Lighting</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">For evening play, a single tennis court typically requires 4 light poles; a two-court complex needs 6{"\u2013"}8 poles. LED court lighting has become the standard, offering better light distribution and lower energy costs than older halide systems.</p>
            </div>
          </div>

          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic">Note: Pro Court Surfaces handles surfacing and resurfacing only. We do not install fencing or lighting, but we can recommend contractors in the Austin area for those phases of your project.</p>
          </blockquote>
        </section>

        {/* Resurfacing */}
        <section id="resurfacing">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">When does a tennis court need resurfacing?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Even the best acrylic surface does not last forever. Texas heat, UV exposure, and regular play all take their toll. Here are the signs that your tennis court needs attention.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Signs It Is Time</h3>
              <ul className="space-y-2 text-sm text-brand-text-muted pl-4 list-disc">
                <li><strong className="text-brand-text">Fading color</strong> {"\u2014"} The surface looks washed out or uneven in color</li>
                <li><strong className="text-brand-text">Surface cracking</strong> {"\u2014"} Hairline cracks or larger structural cracks appearing</li>
                <li><strong className="text-brand-text">Puddles forming</strong> {"\u2014"} Water not draining properly after rain</li>
                <li><strong className="text-brand-text">Paint peeling</strong> {"\u2014"} Acrylic coating flaking or lifting from the slab</li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl">
              <h3 className="text-base font-semibold text-brand-text mb-2">Typical Timeline</h3>
              <p className="text-sm text-brand-text-muted leading-relaxed">Most tennis courts need resurfacing every 4{"\u2013"}8 years. The range depends on usage volume, surface quality, and local climate. In Austin and Central Texas, the combination of intense summer heat and UV exposure accelerates wear {"\u2014"} courts here often need resurfacing closer to the 4{"\u2013"}5 year mark compared to cooler climates.</p>
            </div>
          </div>

          <p className="text-brand-text-muted leading-relaxed mb-4">Catching issues early saves money. A simple resurface (new color coats over a structurally sound slab) costs far less than full <Link href="/blog/court-repair" className="text-brand-blue hover:underline">crack repair</Link> and rebuilding. Regular cleaning also extends surface life {"\u2014"} see our <Link href="/blog/court-maintenance" className="text-brand-blue hover:underline">court maintenance guide</Link> for a schedule.</p>

          <p className="text-brand-text-muted leading-relaxed mb-4">For a full walkthrough of the resurfacing process, timeline, and pricing, see our <Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">court resurfacing guide</Link>.</p>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Tennis court dimension FAQs</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Common questions about tennis court dimensions, sizing, and construction.</p>
          <BlogFAQ items={faqItems} />
        </section>

        {/* Related Reading */}
        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-resurfacing" className="text-brand-blue hover:underline">Court resurfacing: process, costs, and what to expect</Link></li>
            <li><Link href="/blog/pickleball-court-conversion" className="text-brand-blue hover:underline">Tennis-to-pickleball conversion: how it works and what it costs</Link></li>
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas: full breakdown (2026)</Link></li>
            <li><Link href="/blog/court-surface-types" className="text-brand-blue hover:underline">Compare court surface types: acrylic vs. clay vs. grass vs. synthetic</Link></li>
            <li><Link href="/blog/court-maintenance" className="text-brand-blue hover:underline">Court maintenance guide: cleaning schedules and pressure washing tips</Link></li>
            <li><Link href="/blog/court-repair" className="text-brand-blue hover:underline">Court repair: crack filling, patching, and structural fixes</Link></li>
            <li><Link href="/blog/pickleball-court-dimensions" className="text-brand-blue hover:underline">Pickleball court dimensions: official size and spacing guide</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need Court Surfacing or Resurfacing?" description="Pro Court Surfaces provides professional tennis and pickleball court surfacing across Austin and Central Texas. Free assessment, no obligation." />
      </article>

      <CTABanner />
    </>
  );
}
