import type { CourtBuildContent } from "@/components/landing/CourtBuildSections";

// Shared copy for /tennis-court-construction (Google Ads tennis-build ad group +
// organic page). Rendered on-page and in JSON-LD, so the FAQ schema always
// matches what visitors see. No prices by policy: every CTA is a free quote.

export const TENNIS_FAQS = [
  {
    question: "How much does it cost to build a tennis court?",
    answer:
      "It depends on whether you need a full build or surfacing on a new slab, site work and drainage, fencing and lighting, cushion layers, and how many colors you want. We give free on-site quotes: Patrick walks the site with you and you get a detailed written quote within 48 hours.",
  },
  {
    question: "How much space do I need for a tennis court?",
    answer:
      "A regulation tennis court is 36 by 78 feet for doubles. With run-back and side room, the recommended total area is about 60 by 120 feet. Tighter backyard layouts can still work, and we'll help you fit the best layout to your space.",
  },
  {
    question: "Which way should a tennis court face?",
    answer:
      "North-south is best, so the low morning and evening sun isn't in a player's eyes. We'll look at your site's orientation, slope, and drainage before anything is built.",
  },
  {
    question: "Can you surface a slab my builder or concrete contractor poured?",
    answer:
      "Yes. We apply the complete acrylic sport surface on new slabs poured by builders and concrete contractors. New concrete needs to cure fully before coating, and we check slope and surface before we start.",
  },
  {
    question: "Can I add pickleball lines to my new tennis court?",
    answer:
      "Yes. Many new tennis courts get pickleball lines in a contrasting color, so the court works for both sports. A tennis court fits up to four pickleball courts.",
  },
  {
    question: "Do you offer cushioned tennis court surfaces?",
    answer:
      "Yes. Cushion layers under the color coats make the court easier on joints. We'll walk through hard-court and cushioned options during your quote.",
  },
  {
    question: "Do you build tennis courts for HOAs, clubs, and schools?",
    answer:
      "Yes. We build backyard tennis courts and multi-court facilities for HOAs, clubs, schools, apartment communities, and builders across Central Texas.",
  },
  {
    question: "Is the work warrantied?",
    answer:
      "Yes. Every job comes with a written warranty, and the exact terms are spelled out in your quote before you sign.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Greater Austin and Central Texas, including Round Rock, Cedar Park, Georgetown, Leander, Dripping Springs, Wimberley, San Marcos, Kyle, Buda, Lakeway, Bee Cave, Westlake, New Braunfels, and San Antonio.",
  },
];

export const TENNIS_BUILD_CONTENT: CourtBuildContent = {
  pagePath: "/tennis-court-construction",
  formName: "tennis_construction_contact",
  defaultProjectType: "new_court_full_build",
  hero: {
    titleLead: "Tennis court",
    titleAccent: "construction.",
    body: "New backyard, HOA, club, and school tennis courts, from planning the layout to the final lines. Patrick walks your site with you and sends a detailed written quote within 48 hours, free.",
    image: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1769365125/DJI_0054_rgzy6p.jpg",
      alt: "Aerial view of tennis courts with a fresh acrylic surface in Central Texas",
    },
  },
  options: [
    {
      title: "Full court build",
      body: "Starting from bare ground. We help plan size, north-south orientation, and drainage, and deliver a finished tennis court with a pro-grade acrylic surface, your colors, and regulation lines.",
      projectType: "new_court_full_build",
      message: "Interested in: full tennis court build",
    },
    {
      title: "Surfacing on a new slab",
      body: "Already poured, or working with your own builder or concrete contractor? We apply the complete acrylic sport surface system, colors, and tennis lines on your new slab.",
      projectType: "new_court_surfacing_only",
      message: "Interested in: surfacing a new tennis court slab",
    },
  ],
  stepsTitle: "How is a tennis court built?",
  steps: [
    {
      title: "Plan the court",
      body: "Court size, north-south orientation, run-back room, drainage, and fencing and lighting needs.",
    },
    {
      title: "Slab & prep",
      body: "A properly sloped slab, fully cured and prepped so the surface bonds for the long term.",
    },
    {
      title: "Acrylic surface system",
      body: "Resurfacer and color coats built for Texas heat and UV, with optional cushion layers.",
    },
    {
      title: "Your colors",
      body: "Custom court and border colors, plus contrasting pickleball lines if you want both sports.",
    },
    {
      title: "Regulation lines",
      body: "Precision-measured tennis lines, with pickleball or multi-sport lines added if you like.",
    },
  ],
  stepsImage: {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg",
    alt: "Aerial view of a tennis court with a new blue and green acrylic surface",
  },
  featuredProjectSlugs: [
    "georgetown-multi-sport-court",
    "wimberley-multi-sport-court",
    "lake-austin-rooftop-pickleball-court",
    "san-antonio-pickleball-court",
  ],
  faqTitle: "Tennis court construction questions",
  faqs: TENNIS_FAQS,
  relatedLinks: [
    { href: "/blog/court-construction-costs", label: "what drives court construction costs" },
    { href: "/blog/tennis-court-dimensions", label: "tennis court dimensions" },
  ],
  contactHeading: "Get a free tennis court quote",
};
