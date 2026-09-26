import type { Metadata } from "next";
import ResurfacingSections from "./_components/ResurfacingSections";
import { RESURFACING_FAQS } from "./_components/resurfacing-data";

const PAGE_URL = "https://www.procourtsurfaces.com/court-resurfacing";
const OG_IMAGE =
  "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg";

export const metadata: Metadata = {
  title: "Tennis & Pickleball Court Resurfacing in Austin, TX | Pro Court Surfaces",
  description:
    "Tennis and pickleball court resurfacing across Austin and Central Texas: crack repair, acrylic color coats, and new lines. Free on-site quote, written quote in 48 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Tennis & Pickleball Court Resurfacing | Pro Court Surfaces",
    description:
      "Crack repair, acrylic recoating, and new lines for courts across Austin and Central Texas. Free on-site quotes.",
    url: PAGE_URL,
    siteName: "Pro Court Surfaces",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Resurfaced tennis court by Pro Court Surfaces" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Tennis and Pickleball Court Resurfacing",
  name: "Court Resurfacing",
  description:
    "Crack repair, low-spot patching, acrylic resurfacer and color coats, and new line striping for tennis, pickleball, and multi-sport courts.",
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
  mainEntity: RESURFACING_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 3, name: "Court Resurfacing", item: PAGE_URL },
  ],
};

export default function CourtResurfacingPage() {
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

      <ResurfacingSections />
    </>
  );
}
