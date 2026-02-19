import Image from "next/image";

const projects = [
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1769365125/DJI_0054_rgzy6p.jpg",
    alt: "Aerial view of two resurfaced tennis courts with blue and green acrylic surface at Yoakum City Park in Texas",
    caption: "City Park — Yoakum, TX",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1769365087/DJI_0061_kcgxtd.jpg",
    alt: "Close-up aerial view of freshly resurfaced tennis court with crisp white lines and green playing surface",
    caption: "City Park — Yoakum, TX",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759802070/DJI_20250917112353_0396_D_2_v1nhyi.jpg",
    alt: "Aerial drone shot of completed residential tennis court resurfacing with custom blue and green color design",
    caption: "Residential Court",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801933/FNGP5107_cdnnzj.jpg",
    alt: "Ground-level view of professional court resurfacing with vibrant acrylic colors and clean line striping",
    caption: "Residential Court",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354989/3_color_straight_1_dtxi5n.heic",
    alt: "Three-color custom court resurfacing with professional pickleball lines in Wimberley Texas",
    caption: "Residential Court — Wimberley, TX",
  },
  {
    src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762309892/2_color_front_j6zp5s.heic",
    alt: "Two-color residential backyard court resurfacing with blue and green custom design in Wimberley Texas",
    caption: "Residential Court — Wimberley, TX",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" aria-label="Project portfolio" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] text-center">
          Our Work
        </h2>
        <p className="mt-4 text-center text-[#1A1A1A]/60 max-w-xl mx-auto">
          Every court tells a story. Here are some of our favorites.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, i) => (
            <div key={i} className="group overflow-hidden rounded-xl shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-4 py-3 bg-white">
                <p className="text-sm text-[#1A1A1A]/50 font-medium">{project.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
