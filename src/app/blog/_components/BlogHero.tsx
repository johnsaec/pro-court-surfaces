interface BlogHeroProps {
  category: string;
  date: string;
  readTime: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}

export function BlogHero({
  category,
  date,
  readTime,
  title,
  titleAccent,
  subtitle,
}: BlogHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-gray-200 bg-brand-bg-alt pt-32 pb-12 px-6 md:px-12">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-brand-blue/5 to-transparent" />
      <div className="relative max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-4">
          {category}
        </p>
        <div className="flex items-center gap-4 text-sm text-brand-text-muted mb-6">
          <span>Pro Court Surfaces</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-6">
          {title} <em className="text-brand-blue italic">{titleAccent}</em>
        </h1>
        <p className="text-lg text-brand-text-muted leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
