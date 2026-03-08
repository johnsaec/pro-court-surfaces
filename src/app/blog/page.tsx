import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Court Surfacing Guides & Cost Breakdowns | Pro Court Surfaces",
  description: "Court construction guides, cost breakdowns, and surfacing insights for homeowners and contractors in Central Texas.",
  alternates: { canonical: "https://www.procourtsurfaces.com/blog" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.procourtsurfaces.com/blog" },
  ],
};

const posts = [
  {
    slug: "pickleball-court-installation",
    title: "Pickleball Court Installation & Surfacing in Central Texas",
    description: "Dimensions, concrete specs, ATS Acrytech surface details, cost ranges, and FAQ — everything GCs need to bid pickleball court projects.",
    date: "Mar 5, 2026",
    readTime: "14 min read",
    category: "Installation Guide",
  },
  {
    slug: "court-resurfacing",
    title: "Tennis & Pickleball Court Resurfacing in Central Texas",
    description: "Resurfacing process, cost guide, court types we handle, and FAQ for GC estimators scoping court resurfacing projects.",
    date: "Mar 5, 2026",
    readTime: "8 min read",
    category: "Resurfacing Guide",
  },
  {
    slug: "court-construction-costs",
    title: "Court Construction Costs in Texas: What GCs Need to Budget (2026)",
    description: "Real cost data for estimators building bids on tennis, pickleball, and multi-sport court projects in Central Texas.",
    date: "Feb 21, 2026",
    readTime: "12 min read",
    category: "Cost Guide",
  },
  {
    slug: "court-surface-types",
    title: "Tennis Court Surface Types: What GCs Need to Know Before Specifying",
    description: "Compare acrylic, modular tile, cushioned, and synthetic turf court surfaces. Written for GC estimators specifying amenity center courts.",
    date: "Feb 21, 2026",
    readTime: "10 min read",
    category: "Court Surfacing Guide",
  },
  {
    slug: "austin-court-surfacing",
    title: "Sport Court Surfacing in Austin, TX",
    description: "Tennis court resurfacing, pickleball court installation, and sport court surfacing for GCs across the Austin metro.",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    category: "Service Area",
  },
  {
    slug: "san-antonio-court-surfacing",
    title: "Sport Court Surfacing in San Antonio, TX",
    description: "Tennis court resurfacing and pickleball court installation for general contractors across the San Antonio metro and I-35 corridor.",
    date: "Mar 5, 2026",
    readTime: "7 min read",
    category: "Service Area",
  },
];

export default function BlogPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">Court Construction Insights</h1>
        <p className="text-lg text-brand-text-muted mb-12 max-w-xl">
          Guides, cost data, and surfacing knowledge for GC estimators building sport court projects in Central Texas.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group p-6 bg-white border border-gray-200 rounded-xl hover:border-brand-blue/30 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-brand-text-muted mb-3">
                <span className="text-brand-blue font-semibold uppercase tracking-widest">{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-brand-text group-hover:text-brand-blue transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-brand-text-muted leading-relaxed">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
