export default function FormMessage({ type, children }) {
  const isError = type === 'error';
  const colors = isError
    ? 'bg-med-danger-bg text-med-danger-text'
    : 'bg-med-active-bg text-med-active-text';

  return (
    <p
      role={isError ? 'alert' : 'status'}
      className={`rounded-lg p-3 text-sm ${colors}`}
    >
      <strong>{isError ? 'Error: ' : 'Éxito: '}</strong>
      {children}
    </p>
  );
}
