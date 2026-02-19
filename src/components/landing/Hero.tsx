"use client";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto,w_1600/v1769365125/DJI_0054_rgzy6p.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dwyd4f7lz/video/upload/q_auto/Website_Video_gnp5ib.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl leading-[1.1]">
          Courts that play as good as they look.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80 font-light max-w-2xl">
          Premium pickleball &amp; tennis court resurfacing across Greater Austin.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-flex items-center px-8 py-4 rounded-lg bg-brand-blue text-white text-base font-semibold hover:bg-brand-blue/90 transition-colors shadow-lg"
        >
          Get a Free Estimate
        </a>
      </div>
    </section>
  );
}
