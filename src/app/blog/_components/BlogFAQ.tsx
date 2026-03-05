interface FAQItem {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  items: FAQItem[];
}

export function BlogFAQ({ items }: BlogFAQProps) {
  return (
    <div className="mt-10">
      {items.map((item) => (
        <div
          key={item.question}
          className="border-b border-gray-200 py-5"
        >
          <h3 className="text-base font-semibold text-brand-text mb-2">
            {item.question}
          </h3>
          <p className="text-sm text-brand-text-muted leading-relaxed">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
