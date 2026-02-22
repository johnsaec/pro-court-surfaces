import type { Metadata } from "next";
import CommercialSections from "./_components/CommercialSections";

export const metadata: Metadata = {
  title: "GC Court Surfacing Sub | Pro Court Surfaces",
  description:
    "Pro Court Surfaces is a sport court surfacing subcontractor in Central Texas. ATS Sports Acrytech surfaces for multi-family amenity centers — 48hr bids, 2yr warranty, zero scope overlap.",
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
        text: "We install ATS Sports Acrytech acrylic sport court surfaces. Acrytech is a professional-grade system designed for high-traffic environments like multi-family amenity centers, delivering consistent playability and long-term durability in the Central Texas climate.",
      },
    },
    {
      "@type": "Question",
      name: "Does Pro Court Surfaces work as a subcontractor for general contractors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work exclusively as a surfacing subcontractor for general contractors. We handle the sport court surface scope only — no fencing, lighting, or accessories — so there is zero overlap with your other trades.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Pro Court Surfaces serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve the Central Texas region, including Austin, San Antonio, Waco, and surrounding areas.",
      },
    },
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

      <CommercialSections />
    </>
  );
}
