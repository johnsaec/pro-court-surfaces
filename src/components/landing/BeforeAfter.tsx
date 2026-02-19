import Image from "next/image";

const transformations = [
  {
    id: "lakeside",
    before: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759801129/IMG_0037_xclgpd.jpg",
      alt: "Before photo showing cracked and faded tennis court surface needing resurfacing",
    },
    after: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1759800811/DJI_20250917112633_0423_D_kiqa0u.jpg",
      alt: "Aerial view of beautifully resurfaced tennis court with vibrant blue and green colors",
    },
    label: "Residential Tennis Court",
  },
  {
    id: "wimberley2",
    before: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354899/before_2_dyksr6.heic",
      alt: "Before photo of worn residential court surface before resurfacing",
    },
    after: {
      src: "https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_800/v1762354561/3_color_straight_h4nhiw.heic",
      alt: "After photo of stunning three-color custom court resurfacing with professional lines",
    },
    label: "Three-Color Custom Design",
  },
];

export function BeforeAfter() {
  return (
    <section id="before-after" aria-label="Before and after project showcase" className="py-24 sm:py-32 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] text-center">
          See the Difference
        </h2>
        <p className="mt-4 text-center text-[#1A1A1A]/60 max-w-xl mx-auto">
          Real projects. Real transformations. No stock photos.
        </p>

        <div className="mt-16 space-y-20">
          {transformations.map((project) => (
            <article key={project.id} className="space-y-4">
              <h3 className="text-lg font-semibold text-[#1A1A1A] text-center">
                {project.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Before
                  </div>
                  <Image
                    src={project.before.src}
                    alt={project.before.alt}
                    width={800}
                    height={600}
                    className="rounded-xl w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    After
                  </div>
                  <Image
                    src={project.after.src}
                    alt={project.after.alt}
                    width={800}
                    height={600}
                    className="rounded-xl w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
