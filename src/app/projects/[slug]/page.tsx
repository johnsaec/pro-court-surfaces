import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import { BlogCTA } from "@/app/blog/_components/BlogCTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `https://www.procourtsurfaces.com/projects/${project.slug}`;
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.keywords,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      type: "article",
      url,
      images: [{ url: project.hero.src }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
      images: [project.hero.src],
    },
    alternates: { canonical: url },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const url = `https://www.procourtsurfaces.com/projects/${project.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.procourtsurfaces.com/projects" },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${project.courtType} ${project.service}`,
    serviceType: `Sport Court ${project.service}`,
    description: project.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Pro Court Surfaces",
      url: "https://www.procourtsurfaces.com",
      telephone: "(512) 893-0466",
      address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" },
    },
    areaServed: { "@type": "City", name: project.location.replace(/,.*$/, "") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Full-bleed hero */}
      <section className="relative h-[68vh] min-h-[420px] w-full">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-6xl mx-auto px-6 pb-10 sm:pb-14">
            <Link
              href="/projects"
              className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white mb-4"
            >
              &larr; All Projects
            </Link>
            <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-brand-green mb-2">
              <MapPin className="w-3.5 h-3.5" /> {project.courtType} &bull; {project.location}
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.05] max-w-3xl">
              {project.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Spec strip */}
      <section className="border-b border-gray-200 bg-brand-bg-alt">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-4">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-brand-text-muted mb-1">
                {fact.label}
              </p>
              <p className="text-sm font-semibold text-brand-text">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story — kept short */}
      <section className="max-w-3xl mx-auto px-6 py-14 sm:py-16">
        {project.body.map((para, i) => (
          <p
            key={i}
            className={`text-lg text-brand-text-muted leading-relaxed ${i === 0 ? "" : "mt-5"}`}
          >
            {para}
          </p>
        ))}
        {project.colors && project.colors.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-brand-text-muted mr-1">
              Colors
            </span>
            {project.colors.map((c) => (
              <span
                key={c}
                className="text-xs font-medium text-brand-text bg-white border border-gray-200 rounded-full px-3 py-1"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Before / After */}
      <section className="max-w-6xl mx-auto px-6 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <figure className="relative overflow-hidden rounded-2xl">
            <span className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white text-[0.7rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Before
            </span>
            <Image
              src={project.before.src}
              alt={project.before.alt}
              width={1000}
              height={750}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </figure>
          <figure className="relative overflow-hidden rounded-2xl">
            <span className="absolute top-4 left-4 z-10 bg-brand-blue text-white text-[0.7rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              After
            </span>
            <Image
              src={project.after.src}
              alt={project.after.alt}
              width={1000}
              height={750}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </figure>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16 sm:pb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-5">
            From the Job
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {project.gallery.map((img, i) => (
              <figure key={i} className="relative overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1000}
                  height={750}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6">
        <BlogCTA
          title="Have a court like this?"
          description="Get a free on-site estimate. We resurface tennis, pickleball, basketball, and multi-sport courts across Central Texas."
          buttonText="Request a Free Estimate"
          href="/#contact"
        />
      </div>

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:border-brand-blue/40 transition-colors"
          >
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-text-muted mb-1">
                Next Project
              </p>
              <p className="text-lg font-bold text-brand-text group-hover:text-brand-blue transition-colors">
                {next.name}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-brand-blue shrink-0" />
          </Link>
        </section>
      )}
    </>
  );
}
