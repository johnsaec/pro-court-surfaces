import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Court Projects & Case Studies | Pro Court Surfaces",
  description:
    "Real court resurfacing and installation projects across Central Texas — before-and-after transformations, custom colors, and finished courts by Pro Court Surfaces.",
  openGraph: {
    title: "Court Projects & Case Studies | Pro Court Surfaces",
    description:
      "Real court resurfacing and installation projects across Central Texas by Pro Court Surfaces.",
    type: "website",
    url: "https://www.procourtsurfaces.com/projects",
  },
  alternates: { canonical: "https://www.procourtsurfaces.com/projects" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.procourtsurfaces.com/projects" },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-3">
              Projects
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-4">
              Courts we&apos;ve built and brought back to life.
            </h1>
            <p className="text-lg text-brand-text-muted">
              Real transformations across Central Texas. No stock photos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  width={1000}
                  height={750}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-green mb-1.5">
                    {project.courtType} &bull; {project.location}
                  </p>
                  <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
