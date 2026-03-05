import Link from "next/link";

interface BlogCTAProps {
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
}

export function BlogCTA({
  title,
  description,
  buttonText = "Request a Bid",
  href = "/#contact",
}: BlogCTAProps) {
  return (
    <div className="relative my-12 p-8 md:p-12 bg-brand-navy border border-brand-navy rounded-xl text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {title}
        </h2>
        <p className="text-white/50 max-w-md mx-auto mb-6">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
