// Shared copy for /court-services — rendered on-page and in JSON-LD, so the
// FAQ schema always matches what visitors see. No prices by policy: every
// section drives to a free on-site quote.

export type CourtService = {
  id: string;
  eyebrow: string;
  title: string;
  answer: string;
  includes: string[];
  goodFit: string;
  projectType: string;
  formMessage?: string;
  image: { src: string; alt: string };
};

export const COURT_SERVICES: CourtService[] = [
  {
    id: "resurfacing",
    eyebrow: "Resurfacing",
    title: "Court resurfacing",
    answer:
      "Court resurfacing restores a cracked, faded, or slick tennis or pickleball court with a new acrylic sport surface. We repair cracks and low spots, apply fresh color coats engineered for Texas heat and UV, and restripe the lines — so the court looks and plays like new.",
    includes: [
      "Pressure wash and surface prep",
      "Crack repair and low-spot (birdbath) patching",
      "Acrylic resurfacer and color coats",
      "Custom colors for court, border, and kitchen",
      "Fresh tennis, pickleball, or multi-sport lines",
    ],
    goodFit:
      "Faded color, cracks, worn or slick spots, or lines you can barely see.",
    projectType: "repair_resurfacing",
    image: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg",
      alt: "Aerial view of a freshly resurfaced tennis court in blue and green",
    },
  },
  {
    id: "conversion",
    eyebrow: "Conversions",
    title: "Tennis to pickleball conversion",
    answer:
      "A standard tennis court fits up to four pickleball courts. We convert tennis courts to dedicated pickleball — or add pickleball lines alongside tennis for a shared court — including surface prep, new colors, and professional line layout.",
    includes: [
      "Layout options: dedicated pickleball or shared tennis + pickleball",
      "Up to four pickleball courts on one tennis court",
      "Surface prep and crack repair",
      "New color scheme, including contrasting kitchen (NVZ) zones",
      "Precision-measured pickleball striping",
    ],
    goodFit:
      "Underused tennis courts, HOAs and clubs with pickleball demand, or homeowners who play more pickleball than tennis.",
    projectType: "conversion_tennis_to_pickleball",
    image: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1762354561/3_color_straight_h4nhiw.heic",
      alt: "Three-color court with crisp pickleball lines after conversion",
    },
  },
  {
    id: "cleaning",
    eyebrow: "Cleaning",
    title: "Court cleaning",
    answer:
      "Dirt, mildew, algae, and leaf stains make a court slick and dull its color. Professional court cleaning removes the buildup without damaging the acrylic surface — restoring grip and color, and extending the life of your surface between resurfacings.",
    includes: [
      "Surface-safe pressure washing",
      "Mildew, algae, and stain treatment",
      "Debris and leaf-stain removal",
      "Condition check — we flag cracks or wear early",
    ],
    goodFit:
      "Courts in good shape that look dirty, feel slippery, or sit under trees.",
    projectType: "other",
    formMessage: "Interested in: court cleaning",
    image: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1769365125/DJI_0054_rgzy6p.jpg",
      alt: "Aerial view of clean, bright tennis courts in Central Texas",
    },
  },
  {
    id: "installation",
    eyebrow: "New courts",
    title: "New court installation",
    answer:
      "We build new pickleball, tennis, and multi-sport courts — from a full build to surfacing only on a slab that's already poured. Every new court gets a professional-grade acrylic surface system, custom colors, and regulation lines.",
    includes: [
      "Full builds or surfacing-only on new concrete",
      "Pickleball, tennis, basketball, and multi-sport layouts",
      "Custom color design — see it before we start",
      "Regulation line striping",
      "Guidance on court size, orientation, and drainage",
    ],
    goodFit:
      "Homeowners adding a backyard court, communities and clubs adding courts, or a new slab that needs a playing surface.",
    projectType: "new_court_full_build",
    image: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1000/v1759801129/IMG_0037_xclgpd.jpg",
      alt: "Court surface being prepared for a new acrylic sport surface",
    },
  },
];

export const COURT_SERVICES_FAQS = [
  {
    question: "How much does court resurfacing cost?",
    answer:
      "Every court is different — price depends on court size, current condition, crack and drainage repairs, and how many colors you want. We give free on-site quotes: Patrick walks the court with you and you get a detailed written quote within 48 hours.",
  },
  {
    question: "How long does court resurfacing take?",
    answer:
      "Most resurfacing projects take 3 to 5 working days, depending on weather and scope. Your quote includes a specific timeline.",
  },
  {
    question: "How do I know if my court needs resurfacing or just cleaning?",
    answer:
      "If the surface is intact but dirty, slick, or stained, cleaning is usually enough. If you see cracks, faded or worn-through color, or peeling, it's time to resurface. We'll tell you honestly which one you need during the free on-site visit.",
  },
  {
    question: "Can I keep tennis and add pickleball lines?",
    answer:
      "Yes. We can add pickleball lines in a contrasting color to a tennis court so it works for both sports, or fully convert the court to up to four dedicated pickleball courts.",
  },
  {
    question: "Do you build new courts from scratch?",
    answer:
      "Yes. We handle full new court builds as well as surfacing-only on a newly poured slab. We'll help you plan size, layout, and orientation before any work starts.",
  },
  {
    question: "Is your work warrantied?",
    answer:
      "Yes. Every job comes with a written warranty, and the exact terms are spelled out in your quote before you sign.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Greater Austin and Central Texas — including Round Rock, Cedar Park, Georgetown, Dripping Springs, Wimberley, San Marcos, Kyle, Buda, Lakeway, Bee Cave, New Braunfels, and San Antonio.",
  },
];
