import type { Metadata } from "next";
import Link from "next/link";
import { BlogHero } from "../_components/BlogHero";
import { ProsCons } from "../_components/ProsCons";
import { ComparisonTable } from "../_components/ComparisonTable";
import { BlogFAQ } from "../_components/BlogFAQ";
import { BlogCTA } from "../_components/BlogCTA";

export const metadata: Metadata = {
  title: "Tennis Court Surface Types: What GCs Need to Know | Pro Court Surfaces",
  description: "A GC's guide to tennis court and pickleball court surface types for amenity centers. Compare acrylic, modular tile, cushioned, and synthetic turf systems.",
  openGraph: {
    title: "Tennis Court Surface Types: What GCs Need to Know",
    description: "Compare acrylic, modular tile, cushioned, and synthetic turf court surfaces. Written for GC estimators specifying amenity center courts.",
    type: "article",
    url: "https://www.procourtsurfaces.com/blog/court-surface-types",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis Court Surface Types: What GCs Need to Know",
    description: "Compare acrylic, modular tile, cushioned, and synthetic turf court surfaces.",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/blog/court-surface-types" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tennis Court Surface Types: What GCs Need to Know Before Specifying",
  description: "A GC's guide to tennis court and pickleball court surface types for amenity centers.",
  author: { "@type": "Organization", name: "Pro Court Surfaces" },
  publisher: { "@type": "Organization", name: "Pro Court Surfaces" },
  datePublished: "2026-02-21",
  dateModified: "2026-02-21",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.procourtsurfaces.com/blog/court-surface-types" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
    { "@type": "ListItem", position: 3, name: "Court Surface Types", item: "https://www.procourtsurfaces.com/blog/court-surface-types" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How long do acrylic tennis court surfaces last?", acceptedAnswer: { "@type": "Answer", text: "A properly installed acrylic court surface lasts 8-12 years before it needs recoating, depending on climate, usage, and maintenance." } },
    { "@type": "Question", name: "Can you resurface over an existing court surface?", acceptedAnswer: { "@type": "Answer", text: "Yes, in most cases. If the existing surface is acrylic and the substrate is structurally sound, you can recoat over it after proper surface prep." } },
    { "@type": "Question", name: "What colors are available for court surfaces?", acceptedAnswer: { "@type": "Answer", text: "ATS Sports Acrytech offers a full range of standard colors. Most amenity centers go with classic combinations like green/green, blue/green, or blue/blue." } },
    { "@type": "Question", name: "What is the difference between a tennis court surface and a pickleball court surface?", acceptedAnswer: { "@type": "Answer", text: "The surface material is the same. The difference is in dimensions and line striping. Many amenity centers spec multi-sport courts with both lines on the same surface." } },
    { "@type": "Question", name: "How much does court surfacing cost for an amenity center?", acceptedAnswer: { "@type": "Answer", text: "Acrylic surfacing for a standard tennis court typically runs $7,000-$15,000 for the surface scope alone." } },
    { "@type": "Question", name: "What substrate do you need for acrylic court surfacing?", acceptedAnswer: { "@type": "Answer", text: "Acrylic court surfaces require a concrete or asphalt substrate, properly cured and sloped for drainage (1% minimum). New concrete needs at least 28 days to cure before surfacing." } },
  ],
};

const faqItems = [
  { question: "How long do acrylic tennis court surfaces last?", answer: "A properly installed acrylic court surface lasts 8-12 years before it needs recoating, depending on climate, usage, and maintenance. In Central Texas, UV exposure is the biggest factor \u2014 which is why UV-stable systems like ATS Sports Acrytech are important. The concrete or asphalt substrate underneath lasts decades." },
  { question: "Can you resurface over an existing court surface?", answer: "Yes, in most cases. If the existing surface is acrylic and the substrate is structurally sound, you can recoat over it after proper surface prep \u2014 cleaning, crack repair, and leveling. This saves significant cost vs. tearing out and starting from scratch. We evaluate every existing surface before bidding to confirm it's a candidate for recoating." },
  { question: "What colors are available for court surfaces?", answer: "ATS Sports Acrytech offers a full range of standard colors for both playing surface and surrounding areas. Most amenity centers go with classic combinations \u2014 green/green, blue/green, or blue/blue \u2014 but custom color matching is available. We include color selection in our bid process so your owner or architect can sign off before we start." },
  { question: "What is the difference between a tennis court surface and a pickleball court surface?", answer: "The surface material is the same \u2014 acrylic coating applied to a concrete or asphalt substrate. The difference is in dimensions and line striping. A tennis court is 78' x 36' (60' x 120' with overruns). A pickleball court is 20' x 44' (30' x 60' with overruns). Many amenity centers spec multi-sport courts with both tennis and pickleball lines on the same surface." },
  { question: "How much does court surfacing cost for an amenity center?", answer: "Court surfacing costs vary based on court count, surface type, condition of the substrate, and project location. For a ballpark: acrylic surfacing for a standard tennis court typically runs $7,000-$15,000 for the surface scope alone (no base work, fencing, or lighting). We provide detailed line-item bids within 48 hours so you have real numbers for your estimate." },
  { question: "What substrate do you need for acrylic court surfacing?", answer: "Concrete or asphalt, properly cured and sloped for drainage (1% minimum). For new construction, concrete needs at least 28 days to cure before we can surface. We inspect the substrate before starting and flag any issues \u2014 cracks, low spots, moisture \u2014 so they get addressed before the surface goes down." },
];

export default function CourtSurfaceTypesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogHero
        category="Court Surfacing Guide"
        date="February 21, 2026"
        readTime="10 min read"
        title="Tennis Court Surface Types: What GCs Need to Know"
        titleAccent="Before Specifying"
        subtitle="You're putting together an estimate for an amenity center and the architect spec'd 'sport court surfaces.' Here's what that actually means \u2014 and which system you should carry in your bid."
      />

      <article className="max-w-3xl mx-auto px-6 py-12">

        {/* Why Surface Choice Matters */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Why does court surface choice matter for amenity centers?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">When you are building amenity courts for a multi-family development, the surface system you spec has direct consequences for your project {"\u2014"} and your reputation. Pick the wrong one and you are fielding callback calls within a year. Pick the right one and the courts disappear from your punch list permanently.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">Here is what most GC estimators do not realize: <strong className="text-brand-text">not all court surfaces are created equal</strong>, and the cheapest option almost never survives the Central Texas climate and the daily abuse from hundreds of residents.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">This guide breaks down the four main sport court surfacing systems, compares them head-to-head, and tells you what we would spec for amenity center courts based on our experience as a <Link href="/" className="text-brand-blue hover:underline">surfacing subcontractor in Central Texas</Link>.</p>
        </section>

        {/* Acrylic Court Surfaces */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are acrylic court surfaces?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Acrylic court surfacing is the industry standard for tennis and pickleball courts {"\u2014"} and the system used on virtually every professional and collegiate court in the country. It is a multi-layer coating applied directly over a concrete or asphalt substrate.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">The typical acrylic system consists of:</p>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Resurfacer / filler coat</strong> {"\u2014"} levels minor imperfections in the substrate</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Acrylic color coats</strong> {"\u2014"} 2-3 layers of pigmented acrylic for uniform color and texture</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Line striping</strong> {"\u2014"} regulation game lines for tennis, pickleball, or multi-sport</li>
          </ul>
          <p className="text-brand-text-muted leading-relaxed mb-4">The surface texture is controlled by mixing silica sand into the acrylic, which gives the court grip for players and affects ball speed. This is the system that holds up best in high-traffic amenity center environments.</p>
          <ProsCons
            pros={[
              "Industry-standard for competitive and recreational play",
              "8-12 year lifespan before recoating",
              "UV and weather resistant",
              "Customizable colors and textures",
              "Can be resurfaced without replacing substrate",
              "Professional look for amenity centers",
            ]}
            cons={[
              "Requires a properly cured, flat substrate",
              "Weather-dependent install (no rain, temps above 50F)",
              "Higher upfront cost vs. modular tiles",
            ]}
          />
        </section>

        {/* ATS Acrytech Highlight */}
        <section>
          <div className="my-8 p-6 bg-white border border-brand-blue rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%)]" />
            <div className="relative">
              <h3 className="text-xl font-bold text-brand-blue mb-3">ATS Sports Acrytech {"\u2014"} The System We Install</h3>
              <p className="text-brand-text-muted leading-relaxed mb-3"><strong className="text-brand-text">ATS Sports Acrytech</strong> is a professional-grade acrylic sport court surface system and the product we install on every court. It is <strong className="text-brand-text">PPA-approved</strong> (Professional Pickleball Association) and engineered for high-traffic, high-UV environments like Central Texas amenity centers.</p>
              <p className="text-brand-text-muted leading-relaxed mb-3">Why we chose Acrytech over other acrylic systems:</p>
              <ul className="space-y-2 mb-3 pl-5 list-disc">
                <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">UV stability</strong> {"\u2014"} colors hold in full Central Texas sun without premature fading</li>
                <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Crack resistance</strong> {"\u2014"} flexible formulation absorbs substrate movement</li>
                <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Consistent texture</strong> {"\u2014"} factory-controlled silica ratios for uniform ball speed</li>
                <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Manufacturer warranty</strong> {"\u2014"} materials warranty alongside our 2-year workmanship warranty</li>
              </ul>
              <p className="text-brand-text-muted leading-relaxed">When you spec Acrytech, you are specifying the same system used on tournament-grade courts.</p>
            </div>
          </div>
        </section>

        {/* Modular Tile Systems */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are modular tile court systems?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Modular tile systems {"\u2014"} like Sport Court, SnapSports, and similar brands {"\u2014"} use interlocking plastic tiles that snap together over a hard surface. They are popular in the residential market and for backyard courts.</p>
          <ProsCons
            pros={[
              "Fast installation",
              "DIY-friendly (no specialized crew needed)",
              "Replaceable \u2014 swap individual damaged tiles",
              "Good drainage through tile gaps",
            ]}
            cons={[
              "Tiles can shift, warp, or pop out under heavy use",
              "Not a permanent surface \u2014 feels temporary underfoot",
              "Seams create inconsistent ball bounce",
              "Looks residential, not commercial-grade",
              "Higher long-term maintenance",
              "Debris and mold can accumulate under tiles",
            ]}
          />
          <p className="text-brand-text-muted leading-relaxed mb-4"><strong className="text-brand-text">Our take:</strong> Modular tiles work fine for a homeowner's backyard. For a multi-family amenity center with hundreds of residents, they do not hold up {"\u2014"} and they do not look the part.</p>
        </section>

        {/* Cushioned Systems */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are cushioned court surfaces?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Cushioned court surfaces add rubber or acrylic cushion layers underneath the standard acrylic color coats. The result is a surface with more give, which reduces joint stress and player fatigue. These systems typically add 3-9 layers of cushion material.</p>
          <ProsCons
            pros={[
              "Easier on joints \u2014 reduces player fatigue",
              "Used at pro-level tournaments (US Open, etc.)",
              "Better for competitive tennis facilities",
              "Still an acrylic system \u2014 same color and line options",
            ]}
            cons={[
              "Significantly higher cost (2-3x standard acrylic)",
              "Longer install time due to additional layers",
              "Overkill for recreational amenity center play",
              "More complex repairs if cushion layer is damaged",
            ]}
          />
          <p className="text-brand-text-muted leading-relaxed mb-4"><strong className="text-brand-text">Our take:</strong> Cushioned systems make sense for dedicated competitive tennis facilities {"\u2014"} country clubs, training centers, tournament venues. For a typical multi-family amenity center where residents are playing casual games, standard acrylic gives you the durability and performance you need without the added cost.</p>
        </section>

        {/* Synthetic Turf */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What are synthetic turf courts?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Synthetic turf is an emerging option for sport courts, especially for multi-use areas. The turf is infilled with sand or rubber and installed over a compacted aggregate or concrete base.</p>
          <ProsCons
            pros={[
              "Soft surface \u2014 low impact on joints",
              "Multi-use friendly (courts + general recreation)",
              "Good drainage characteristics",
              "Visually distinctive for marketing",
            ]}
            cons={[
              "Different ball bounce than standard hard courts",
              "Retains heat \u2014 significant issue in Central Texas",
              "Infill requires periodic maintenance and replenishment",
              "Not regulation for most tennis or pickleball play",
              "Shorter lifespan than acrylic in high-traffic settings",
            ]}
          />
          <p className="text-brand-text-muted leading-relaxed mb-4"><strong className="text-brand-text">Our take:</strong> Synthetic turf is a completely different use case. If the owner wants standard tennis or pickleball courts that play like courts, this is not the right surface.</p>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">How do court surface types compare?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">Here is the head-to-head breakdown for GC estimators comparing surface options for multi-family amenity center courts.</p>
          <ComparisonTable
            headers={["Factor", "Acrylic (Acrytech)", "Modular Tile", "Cushioned", "Synthetic Turf"]}
            rows={[
              { factor: "Durability", values: ["8-12 years", "5-8 years", "8-12 years", "5-8 years"], recommended: 0 },
              { factor: "Upfront Cost", values: ["$$", "$-$$", "$$$-$$$$", "$$-$$$"], recommended: 0 },
              { factor: "10-Year TCO", values: ["Lowest", "Moderate-High", "High", "Moderate-High"], recommended: 0 },
              { factor: "Maintenance", values: ["Low \u2014 sweep and wash", "Moderate \u2014 tile replacement", "Low \u2014 sweep and wash", "Moderate \u2014 infill, grooming"], recommended: 0 },
              { factor: "Appearance", values: ["Professional / commercial", "Residential", "Professional / commercial", "Distinctive / recreational"], recommended: 0 },
              { factor: "Warranty", values: ["Manufacturer + workmanship", "Varies by brand", "Manufacturer + workmanship", "Varies by brand"], recommended: 0 },
              { factor: "Ball Bounce", values: ["Regulation standard", "Inconsistent at seams", "Regulation standard", "Non-standard"], recommended: 0 },
              { factor: "Best For", values: ["Amenity centers", "Backyards, temp installs", "Competition facilities", "Multi-use recreation"], recommended: 0 },
              { factor: "Central TX Heat", values: ["UV-stable formulation", "Can warp in extreme heat", "UV-stable formulation", "Retains significant heat"], recommended: 0 },
            ]}
          />
        </section>

        {/* What GCs Should Spec */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">What court surface should a GC spec for an amenity center?</h2>
          <p className="text-brand-text-muted leading-relaxed mb-4">If you are estimating a multi-family amenity center with tennis courts, pickleball courts, or multi-sport courts, here is the short answer: <strong className="text-brand-text">spec acrylic court surfacing</strong>.</p>
          <p className="text-brand-text-muted leading-relaxed mb-4">Specifically, we recommend <strong className="text-brand-text">ATS Sports Acrytech</strong> for amenity center projects because it checks every box a GC cares about:</p>
          <ul className="space-y-2 mb-6 pl-5 list-disc">
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Durability</strong> {"\u2014"} 8-12 years before recoating, even in Central Texas heat</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Low callbacks</strong> {"\u2014"} proper install means the courts do not come back to haunt you</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Clean closeout</strong> {"\u2014"} manufacturer warranty on materials plus our 2-year workmanship warranty</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Professional appearance</strong> {"\u2014"} courts that look good in lease-up marketing photos</li>
            <li className="text-brand-text-muted leading-relaxed"><strong className="text-brand-text">Resurfaceable</strong> {"\u2014"} when the owner needs new color in 10 years, the substrate stays</li>
          </ul>
          <blockquote className="border-l-[3px] border-brand-blue pl-5 py-3 my-8 bg-blue-50 rounded-r-lg">
            <p className="text-brand-text italic"><strong>Pro tip for estimators:</strong> When you carry an acrylic surface in your bid, make sure the substrate spec includes proper slope (1% minimum for drainage), adequate curing time (28 days for new concrete), and crack isolation details. The surface is only as good as what is underneath it.</p>
          </blockquote>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-brand-text mt-12 mb-4">Frequently Asked Questions</h2>
          <BlogFAQ items={faqItems} />
        </section>

        <div className="mt-12 p-6 bg-brand-bg-alt border border-gray-200 rounded-xl">
          <p className="text-brand-text font-semibold mb-2">Related reading</p>
          <ul className="space-y-2 text-brand-text-muted text-sm">
            <li><Link href="/blog/court-construction-costs" className="text-brand-blue hover:underline">Court construction costs in Texas: full breakdown for GC estimators</Link></li>
            <li><Link href="/commercial" className="text-brand-blue hover:underline">How we work with GCs — see our subcontractor page</Link></li>
          </ul>
        </div>

        <BlogCTA title="Need Help Specifying Court Surfaces?" description="We're the surfacing sub GCs in Central Texas call when the courts have to be right. Send us your project details and we'll have a detailed bid back within 48 hours." />
      </article>
    </>
  );
}
