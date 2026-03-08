import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Results } from "@/components/landing/Results";
import { Craftsmanship } from "@/components/landing/Craftsmanship";
import { Services } from "@/components/landing/Services";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Portfolio } from "@/components/landing/Portfolio";
import { Process } from "@/components/landing/Process";
import { WhyUs } from "@/components/landing/WhyUs";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { FAQ } from "@/components/landing/FAQ";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title:
    "Pro Court Surfaces | Pickleball & Tennis Court Resurfacing in Austin, TX",
  description:
    "Austin's premier pickleball and tennis court resurfacing company. Expert surface restoration, custom colors, and new court surfacing across Greater Austin and Central Texas. Free estimates.",
  keywords:
    "pickleball court resurfacing Austin, tennis court resurfacing Austin TX, court resurfacing Central Texas, pickleball court repair Austin, tennis court repair near me, court surfacing Austin, sport court resurfacing Texas",
  openGraph: {
    title:
      "Pro Court Surfaces | Pickleball & Tennis Court Resurfacing in Austin, TX",
    description:
      "Austin's premier pickleball and tennis court resurfacing company. Expert surface restoration, custom colors, and new court surfacing across Greater Austin and Central Texas.",
    url: "https://www.procourtsurfaces.com",
    siteName: "Pro Court Surfaces",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1769365125/DJI_0054_rgzy6p.jpg",
        width: 1200,
        height: 630,
        alt: "Aerial view of freshly resurfaced tennis courts by Pro Court Surfaces in Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Court Surfaces | Court Resurfacing in Austin, TX",
    description:
      "Premium pickleball & tennis court resurfacing across Greater Austin. Free estimates.",
    images: [
      "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1200/v1769365125/DJI_0054_rgzy6p.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.procourtsurfaces.com",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Pro Court Surfaces",
  description:
    "Professional pickleball and tennis court resurfacing, new court surfacing, and custom color design serving Austin and Greater Central Texas.",
  url: "https://www.procourtsurfaces.com",
  logo: "https://res.cloudinary.com/dwyd4f7lz/image/upload/v1767487583/pro_court_logo_full_color_no_bg_2_owjtqf.png",
  image:
    "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1769365125/DJI_0054_rgzy6p.jpg",
  telephone: "+15128930466",
  email: "patrick@procourtsurfaces.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.2672,
    longitude: -97.7431,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Austin",
      sameAs: "https://en.wikipedia.org/wiki/Austin,_Texas",
    },
    { "@type": "City", name: "Round Rock" },
    { "@type": "City", name: "Cedar Park" },
    { "@type": "City", name: "Georgetown" },
    { "@type": "City", name: "Wimberley" },
    { "@type": "City", name: "San Marcos" },
    { "@type": "City", name: "Dripping Springs" },
    { "@type": "City", name: "Kyle" },
    { "@type": "City", name: "Buda" },
    { "@type": "City", name: "Pflugerville" },
    { "@type": "City", name: "Lakeway" },
    { "@type": "City", name: "Bee Cave" },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 30.2672,
      longitude: -97.7431,
    },
    geoRadius: "100 mi",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Court Resurfacing",
  provider: {
    "@type": "LocalBusiness",
    name: "Pro Court Surfaces",
  },
  areaServed: {
    "@type": "State",
    name: "Texas",
  },
  description:
    "Professional pickleball and tennis court resurfacing services including surface restoration, crack repair, custom color application, and new court surfacing on fresh concrete.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Court Surfacing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Court Resurfacing",
          description:
            "Complete resurfacing of existing pickleball and tennis courts including crack repair, base layer application, color coating, and line striping",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "New Court Surfacing",
          description:
            "First-time acrylic surface application on new concrete slabs for pickleball and tennis courts",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Court Color and Design",
          description:
            "Custom color selection and multi-color court design with professional line striping for pickleball, tennis, and multi-sport courts",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to resurface a pickleball court in Austin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pickleball court resurfacing in Austin typically ranges from $3,000 to $8,000 depending on the court's condition, size, and number of colors. Pro Court Surfaces provides free on-site estimates with detailed, transparent pricing and no hidden fees.",
      },
    },
    {
      "@type": "Question",
      name: "How long does court resurfacing take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most court resurfacing projects take 3 to 5 working days from start to finish, depending on weather conditions and the scope of work. This includes surface preparation, crack repair, base layer application, color coats, and line striping.",
      },
    },
    {
      "@type": "Question",
      name: "What areas does Pro Court Surfaces serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pro Court Surfaces serves the Greater Austin and Central Texas area including Austin, Round Rock, Cedar Park, Georgetown, Wimberley, San Marcos, Dripping Springs, Kyle, Buda, Pflugerville, Lakeway, Bee Cave, and the surrounding Hill Country region.",
      },
    },
    {
      "@type": "Question",
      name: "Can you resurface a tennis court into pickleball courts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Converting a tennis court to pickleball is one of our most popular services. A standard tennis court can accommodate up to four pickleball courts. We handle the full conversion including surface prep, new color application, and pickleball line striping.",
      },
    },
    {
      "@type": "Question",
      name: "What type of surface coating do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use professional-grade acrylic sport surface coatings — the same systems used on tournament-level facilities. These coatings are specifically engineered for outdoor sport courts and are designed to withstand Texas heat, UV exposure, and heavy play.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Navbar />

      <main>
        <Hero />
        <Results />
        <Craftsmanship />
        <Services />
        <BeforeAfter />
        <Portfolio />
        <Process />
        <WhyUs />
        <ServiceArea />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
