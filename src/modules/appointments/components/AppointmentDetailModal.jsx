import Modal from '../../shared/components/Modal';
import StatusBadge from '../../shared/components/StatusBadge';
import { formatDate, formatTime } from '../../shared/helpers/formatDate';

export default function AppointmentDetailModal({ appointment, onClose }) {
  if (!appointment) return null;

  const {
    appointmentsId,
    appointmentsStatus,
    patient,
    doctor,
    date,
    startTime,
    endTime,
  } = appointment;
  const patientLabel = [
    patient?.fullName,
    patient?.dni != null && `DNI: ${patient.dni}`,
  ]
    .filter(Boolean)
    .join(' · ');
  const time = [formatTime(startTime), formatTime(endTime)]
    .filter(Boolean)
    .join(' – ');
  const details = [
    ['Identificador', appointmentsId],
    ['Paciente', patientLabel],
    ['Médico', doctor?.name],
    ['Especialidad', doctor?.specialty?.name],
    ['Fecha', formatDate(date)],
    ['Horario', time],
    ['Estado', <StatusBadge status={appointmentsStatus} />],
  ];

  return (
    <Modal isOpen title="Detalle del turno" onClose={onClose}>
      <dl className="grid gap-4 rounded-lg border border-med-border bg-med-primary-50 p-4 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div
            key={label}
            className={label === 'Identificador' ? 'sm:col-span-2' : undefined}
          >
            <dt className="text-sm text-med-text-sub">{label}</dt>
            <dd className="wrap-anywhere">{value || '—'}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
