import type { CourtBuildContent } from "@/components/landing/CourtBuildSections";

// Shared copy for /pickleball-court-construction (Google Ads new-build ad
// group + organic page). Rendered on-page and in JSON-LD, so the FAQ schema
// always matches what visitors see. No prices by policy: every CTA is a free quote.

export const CONSTRUCTION_PROJECT_TYPE = "new_court_full_build";

export const BUILD_OPTIONS = [
  {
    title: "Full court build",
    body: "Starting from bare ground. We help plan size, orientation, and drainage, and deliver a finished court with a pro-grade acrylic surface, your colors, and regulation lines.",
    projectType: "new_court_full_build",
    message: "Interested in: full pickleball court build",
  },
  {
    title: "Surfacing on a new slab",
    body: "Already poured, or working with your own concrete contractor or builder? We apply the complete acrylic sport surface system, colors, and lines on your new slab.",
    projectType: "new_court_surfacing_only",
    message: "Interested in: surfacing a new concrete slab",
  },
];

export const BUILD_STEPS = [
  {
    title: "Plan the court",
    body: "Court size, north-south orientation, drainage, and how many courts fit your space.",
  },
  {
    title: "Slab & prep",
    body: "A properly sloped concrete slab, fully cured and prepped so the surface bonds for the long term.",
  },
  {
    title: "Acrylic surface system",
    body: "Resurfacer and color coats built for Texas heat and UV, with optional cushion layers for comfort.",
  },
  {
    title: "Your colors",
    body: "Custom court, border, and contrasting kitchen (NVZ) colors. See the design before we start.",
  },
  {
    title: "Regulation lines",
    body: "Precision-measured pickleball lines, plus basketball or tennis lines for a multi-sport court.",
  },
];

export const FEATURED_PROJECT_SLUGS = [
  "lake-austin-rooftop-pickleball-court",
  "san-antonio-pickleball-court",
  "georgetown-multi-sport-court",
  "austin-backyard-basketball-court",
];

export const CONSTRUCTION_FAQS = [
  {
    question: "How much does it cost to build a pickleball court?",
    answer:
      "It depends on whether you need a full build or surfacing on an existing slab, the court size, site work and drainage, cushion layers, and how many colors you want. We give free on-site quotes: Patrick walks the site with you and you get a detailed written quote within 48 hours.",
  },
  {
    question: "How much space do I need for a backyard pickleball court?",
    answer:
      "A regulation pickleball court is 20 by 44 feet. With room to move around it, the recommended total playing area is about 30 by 60 feet, and a smaller footprint can still work for a backyard court. We'll help you fit the best layout to your space.",
  },
  {
    question: "Can you surface a slab my builder or concrete contractor poured?",
    answer:
      "Yes. We regularly apply the sport surface on slabs poured by homeowners' builders and concrete contractors. New concrete needs to cure fully before coating, and we'll check the slope and surface before we start.",
  },
  {
    question: "How long does it take to build a pickleball court?",
    answer:
      "Surfacing a cured slab usually takes about a week, depending on weather. A full build takes longer because new concrete has to cure before it can be coated. Your quote includes a specific timeline.",
  },
  {
    question: "Can I add basketball or tennis lines to my pickleball court?",
    answer:
      "Yes. Many backyard courts are multi-sport, with pickleball and basketball lines in contrasting colors on the same surface.",
  },
  {
    question: "Do you build courts for HOAs, clubs, and communities?",
    answer:
      "Yes. We build single backyard courts and multi-court facilities for HOAs, clubs, apartment communities, and builders across Central Texas.",
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

export const PICKLEBALL_BUILD_CONTENT: CourtBuildContent = {
  pagePath: "/pickleball-court-construction",
  formName: "pickleball_construction_contact",
  defaultProjectType: CONSTRUCTION_PROJECT_TYPE,
  hero: {
    titleLead: "Pickleball court",
    titleAccent: "construction.",
    body: "New backyard, HOA, and club pickleball courts, from planning the layout to the final lines. Patrick walks your site with you and sends a detailed written quote within 48 hours, free.",
    image: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1762354561/3_color_straight_h4nhiw.heic",
      alt: "New three-color pickleball court with crisp regulation lines",
    },
  },
  options: BUILD_OPTIONS,
  stepsTitle: "How is a pickleball court built?",
  steps: BUILD_STEPS,
  stepsImage: {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1759801129/IMG_0037_xclgpd.jpg",
    alt: "New concrete slab being prepared for an acrylic sport surface",
  },
  featuredProjectSlugs: FEATURED_PROJECT_SLUGS,
  faqTitle: "Pickleball court construction questions",
  faqs: CONSTRUCTION_FAQS,
  relatedLinks: [
    { href: "/blog/backyard-pickleball-court", label: "our backyard pickleball court guide" },
    { href: "/blog/pickleball-court-dimensions", label: "pickleball court dimensions" },
  ],
  contactHeading: "Get a free pickleball court quote",
};
