interface CostTableRow {
  label: string;
  value: string;
}

interface CostTableProps {
  title: string;
  headers: [string, string];
  rows: CostTableRow[];
  footer?: CostTableRow;
}

export function CostTable({ title, headers, rows, footer }: CostTableProps) {
  return (
    <div className="my-8 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-bg-alt border-b border-gray-200">
        {title}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-brand-bg-alt">
            <th className="px-5 py-3 text-left text-[0.7rem] font-bold uppercase tracking-widest text-brand-text-muted border-b border-gray-200">
              {headers[0]}
            </th>
            <th className="px-5 py-3 text-right text-[0.7rem] font-bold uppercase tracking-widest text-brand-text-muted border-b border-gray-200">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-5 py-3 text-sm text-brand-text-muted">{row.label}</td>
              <td className="px-5 py-3 text-right text-sm font-semibold text-brand-blue tabular-nums whitespace-nowrap">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="bg-brand-bg-alt border-t border-gray-200">
              <td className="px-5 py-4 text-sm font-bold text-brand-text">
                {footer.label}
              </td>
              <td className="px-5 py-4 text-right text-sm font-bold text-brand-blue tabular-nums">
                {footer.value}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
