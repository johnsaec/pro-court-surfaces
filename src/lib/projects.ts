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
        src: `${CL}/f_auto,q_auto,w_1000/v1786907451/wimberly_grinding_rdoqa3.jpg`,
        alt: "Grinding off the old failing surface down to the concrete before resurfacing in Wimberley, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786902350/wimbrerly_primer_wje8rw.jpg`,
        alt: "Crew member applying the primer coat during the court resurfacing in Wimberley, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907451/wimberly_black_cueoxt.jpg`,
        alt: "Black acrylic base coat applied over the prepped court in Wimberley, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907452/wimberly_green_only_agjtfx.jpg`,
        alt: "Green acrylic color coat going down on the resurfaced court in Wimberley, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907452/wimbnerly_blue_guys_painting_under_fence_x5dnqv.jpg`,
        alt: "Crew applying the blue color coat and cutting in along the fence in Wimberley, Texas",
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
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907383/geoergowtn_grind_cropped_ryallr.png`,
        alt: "Grinding and profiling the fresh concrete slab before surfacing in Georgetown, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907198/georgetown_primer_done_kpqmk5.jpg`,
        alt: "Slab after crack prep and primer coat, ready for the base coat, in Georgetown, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907199/georgorwtown_black_side_angle_uz73yk.jpg`,
        alt: "Black acrylic base coat applied over the prepped slab in Georgetown, Texas",
      },
    ],
    body: [
      "The homeowner had a fresh concrete slab poured and ready — a blank canvas in the Hill Country backyard. We took it from bare gray concrete to a full acrylic sport surface.",
      "The finished layout combines a blue-and-gold basketball court with pickleball striping, wrapped in a gray border — built to hold up to Texas sun and daily play.",
    ],
  },
  {
    slug: "san-antonio-pickleball-court",
    name: "San Antonio Pickleball Court",
    location: "San Antonio, TX",
    courtType: "Pickleball Court",
    service: "New Surface Application",
    category: "New Court Surface",
    summary:
      "A fresh slab on a rural San Antonio property surfaced into a tournament-blue pickleball court.",
    metaTitle:
      "New Pickleball Court Surface in San Antonio, TX | Pro Court Surfaces",
    metaDescription:
      "Case study: new acrylic pickleball court surface on a fresh concrete slab near San Antonio, TX. Tournament-blue playing surface with a gray surround and crisp striping.",
    keywords:
      "new pickleball court San Antonio TX, pickleball court installation San Antonio, pickleball court surfacing, acrylic court surface San Antonio, backyard pickleball court Texas",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1786904827/san_antonio_done_crlmsk.jpg`,
      alt: "Finished blue and gray pickleball court on a rural property near San Antonio, Texas",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786904828/san_antonnio_before_xjwjv2.jpg`,
      alt: "Primed blank concrete slab before pickleball court surfacing near San Antonio, Texas",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786904827/san_antonio_done_crlmsk.jpg`,
      alt: "Finished tournament-blue pickleball court with gray surround and white striping near San Antonio, Texas",
    },
    facts: [
      { label: "Location", value: "San Antonio, TX" },
      { label: "Court type", value: "Pickleball" },
      { label: "Scope", value: "New surface application" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
      { label: "Timeline", value: "3–5 working days" },
    ],
    colors: ["Tournament Blue", "Gray", "White lines"],
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786904828/san_antonio_progress_grinding_g4bkvk.jpg`,
        alt: "Crew grinding and prepping the concrete slab before pickleball court surfacing near San Antonio, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907097/SA_crack_remediation_with_wood_scrooge_mop3xh.jpg`,
        alt: "Leveling a low spot in the concrete slab with patching compound and a screed board near San Antonio, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907096/SA_low_spot_fill_black_over_zwwg9i.jpg`,
        alt: "Repaired low spots sealed with black coating on the pickleball court slab near San Antonio, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907097/SA_primer_complete_bdyhb4.jpg`,
        alt: "Concrete slab after the primer coat, ready for color, near San Antonio, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907096/SA_grey_only_dgfrvs.jpg`,
        alt: "Gray acrylic base coat applied to the pickleball court near San Antonio, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907493/sa_colors_lines_set_out_in_tape_but_not_done_jjueuq.jpg`,
        alt: "Pickleball court lines masked out in tape over the blue and gray surface before striping near San Antonio, Texas",
      },
    ],
    body: [
      "Out on a rural San Antonio property, the owner had a fresh slab ready for play. We ground and prepped the concrete, filled the low spots, then built up the full acrylic surface.",
      "The result is a clean tournament-blue pickleball court with a gray surround and crisp white lines — a regulation surface in the middle of Texas ranch country.",
    ],
  },
  {
    slug: "richardson-pickleball-conversion",
    name: "Richardson Tennis-to-Pickleball Conversion",
    location: "Richardson, TX",
    courtType: "Pickleball Conversion",
    service: "Tennis-to-Pickleball Conversion",
    category: "Court Conversion",
    summary:
      "A weathered apartment tennis court resurfaced and re-striped into a fresh multi-court pickleball complex.",
    metaTitle:
      "Tennis-to-Pickleball Court Conversion in Richardson, TX | Pro Court Surfaces",
    metaDescription:
      "Case study: converting a worn tennis court into dedicated pickleball courts in Richardson, TX. Full resurface, new green-and-blue color zones, and precision striping.",
    keywords:
      "tennis to pickleball conversion Richardson TX, pickleball court conversion, tennis court resurfacing Richardson, apartment pickleball courts, multi-court pickleball striping Texas",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1786902349/richardson_drone_finished_bht0ue.jpg`,
      alt: "Aerial drone view of a finished green and blue pickleball court conversion with crisp white lines in Richardson, Texas",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786902350/richardson_before_side_f8mt9l.jpg`,
      alt: "Weathered red and blue tennis court with a faded, worn surface before conversion in Richardson, Texas",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786902349/richardson_drone_finished_bht0ue.jpg`,
      alt: "Finished green and blue pickleball courts converted from a tennis court with fresh white striping in Richardson, Texas",
    },
    facts: [
      { label: "Location", value: "Richardson, TX" },
      { label: "Court type", value: "Tennis → pickleball" },
      { label: "Scope", value: "Conversion + full resurface" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
      { label: "Timeline", value: "5–7 working days" },
    ],
    colors: ["Green", "Blue", "White lines"],
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907877/richardson_line_cracks_aieeng.jpg`,
        alt: "The old tennis court resurfaced with a fresh gray base coat, prepped for new color zones, in Richardson, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907878/richardons_colors_lines_fkw3ke.jpg`,
        alt: "Green surround and blue pickleball color zones laid down over the resurfaced court before final striping in Richardson, Texas",
      },
    ],
    body: [
      "This community tennis court had weathered years of play and Texas sun. Rather than a like-for-like resurface, the owner wanted more usable play — so we converted it into dedicated pickleball courts.",
      "We resurfaced the full slab, laid down fresh green-and-blue color zones, and striped multiple regulation pickleball courts — turning one tired tennis court into a busy pickleball complex.",
    ],
  },
  {
    slug: "austin-backyard-basketball-court",
    name: "Austin Backyard Basketball Court",
    location: "Austin, TX",
    courtType: "Backyard Basketball",
    service: "New Surface Application",
    category: "New Court Surface",
    summary:
      "A poolside concrete pad in an Austin backyard finished into a sharp blue-and-gray half-court.",
    metaTitle:
      "New Backyard Basketball Court Surface in Austin, TX | Pro Court Surfaces",
    metaDescription:
      "Case study: new acrylic basketball court surface on a poolside concrete pad in Austin, TX. Custom blue-and-gray half-court with crisp striping and a key.",
    keywords:
      "backyard basketball court Austin TX, basketball court surfacing Austin, new sport court surface Austin, poolside basketball court, acrylic basketball court Texas",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1786902349/wahill_finished_side_vr6qqs.jpg`,
      alt: "Finished blue and gray backyard basketball court next to a pool with a stone and wood fence in Austin, Texas",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786905575/wahill_before_dbifri.jpg`,
      alt: "Bare concrete pad in a stone-and-wood-fenced backyard before basketball court surfacing in Austin, Texas",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1786902349/wahill_finished_side_vr6qqs.jpg`,
      alt: "Finished blue and gray backyard basketball half-court with fresh white striping beside a pool in Austin, Texas",
    },
    facts: [
      { label: "Location", value: "Austin, TX" },
      { label: "Court type", value: "Backyard basketball" },
      { label: "Scope", value: "New surface application" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
      { label: "Timeline", value: "3–5 working days" },
    ],
    colors: ["Blue", "Gray", "White lines"],
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1786907596/wahill_colors_no_lines_buhg9x.jpg`,
        alt: "Blue key color coat going down over the gray backyard basketball court before striping in Austin, Texas",
      },
    ],
    body: [
      "The homeowner had a poolside concrete pad and a hoop already standing — everything but a real playing surface. We took the bare gray pad and turned it into a finished acrylic basketball court.",
      "A blue key on a gray surround with crisp white striping ties it into the backyard's stone-and-wood aesthetic — a clean half-court steps from the pool.",
    ],
  },
  {
    slug: "lake-austin-rooftop-pickleball-court",
    name: "Lake Austin Rooftop Pickleball Court",
    location: "Austin, TX",
    courtType: "Pickleball Court",
    service: "New Surface Application",
    category: "Rooftop Pickleball Court",
    summary:
      "A bare concrete roof deck on Lake Austin turned into a two-tone blue pickleball court with a green surround and a view of the water.",
    metaTitle:
      "Rooftop Pickleball Court on Lake Austin | Pro Court Surfaces",
    metaDescription:
      "Case study: new acrylic pickleball court surface on a concrete roof deck overlooking Lake Austin in Austin, TX. Navy playing boxes, light blue kitchen, green surround and crisp white striping.",
    keywords:
      "rooftop pickleball court Austin, roof deck pickleball court, pickleball court Lake Austin, waterfront pickleball court Austin TX, pickleball court surfacing Austin, acrylic pickleball court Texas",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1790213490/IMG_5067_xxv8d7.jpg`,
      alt: "Finished navy and light blue rooftop pickleball court with a green surround and glass railing overlooking Lake Austin in Austin, Texas",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1790213594/IMG_4958_irsw3g.jpg`,
      alt: "Bare concrete roof deck with glass railing overlooking Lake Austin before pickleball court surfacing in Austin, Texas",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1790213490/IMG_5062_ipj9ch.jpg`,
      alt: "Finished rooftop pickleball court with navy playing boxes, light blue kitchen and white lines on Lake Austin, Texas",
    },
    facts: [
      { label: "Location", value: "Lake Austin — Austin, TX" },
      { label: "Court type", value: "Rooftop pickleball" },
      { label: "Scope", value: "New surface application" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
      { label: "Timeline", value: "3–5 working days" },
    ],
    colors: ["Navy Blue", "Light Blue", "Green", "White lines"],
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790213558/80991556873__A4E967AB-A24D-449A-BEC5-F92E177D194D_h7jjt3.jpg`,
        alt: "Black acrylic base coat with the first blue color coat going down on the rooftop court deck on Lake Austin, Texas",
      },
      {
        src: `${CL}/c_crop,g_north,h_0.77,w_1.0/f_auto,q_auto,w_1000/v1790213557/80997372794__30627A91-2C25-4503-B2C2-D1D80C29C795_lfntxq.jpg`,
        alt: "Navy, light blue and green color coats down on the rooftop pickleball court before striping on Lake Austin, Texas",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790213489/IMG_5048_xvkfyh.jpg`,
        alt: "Finished rooftop pickleball court with a covered pavilion and Lake Austin hills in the background in Austin, Texas",
      },
    ],
    body: [
      "A bare concrete roof deck above Lake Austin, already wrapped in glass railing and court lighting — a one-of-a-kind spot for a court. We took the raw slab and built it up with a full acrylic system, starting from a black base coat.",
      "Navy playing boxes, a light blue kitchen and a green surround with crisp white striping give the homeowner a tournament-look pickleball court on the roof, with the lake on every side.",
    ],
  },
  {
    slug: "sumner-backyard-pickleball-court",
    name: "Sumner Backyard Pickleball Court",
    location: "Sumner, WA",
    courtType: "Pickleball Court",
    service: "New Surface Application",
    category: "Pickleball Court Surface",
    summary:
      "A bare concrete backyard court with painted-on lines turned into a slate-and-gray acrylic pickleball court in Sumner, Washington.",
    metaTitle:
      "Backyard Pickleball Court Surfacing in Sumner, WA | Pro Court Surfaces",
    metaDescription:
      "Case study: first acrylic court surface on an existing bare concrete pickleball court in Sumner, WA. Resurfacer plus two color coats, slate playing boxes, gray surround and crisp white striping.",
    keywords:
      "pickleball court surfacing Sumner WA, backyard pickleball court Washington, concrete pickleball court coating, acrylic pickleball court surface, pickleball court resurfacing Pacific Northwest",
    hero: {
      src: `${CL}/f_auto,q_auto,w_1600/v1790214785/unnamed_43_ypxra8.jpg`,
      alt: "Finished slate and gray backyard pickleball court with white lines and a covered pavilion in Sumner, Washington",
    },
    before: {
      src: `${CL}/f_auto,q_auto,w_1000/v1790214084/unnamed_41_rxa8ea.jpg`,
      alt: "Bare concrete backyard pickleball court with painted-on black lines and a net before surfacing in Sumner, Washington",
    },
    after: {
      src: `${CL}/f_auto,q_auto,w_1000/v1790214785/unnamed_43_ypxra8.jpg`,
      alt: "Finished slate playing boxes with gray kitchen and surround and crisp white striping on a backyard pickleball court in Sumner, Washington",
    },
    facts: [
      { label: "Location", value: "Sumner, WA" },
      { label: "Court type", value: "Backyard pickleball" },
      { label: "Court size", value: "25' × 55'" },
      { label: "Scope", value: "Resurfacer + 2 color coats" },
      { label: "Surface", value: "ATS Sports Acrytech acrylic" },
    ],
    colors: ["Slate", "Gray", "White lines"],
    gallery: [
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214102/unnamed_42_jcbcxc.jpg`,
        alt: "Close-up of a painted line on rough bare concrete before surfacing in Sumner, Washington",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214238/IMG_4782_auwxis.jpg`,
        alt: "Concrete court slab pressure-washed and cleaned before surfacing in Sumner, Washington",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214235/IMG_4784_1_siqawv.jpg`,
        alt: "Old painted lines and slab joints filled and patched before the base coat in Sumner, Washington",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214240/IMG_4785_1_hvu1wj.jpg`,
        alt: "Black acrylic resurfacer coat applied across the full concrete court in Sumner, Washington",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214240/IMG_4786_1_dbfpiu.jpg`,
        alt: "Gray acrylic color coat applied over the full pickleball court in Sumner, Washington",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214239/IMG_4789_rxlgxt.jpg`,
        alt: "Slate playing boxes applied inside the gray surround on the pickleball court in Sumner, Washington",
      },
      {
        src: `${CL}/f_auto,q_auto,w_1000/v1790214238/IMG_4791_1_cvyfcg.jpg`,
        alt: "Crew taping and painting crisp white pickleball lines on the slate and gray court in Sumner, Washington",
      },
    ],
    body: [
      "The homeowner had a concrete slab in the backyard with pickleball lines simply painted on — playable, but rough, stained and slick when wet. We cleaned the slab, filled the old painted lines and joints, and built a real acrylic court surface over it.",
      "One coat of resurfacer and two color coats later, the court has slate playing boxes, a gray kitchen and surround, and crisp taped-and-painted white lines — a proper pickleball surface built for Pacific Northwest weather.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
