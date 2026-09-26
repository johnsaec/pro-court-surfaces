import type { Metadata } from "next";
import { CourtBuildSections } from "@/components/landing/CourtBuildSections";
import { CONSTRUCTION_FAQS, PICKLEBALL_BUILD_CONTENT } from "./_components/construction-data";

const PAGE_URL = "https://www.procourtsurfaces.com/pickleball-court-construction";
const OG_IMAGE =
  "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1762354561/3_color_straight_h4nhiw.heic";

export const metadata: Metadata = {
  title: "Pickleball Court Construction in Austin, TX | Pro Court Surfaces",
  description:
    "New backyard, HOA, and club pickleball courts across Austin and Central Texas: full builds or surfacing on your new slab, custom colors, regulation lines. Free on-site quote in 48 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Pickleball Court Construction | Pro Court Surfaces",
    description:
      "New pickleball courts across Austin and Central Texas, from layout to final lines. Free on-site quotes.",
    url: PAGE_URL,
    siteName: "Pro Court Surfaces",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "New pickleball court by Pro Court Surfaces" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Pickleball Court Construction",
  name: "Pickleball Court Construction",
  description:
    "New pickleball and multi-sport court builds and surfacing on new concrete slabs: acrylic sport surface, custom colors, and regulation lines.",
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
  mainEntity: CONSTRUCTION_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 3, name: "Pickleball Court Construction", item: PAGE_URL },
  ],
};

export default function PickleballConstructionPage() {
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

      <CourtBuildSections content={PICKLEBALL_BUILD_CONTENT} />
    </>
  );
}
