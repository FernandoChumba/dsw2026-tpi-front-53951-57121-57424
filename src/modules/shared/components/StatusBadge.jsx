const statuses = new Map([
  ['BOOKED', ['Confirmada', 'bg-med-active-bg text-med-active-text']],
  ['CANCELLED', ['Cancelada', 'bg-med-danger-bg text-med-danger-text']],
  ['ATTENDED', ['Atendida', 'bg-med-primary-100 text-med-primary-900']],
  ['NO_SHOW', ['No asistió', 'bg-med-leave-bg text-med-leave-text']],
]);

export default function StatusBadge({ status }) {
  const [label, color] = statuses.get(status) ?? [
    'Estado desconocido',
    'bg-med-bg text-med-text-sub',
  ];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}
    >
      {label}
    </span>
  );
}
