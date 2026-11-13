import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import DataTable from '../../shared/components/DataTable';
import EmptyState from '../../shared/components/EmptyState';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import StatusBadge from '../../shared/components/StatusBadge';
import { formatDate, formatTime } from '../../shared/helpers/formatDate';
import useAppointmentSearch from '../hooks/useAppointmentSearch';

const columns = [
  {
    key: 'specialty',
    header: 'Especialidad',
    render: (row) => row.doctor?.specialty?.name ?? '—',
  },
  { key: 'doctor', header: 'Médico', render: (row) => row.doctor?.name ?? '—' },
  {
    key: 'date',
    header: 'Fecha y hora',
    render: (row) =>
      [formatDate(row.date), formatTime(row.startTime)]
        .filter(Boolean)
        .join(' ') || '—',
  },
  {
    key: 'patient',
    header: 'Paciente',
    render: (row) =>
      [
        row.patient?.fullName,
        row.patient?.dni != null ? `DNI: ${row.patient.dni}` : '',
      ]
        .filter(Boolean)
        .join(' — ') || '—',
  },
  {
    key: 'status',
    header: 'Estado',
    render: (row) => <StatusBadge status={row.appointmentsStatus} />,
  },
];

export default function AppointmentsSearchPage() {
  const {
    register,
    errors,
    apply,
    clear,
    changeSpecialty,
    specialties,
    doctors,
    optionsLoading,
    optionsError,
    retryOptions,
    appointments,
    isLoading,
    error,
    retry,
  } = useAppointmentSearch();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-med-primary-900">
          Búsqueda de turnos
        </h1>
        <p className="text-sm text-med-text-sub">
          Consultá los turnos por DNI, especialidad, médico y fecha.
        </p>
      </div>
      <Card>
        <form onSubmit={apply} className="flex flex-col gap-4" noValidate>
          {optionsLoading && (
            <p role="status">Cargando especialidades y médicos…</p>
          )}
          {optionsError && (
            <div className="flex flex-col items-start gap-2">
              <FormMessage type="error">{optionsError}</FormMessage>
              <Button variant="outline" onClick={retryOptions}>
                Reintentar carga de filtros
              </Button>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="DNI"
              inputMode="numeric"
              error={errors.dni?.message}
              {...register('dni', {
                validate: (value) =>
                  !value.trim() ||
                  /^\d{7,8}$/.test(value.trim()) ||
                  'Ingresá un DNI de 7 u 8 dígitos.',
              })}
            />
            <Select
              label="Especialidad"
              disabled={optionsLoading || Boolean(optionsError)}
              {...register('specialtyId', { onChange: changeSpecialty })}
            >
              <option value="">Todas las especialidades</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </Select>
            <Select
              label="Médico"
              disabled={optionsLoading || Boolean(optionsError)}
              {...register('doctorId')}
            >
              <option value="">Todos los médicos</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </Select>
            <Input label="Fecha" type="date" {...register('date')} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit">Aplicar filtros</Button>
            <Button variant="outline" onClick={clear}>
              Limpiar
            </Button>
          </div>
        </form>
      </Card>
      <div>
        <h2 className="mb-3 text-lg font-bold text-med-primary-900">
          Resultados
        </h2>
        {isLoading ? (
          <p role="status">Buscando turnos…</p>
        ) : error ? (
          <div className="flex flex-col items-start gap-3">
            <FormMessage type="error">{error}</FormMessage>
            <Button variant="outline" onClick={retry}>
              Reintentar
            </Button>
          </div>
        ) : appointments.length === 0 ? (
          <EmptyState
            title="No se encontraron turnos"
            description="Probá cambiar los filtros de búsqueda."
          />
        ) : (
          <>
            <p className="mb-3 text-sm text-med-text-sub">
              Se muestran hasta 10 resultados.
            </p>
            <DataTable
              caption="Turnos encontrados"
              columns={columns}
              rows={appointments}
              getRowKey={(row) => row.appointmentsId}
            />
          </>
        )}
      </div>
    </div>
  );
}
