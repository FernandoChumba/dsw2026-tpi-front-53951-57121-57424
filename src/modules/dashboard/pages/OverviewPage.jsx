import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import DataTable from '../../shared/components/DataTable';
import FormMessage from '../../shared/components/FormMessage';
import useDashboardSummary from '../hooks/useDashboardSummary';

function OverviewPage() {
  const navigate = useNavigate();
  const { summary, isLoading, error, reload } = useDashboardSummary();

  const doctorColumns = [
    {
      key: 'name',
      header: 'Nombre del Doctor',
    },
    {
      key: 'specialty',
      header: 'Especialidad',
      render: (doctor) => doctor.specialty?.name || '—',
    },
    {
      key: 'licenseNumber',
      header: 'Matrícula',
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: () => (
        <button
          type="button"
          onClick={() => navigate('/admin/doctors')}
          className="text-xs font-semibold text-med-primary-700 hover:text-med-primary-900"
        >
          Ver Doctores
        </button>
      ),
    },
  ];

  const metricValue = (value) => {
    if (isLoading) return '…';

    return value ?? '—';
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-med-text-main sm:text-3xl">
            Vista General de Gestión
          </h1>
          <p className="mt-1 text-sm text-med-text-sub">
            Configure el personal médico y las especialidades del departamento.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => navigate('/admin/doctors')}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>Agregar Nuevo Doctor</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/admin/specialties')}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>Agregar Nueva Especialidad</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <FormMessage type="error">{error}</FormMessage>
          <Button variant="secondary" onClick={reload}>
            Reintentar
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-med-primary-50 text-med-primary-900">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Doctores Activos
            </span>
            <p className="mt-1 text-3xl font-extrabold text-med-primary-900 sm:text-4xl">
              {metricValue(summary?.doctorsCount)}
            </p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-med-primary-50 text-med-primary-900">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Especialidades Activas
            </span>
            <p className="mt-1 text-3xl font-extrabold text-med-primary-900 sm:text-4xl">
              {metricValue(summary?.specialtiesCount)}
            </p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-med-primary-50 text-med-primary-900">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="rounded-full bg-med-primary-100 px-2.5 py-1 text-xs font-semibold text-med-primary-700">
              Hoy
            </span>
          </div>
          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Turnos Confirmados Para Hoy
            </span>
            <p className="mt-1 text-3xl font-extrabold text-med-primary-900 sm:text-4xl">
              {metricValue(summary?.confirmedAppointmentsToday)}
            </p>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex flex-col justify-between gap-4 border-b border-med-border p-5 sm:flex-row sm:items-center">
          <h2 className="text-base font-bold text-med-primary-900">
            Directorio de Profesionales Médicos
          </h2>
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-med-text-muted">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              aria-label="Buscar por nombre"
              className="w-full rounded-lg border border-med-border bg-med-primary-50/70 py-1.5 pl-9 pr-3 text-xs text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <p
              role="status"
              className="py-8 text-center text-sm text-med-text-sub"
            >
              Cargando médicos...
            </p>
          ) : error && !summary ? (
            <p
              role="alert"
              className="py-8 text-center text-sm text-med-text-sub"
            >
              No se pudo cargar el directorio de médicos.
            </p>
          ) : (
            <DataTable
              caption="Directorio de profesionales médicos"
              columns={doctorColumns}
              rows={summary?.doctors ?? []}
              getRowKey={(doctor) => doctor.id}
              emptyMessage="No hay médicos registrados"
            />
          )}
        </div>

        {summary?.doctors.length > 0 && (
          <div className="flex items-center justify-between border-t border-med-border bg-med-primary-50/50 p-4 text-xs text-med-text-muted">
            <span>
              Mostrando {summary.doctors.length} de {summary.doctorsCount}{' '}
              registros
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}

export default OverviewPage;
