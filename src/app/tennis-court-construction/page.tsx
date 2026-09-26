import type { Metadata } from "next";
import { CourtBuildSections } from "@/components/landing/CourtBuildSections";
import { TENNIS_BUILD_CONTENT, TENNIS_FAQS } from "./_components/tennis-data";

const PAGE_URL = "https://www.procourtsurfaces.com/tennis-court-construction";
const OG_IMAGE =
  "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1769365125/DJI_0054_rgzy6p.jpg";

export const metadata: Metadata = {
  title: "Tennis Court Construction in Austin, TX | Pro Court Surfaces",
  description:
    "New backyard, HOA, club, and school tennis courts across Austin and Central Texas: full builds or surfacing on your new slab, custom colors, regulation lines. Free on-site quote in 48 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tennis Court Construction | Pro Court Surfaces",
    description:
      "New tennis courts across Austin and Central Texas, from layout to final lines. Free on-site quotes.",
    url: PAGE_URL,
    siteName: "Pro Court Surfaces",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Tennis courts by Pro Court Surfaces" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Tennis Court Construction",
  name: "Tennis Court Construction",
  description:
    "New tennis court builds and surfacing on new slabs: acrylic sport surface, optional cushion, custom colors, and regulation lines.",
  url: PAGE_URL,
  provider: {
    "@type": "LocalBusiness",
    name: "Pro Court Surfaces",
    url: "https://www.procourtsurfaces.com",
    telephone: "+15128930466",
  },
  areaServed: { "@type": "Place", name: "Austin and Central Texas" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TENNIS_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "Court Services", item: "https://www.procourtsurfaces.com/court-services" },
    { "@type": "ListItem", position: 3, name: "Tennis Court Construction", item: PAGE_URL },
  ],
};

export default function TennisConstructionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CourtBuildSections content={TENNIS_BUILD_CONTENT} />
    </>
  );
}
