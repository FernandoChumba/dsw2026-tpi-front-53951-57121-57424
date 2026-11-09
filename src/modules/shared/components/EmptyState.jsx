export default function EmptyState({
  title = 'No hay resultados',
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-med-border bg-med-card px-4 py-8 text-center">
      <p className="font-semibold text-med-text-main">{title}</p>
      {description && (
        <p className="text-sm text-med-text-sub">{description}</p>
      )}
      {action}
    </div>
  );
}
