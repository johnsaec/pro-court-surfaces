import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Pro Court Surfaces",
  description: "Court construction guides, cost breakdowns, and surfacing insights for general contractors in Central Texas.",
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
