import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo + info */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <Image
              src="https://res.cloudinary.com/dwyd4f7lz/image/upload/f_auto,q_auto/v1767487552/pro_court_logo_white_no_bg_2_ludutv.png"
              alt="Pro Court Surfaces logo"
              width={140}
              height={35}
              className="h-8 w-auto"
            />
            <p className="text-sm">Austin, TX</p>
            <div className="flex gap-4 text-sm">
              <a href="tel:+15125551234" className="hover:text-white transition-colors">
                (512) 555-1234
              </a>
              <span className="text-white/30">|</span>
              <a href="mailto:patrick@procourtsurfaces.com" className="hover:text-white transition-colors">
                patrick@procourtsurfaces.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/commercial" className="hover:text-white transition-colors">
              For General Contractors
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          &copy; 2026 Pro Court Surfaces. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
