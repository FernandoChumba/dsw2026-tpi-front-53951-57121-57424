import { createElement, useId } from 'react';

export default function Field({
  as,
  label,
  error,
  id,
  className = '',
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...props
}) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const errorId = `${controlId}-error`;
  const description = [describedBy, error && errorId].filter(Boolean).join(' ');
  const colors = error
    ? 'border-med-danger-text bg-med-danger-bg'
    : 'border-med-border bg-med-card';

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      {label && (
        <label
          htmlFor={controlId}
          className="text-xs font-semibold text-med-text-main"
        >
          {label}
        </label>
      )}
      {createElement(as, {
        ...props,
        id: controlId,
        'aria-invalid': error ? true : invalid,
        'aria-describedby': description || undefined,
        className:
          `min-h-11 w-full rounded-lg border px-3.5 py-2.5 text-sm text-med-text-main placeholder:text-med-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-med-primary-600 disabled:opacity-60 ${colors} ${className}`.trim(),
      })}
      {error && (
        <p id={errorId} className="text-xs font-medium text-med-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
