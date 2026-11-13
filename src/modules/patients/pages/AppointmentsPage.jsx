import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import EmptyState from '../../shared/components/EmptyState';
import FormMessage from '../../shared/components/FormMessage';
import StatusBadge from '../../shared/components/StatusBadge';
import { formatDate, formatTime } from '../../shared/helpers/formatDate';
import usePatientAppointments from '../hooks/usePatientAppointments';

function AppointmentsPage() {
  const navigate = useNavigate();
  const { appointments, isLoading, error, reload, cancel, isCancelling } =
    usePatientAppointments();
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [notice, setNotice] = useState(null);

  async function confirmCancellation() {
    const result = await cancel(appointmentToCancel.id);

    if (result) {
      setNotice(
        result.success
          ? { type: 'success', message: 'El turno se canceló correctamente.' }
          : { type: 'error', message: result.message }
      );
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-med-text-main sm:text-3xl">
            Mis turnos médicos
          </h1>
          <p className="mt-1 text-sm text-med-text-sub">
            Consultá tus turnos activos.
          </p>
        </div>
        <Button className="min-h-11" onClick={() => navigate('/')}>
          Solicitar nuevo turno
        </Button>
      </div>

      {notice && <FormMessage type={notice.type}>{notice.message}</FormMessage>}

      {isLoading ? (
        <p role="status">Cargando turnos…</p>
      ) : error ? (
        <div className="flex flex-col items-start gap-3">
          <FormMessage type="error">{error}</FormMessage>
          <Button variant="outline" onClick={reload}>
            Reintentar
          </Button>
        </div>
      ) : appointments.length === 0 ? (
        <EmptyState
          title="No tenés turnos activos"
          description="Cuando reserves un turno, aparecerá acá."
        />
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="min-w-0 space-y-3 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="break-words text-sm font-semibold text-med-primary-700">
                  {appointment.specialty}
                </span>
                <StatusBadge status={appointment.status} />
              </div>
              <h2 className="break-words text-lg font-bold text-med-primary-900">
                {appointment.doctor}
              </h2>
              <p className="text-sm text-med-text-sub">
                Fecha:{' '}
                <strong className="text-med-text-main">
                  {formatDate(appointment.date)}
                </strong>
              </p>
              <p className="text-sm text-med-text-sub">
                Hora:{' '}
                <strong className="text-med-text-main">
                  {formatTime(appointment.startTime)}
                </strong>
              </p>
              <Button
                variant="outline"
                className="min-h-11"
                disabled={isCancelling}
                onClick={() => {
                  setNotice(null);
                  setAppointmentToCancel(appointment);
                }}
              >
                Cancelar turno
              </Button>
            </Card>
          ))}
        </div>
      )}
      <ConfirmDialog
        isOpen={Boolean(appointmentToCancel)}
        title="Cancelar turno"
        description="¿Querés cancelar este turno?"
        confirmLabel="Cancelar turno"
        cancelLabel="Volver"
        variant="danger"
        onClose={() => setAppointmentToCancel(null)}
        onConfirm={confirmCancellation}
      />
    </div>
  );
}

export default AppointmentsPage;
