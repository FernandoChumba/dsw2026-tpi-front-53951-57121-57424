function TablePagination({
  pageIndex = 0,
  pageSize = 10,
  total = 0,
  onPageChange,
}) {
  const lastPageIndex = Math.max(0, Math.ceil(total / pageSize) - 1);
  const visiblePageIndex = Math.min(Math.max(pageIndex, 0), lastPageIndex);
  const from = total === 0 ? 0 : visiblePageIndex * pageSize + 1;
  const to = Math.min((visiblePageIndex + 1) * pageSize, total);
  const buttonClass =
    'min-h-11 min-w-11 rounded border border-med-border bg-med-card text-med-text-sub transition hover:bg-med-bg focus-visible:outline-2 focus-visible:outline-med-primary-600 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-med-border bg-med-primary-50/50 p-4 text-xs text-med-text-muted">
      <span aria-live="polite">
        Mostrando {from} a {to} de {total} registros
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Página anterior"
          onClick={() => onPageChange?.(visiblePageIndex - 1)}
          disabled={!onPageChange || visiblePageIndex === 0}
          className={buttonClass}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Página siguiente"
          onClick={() => onPageChange?.(visiblePageIndex + 1)}
          disabled={!onPageChange || visiblePageIndex === lastPageIndex}
          className={buttonClass}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
