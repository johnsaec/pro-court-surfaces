interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="p-5 rounded-xl border border-green-200 bg-green-50">
        <h4 className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">
          Pros
        </h4>
        <ul className="space-y-2">
          {pros.map((item) => (
            <li
              key={item}
              className="text-sm text-brand-text-muted leading-relaxed pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 rounded-xl border border-red-200 bg-red-50">
        <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
          Cons
        </h4>
        <ul className="space-y-2">
          {cons.map((item) => (
            <li
              key={item}
              className="text-sm text-brand-text-muted leading-relaxed pl-5 relative before:content-['✗'] before:absolute before:left-0 before:text-red-600 before:font-bold"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
