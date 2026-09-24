import type { Metadata } from "next";
import CourtServicesSections from "./_components/CourtServicesSections";
import {
  COURT_SERVICES,
  COURT_SERVICES_FAQS,
} from "./_components/services-data";

const PAGE_URL = "https://www.procourtsurfaces.com/court-services";
const OG_IMAGE =
  "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1769365125/DJI_0054_rgzy6p.jpg";

export const metadata: Metadata = {
  title:
    "Court Resurfacing, Pickleball Conversions & New Courts in Austin, TX | Pro Court Surfaces",
  description:
    "Tennis and pickleball court resurfacing, tennis-to-pickleball conversions, court cleaning, and new court installation across Austin and Central Texas. Free on-site quotes within 48 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Court Resurfacing, Conversions, Cleaning & New Courts | Pro Court Surfaces",
    description:
      "Pickleball, tennis, and multi-sport court services across Austin and Central Texas. Free on-site quotes.",
    url: PAGE_URL,
    siteName: "Pro Court Surfaces",
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Resurfaced courts by Pro Court Surfaces" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Sport Court Resurfacing and Installation",
  url: PAGE_URL,
  provider: {
    "@type": "LocalBusiness",
    name: "Pro Court Surfaces",
    url: "https://www.procourtsurfaces.com",
    telephone: "+15128930466",
  },
  areaServed: { "@type": "Place", name: "Austin and Central Texas" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Court Services",
    itemListElement: COURT_SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.answer,
        url: `${PAGE_URL}#${s.id}`,
      },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COURT_SERVICES_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "Court Services", item: PAGE_URL },
  ],
};

export default function CourtServicesPage() {
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

      <CourtServicesSections />
    </>
  );
}
