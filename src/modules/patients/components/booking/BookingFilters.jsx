import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import EmptyState from '../../../shared/components/EmptyState';
import FormMessage from '../../../shared/components/FormMessage';
import Select from '../../../shared/components/Select';

// Primer paso de la reserva: elegir especialidad y médico.
// Solo dibuja: los datos y los cambios llegan por props desde useAvailableSlots.
export default function BookingFilters({
  specialties,
  doctors,
  specialtyId,
  doctorId,
  isLoading,
  error,
  hasSlots,
  onSpecialtyChange,
  onDoctorChange,
  onRetry,
}) {
  function renderContent() {
    if (isLoading) {
      return <p role="status">Cargando especialidades…</p>;
    }

    if (error) {
      return (
        <div className="flex flex-col items-start gap-3">
          <FormMessage type="error">{error}</FormMessage>
          <Button variant="outline" onClick={onRetry}>
            Reintentar
          </Button>
        </div>
      );
    }

    if (!hasSlots) {
      return (
        <EmptyState
          title="Sin disponibilidad"
          description="Por ahora no hay turnos libres. Volvé a consultar más tarde."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select
          label="Seleccionar Especialidad"
          value={specialtyId}
          onChange={(event) => onSpecialtyChange(event.target.value)}
        >
          <option value="">Elegí una especialidad</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </Select>

        {/* El médico se habilita recién cuando hay especialidad elegida. */}
        <Select
          label="Seleccionar Doctor"
          value={doctorId}
          disabled={!specialtyId}
          onChange={(event) => onDoctorChange(event.target.value)}
        >
          <option value="">Elegí un médico</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </Select>
      </div>
    );
  }

  return (
    <Card className="p-6 sm:p-7">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-med-primary-900 sm:text-3xl">
          Reservar Turno Médico
        </h1>
        <p className="mt-1 text-xs text-med-text-sub sm:text-sm">
          Seleccioná la especialidad y el profesional para continuar.
        </p>
      </div>
      {renderContent()}
    </Card>
  );
}
