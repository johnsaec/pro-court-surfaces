// Portfolio project case studies.
// Adding a new project = append one object here. The /projects index and
// /projects/[slug] detail page are both data-driven off this array.

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  /** Short name for cards + breadcrumbs, e.g. "Wimberley Multi-Sport Court" */
  name: string;
  /** City, State */
  location: string;
  /** e.g. "Multi-Sport Court", "Pickleball Conversion", "Backyard Basketball" */
  courtType: string;
  /** Scope of work label, e.g. "Full Resurface", "Tennis-to-Pickleball Conversion" */
  service: string;
  /** Card + hero eyebrow */
  category: string;
  /** One-line summary used on the index card and page subtitle */
  summary: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  /** Hero / card image (the money shot) */
  hero: ProjectImage;
  /** Before + after pair */
  before: ProjectImage;
  after: ProjectImage;
  /** Optional process/gallery shots */
  gallery?: ProjectImage[];
  /** Quick-facts shown in the sidebar; keep 3-6 rows */
  facts: { label: string; value: string }[];
  /** Colors used, shown as chips (optional) */
  colors?: string[];
  /** The story — array of paragraphs */
  body: string[];
  /** Optional client quote */
  testimonial?: { quote: string; attribution: string };
}

const CL = "https://res.cloudinary.com/dwyd4f7lz/image/upload";

export const projects: Project[] = [
  {
    slug: "wimberley-multi-sport-court",
    name: "Wimberley Multi-Sport Court",
    location: "Wimberley, TX",
    courtType: "Multi-Sport Court",
    service: "Full Resurface",
    category: "Multi-Sport Resurface",
    summary:
      "A worn, tiled Hill Country sport court stripped and rebuilt into a crisp blue-and-green acrylic basketball court.",
    metaTitle:
      "Multi-Sport Court Resurfacing in Wimberley, TX | Pro Court Surfaces",
    metaDescription:
      "Case study: full resurface of a worn multi-sport court in Wimberley, TX. Old tile removed, new acrylic base and color coats, custom blue and green finish with fresh striping.",
    keywords:
      "sport court resurfacing Wimberley TX, multi-sport court resurfacing, basketball court resurfacing Wimberley, Hill Country court surfacing, acrylic court resurfacing Central Texas",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1786902350/wimberly_finishe_end_srsnsg.jpg`,
      alt: "Finished blue and green multi-sport basketball court with fresh white striping in Wimberley, Texas",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786902349/wimberly_before_llpwkk.jpg`,
      alt: "Before photo of a worn, faded multi-sport tile court with cracked teal and maroon surface in Wimberley, Texas",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786902350/wimberly_finishe_end_srsnsg.jpg`,
      alt: "After photo of a freshly resurfaced blue and green multi-sport basketball court with crisp white lines in Wimberley, Texas",
    },
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786902350/wimbrerly_primer_wje8rw.jpg`,
        alt: "Crew member applying primer coat during a court resurfacing project in Wimberley, Texas",
      },
    ],
    facts: [
      { label: "Location", value: "Wimberley, TX" },
      { label: "Court type", value: "Multi-sport (basketball)" },
      { label: "Scope", value: "Full resurface" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
      { label: "Timeline", value: "3–5 working days" },
    ],
    colors: ["Blue", "Green", "White lines"],
    body: [
      "An aging modular-tile sport court, faded and lifting at the seams after years of Texas sun. We stripped the failing surface, primed the concrete, and rebuilt it with a full acrylic system.",
      "The result: a clean two-tone blue-and-green court with crisp white striping — done inside a typical 3–5 day window.",
    ],
  },
  {
    slug: "georgetown-multi-sport-court",
    name: "Georgetown Multi-Sport Court",
    location: "Georgetown, TX",
    courtType: "Multi-Sport Court",
    service: "New Surface Application",
    category: "New Court Surface",
    summary:
      "A fresh concrete slab in the Georgetown backyard turned into a blue-and-gold basketball and pickleball court.",
    metaTitle:
      "New Multi-Sport Court Surface in Georgetown, TX | Pro Court Surfaces",
    metaDescription:
      "Case study: new acrylic court surface on a fresh concrete slab in Georgetown, TX. Custom blue and gold basketball and pickleball court with crisp striping.",
    keywords:
      "new court surface Georgetown TX, backyard basketball court Georgetown, pickleball court installation Georgetown, multi-sport court surfacing Central Texas, acrylic court surface Georgetown",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1786904727/georgtown_drone_finoshed_rycfv7.jpg`,
      alt: "Aerial view of a finished blue and gold backyard basketball and pickleball court in Georgetown, Texas",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786904727/georgetown_jgf0kx.jpg`,
      alt: "Bare fresh concrete slab in a wooded backyard before court surfacing in Georgetown, Texas",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786904727/georgtown_finished_courtside_fztqrn.jpg`,
      alt: "Finished blue and gold multi-sport basketball and pickleball court with fresh white striping in Georgetown, Texas",
    },
    facts: [
      { label: "Location", value: "Georgetown, TX" },
      { label: "Court type", value: "Basketball + pickleball" },
      { label: "Scope", value: "New surface application" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
      { label: "Timeline", value: "3–5 working days" },
    ],
    colors: ["Blue", "Gold", "Gray", "White lines"],
    body: [
      "The homeowner had a fresh concrete slab poured and ready — a blank canvas in the Hill Country backyard. We took it from bare gray concrete to a full acrylic sport surface.",
      "The finished layout combines a blue-and-gold basketball court with pickleball striping, wrapped in a gray border — built to hold up to Texas sun and daily play.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
