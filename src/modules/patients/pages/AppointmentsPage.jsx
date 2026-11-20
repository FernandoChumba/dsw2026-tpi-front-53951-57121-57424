import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import EmptyState from '../../shared/components/EmptyState';
import FormMessage from '../../shared/components/FormMessage';
import PageHeader from '../../shared/components/PageHeader';
import AppointmentCard from '../components/appointments/AppointmentCard';
import AppointmentHistory from '../components/appointments/AppointmentHistory';
import useAppointmentHistory from '../hooks/useAppointmentHistory';
import usePatientAppointments from '../hooks/usePatientAppointments';

function AppointmentsPage() {
  const navigate = useNavigate();
  const { appointments, isLoading, error, reload, cancel, isCancelling } =
    usePatientAppointments();
  const history = useAppointmentHistory();
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [notice, setNotice] = useState(null);

  async function confirmCancellation() {
    const result = await cancel(appointmentToCancel.id);

    if (result) {
      if (result.success) history.changePage(0);

      setNotice(
        result.success
          ? { type: 'success', message: 'El turno se canceló correctamente.' }
          : { type: 'error', message: result.message }
      );
    }
  }

  function openCancelDialog(appointment) {
    setNotice(null);
    setAppointmentToCancel(appointment);
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageHeader
        title="Mis Turnos Médicos"
        description="Consulta y gestiona las citas médicas programadas."
        actions={
          <Button className="min-h-11" onClick={() => navigate('/')}>
            + Solicitar Nuevo Turno
          </Button>
        }
      />

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
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              disabled={isCancelling}
              onCancel={openCancelDialog}
            />
          ))}
        </div>
      )}
      <AppointmentHistory {...history} />
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
