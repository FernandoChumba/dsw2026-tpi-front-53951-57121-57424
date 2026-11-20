import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import StatusBadge from '../../../shared/components/StatusBadge';
import { formatTime } from '../../../shared/helpers/formatDate';

export default function AppointmentCard({ appointment, onCancel, disabled }) {
  return (
    <Card className="flex min-w-0 flex-col gap-3 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="break-words rounded-full bg-med-primary-100 px-3 py-1 text-xs font-semibold text-med-primary-900">
          {appointment.specialty}
        </span>
        <StatusBadge status={appointment.status} />
      </div>
      <h2 className="break-words text-lg font-bold text-med-primary-900">
        {appointment.doctor}
      </h2>
      <p className="text-sm text-med-text-sub">
        Fecha:{' '}
        <strong className="text-med-text-main">{appointment.date}</strong> a las{' '}
        <strong className="text-med-text-main">
          {formatTime(appointment.startTime)} hs
        </strong>
      </p>
      <hr className="border-med-border" />
      <Button
        variant="outline"
        className="min-h-11 w-full"
        disabled={disabled}
        onClick={() => onCancel(appointment)}
      >
        Cancelar Turno
      </Button>
    </Card>
  );
}
