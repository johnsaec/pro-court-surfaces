import type { Metadata } from "next";
import CommercialSections from "./_components/CommercialSections";

export const metadata: Metadata = {
  title: "GC Court Surfacing Sub | Pro Court Surfaces",
  description:
    "Pro Court Surfaces is a sport court surfacing subcontractor in Central Texas. ATS Sports Acrytech surfaces for multi-family amenity centers — 48hr bids, 2yr warranty, zero scope overlap.",
  alternates: { canonical: "https://www.procourtsurfaces.com/commercial" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pro Court Surfaces",
  description:
    "Sport court surfacing subcontractor specializing in tennis and pickleball court surfaces for multi-family amenity centers in Central Texas.",
  areaServed: { "@type": "Place", name: "Central Texas" },
  serviceType: [
    "Sport Court Surfacing",
    "Tennis Court Surfacing",
    "Pickleball Court Surfacing",
  ],
  knowsAbout: [
    "ATS Sports Acrytech",
    "Acrylic Sport Court Surfaces",
    "Multi-Family Amenity Centers",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What surface system does Pro Court Surfaces install?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We install ATS Sports Acrytech — a professional-grade acrylic sport court surface system engineered for high-traffic environments like multi-family amenity centers. It holds up to Central Texas heat and UV exposure.",
      },
    },
    {
      "@type": "Question",
      name: "Does Pro Court Surfaces work as a subcontractor under a GC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. That's our primary model. We carry our own insurance, provide W-9s, and work within your project management structure — submittals, schedules, site meetings, all of it.",
      },
    },
    {
      "@type": "Question",
      name: "What do you need from us before you can bid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Court dimensions, surface type (tennis, pickleball, multi-sport), color preferences, and your project timeline. Send site plans and we'll return a bid in 48 hours.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical court surfacing job take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most amenity center courts take 5–10 business days depending on court count and weather. We provide an exact timeline in our bid so you can plan your schedule around it.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Pro Court Surfaces serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Central Texas — Austin, San Antonio, Waco, and surrounding areas within approximately 100 miles of Austin.",
      },
    },
    {
      "@type": "Question",
      name: "Are your surfaces warrantied?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get ATS Sports Acrytech's manufacturer warranty on materials plus our 2-year workmanship warranty on the install. Both go into your project closeout package.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.procourtsurfaces.com" },
    { "@type": "ListItem", position: 2, name: "GC Court Surfacing", item: "https://www.procourtsurfaces.com/commercial" },
  ],
};

export default function CommercialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CommercialSections />
    </>
  );
}
