interface CalloutBoxProps {
  title: string;
  children: React.ReactNode;
}

export function CalloutBox({ title, children }: CalloutBoxProps) {
  return (
    <div className="my-8 p-6 bg-blue-50 border border-gray-200 border-l-brand-blue border-l-[3px] rounded-r-xl">
      <h4 className="text-sm font-bold text-brand-blue mb-3">{title}</h4>
      <div className="text-sm text-brand-text-muted leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}
