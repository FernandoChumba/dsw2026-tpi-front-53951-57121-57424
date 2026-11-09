import EmptyState from './EmptyState';

const getId = (row) => row.id;

export default function DataTable({
  caption,
  columns,
  rows,
  getRowKey = getId,
  emptyMessage,
}) {
  if (rows.length === 0) return <EmptyState title={emptyMessage} />;

  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="max-w-full overflow-x-auto rounded-lg border border-med-border bg-med-card focus-visible:outline-2 focus-visible:outline-med-primary-600"
    >
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-med-primary-50 text-med-primary-900">
          <tr>
            {columns.map(({ key, header }) => (
              <th key={key} scope="col" className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border">
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map(({ key, render }) => (
                <td key={key} className="px-4 py-3">
                  {render ? render(row) : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
