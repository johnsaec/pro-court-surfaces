interface ComparisonTableProps {
  headers: string[];
  rows: {
    factor: string;
    values: string[];
    recommended?: number;
  }[];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl overflow-hidden text-sm">
        <thead className="bg-brand-bg-alt">
          <tr>
            {headers.map((header, i) => (
              <th
                key={header}
                className={`px-4 py-3 text-[0.7rem] font-bold uppercase tracking-widest whitespace-nowrap ${
                  i === 0 ? "text-brand-text text-left" : "text-brand-text-muted text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.factor}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-semibold text-brand-text whitespace-nowrap">
                {row.factor}
              </td>
              {row.values.map((value, i) => (
                <td
                  key={`${row.factor}-${i}`}
                  className={`px-4 py-3 leading-snug ${
                    row.recommended === i
                      ? "text-brand-blue font-semibold"
                      : "text-brand-text-muted"
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
