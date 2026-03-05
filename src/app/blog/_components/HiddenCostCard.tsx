interface HiddenCostCardProps {
  costLabel: string;
  title: string;
  description: string;
}

export function HiddenCostCard({
  costLabel,
  title,
  description,
}: HiddenCostCardProps) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 overflow-hidden hover:border-gray-300 transition-all">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-red-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
      <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
        {costLabel}
      </p>
      <h4 className="text-sm font-semibold text-brand-text mb-2">{title}</h4>
      <p className="text-sm text-brand-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
