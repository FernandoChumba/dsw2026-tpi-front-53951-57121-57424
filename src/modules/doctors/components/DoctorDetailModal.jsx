import { Link } from 'react-router-dom';
import Modal from '../../shared/components/Modal';

export default function DoctorDetailModal({ doctor, onClose }) {
  const specialty =
    typeof doctor?.specialty === 'string'
      ? doctor.specialty
      : doctor?.specialty?.name;

  return (
    <Modal
      isOpen={Boolean(doctor)}
      title="Detalle del médico"
      onClose={onClose}
    >
      {doctor && (
        <>
          <dl className="grid gap-4 rounded-lg border border-med-border bg-med-primary-50 p-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm text-med-text-sub">Nombre</dt>
              <dd className="font-semibold text-med-primary-900">
                {doctor.name}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-med-text-sub">Matrícula</dt>
              <dd>{doctor.licenseNumber || 'Sin matrícula informada'}</dd>
            </div>
            <div>
              <dt className="text-sm text-med-text-sub">Especialidad</dt>
              <dd>{specialty || 'Sin especialidad informada'}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-end">
            <Link
              to={`/admin/doctors/availability?doctorId=${encodeURIComponent(doctor.id)}`}
              onClick={onClose}
              className="inline-flex min-h-11 items-center rounded-lg bg-med-primary-900 px-4 py-2 font-medium text-med-card hover:bg-med-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-med-primary-600"
            >
              Ver disponibilidad
            </Link>
          </div>
        </>
      )}
    </Modal>
  );
}
