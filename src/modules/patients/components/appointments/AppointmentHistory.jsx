import Button from '../../../shared/components/Button';
import DataTable from '../../../shared/components/DataTable';
import EmptyState from '../../../shared/components/EmptyState';
import FormMessage from '../../../shared/components/FormMessage';
import StatusBadge from '../../../shared/components/StatusBadge';
import TablePagination from '../../../shared/components/TablePagination';
import { formatDate, formatTime } from '../../../shared/helpers/formatDate';

const columns = [
  { key: 'doctor', header: 'Médico' },
  { key: 'specialty', header: 'Especialidad' },
  { key: 'date', header: 'Fecha', render: ({ date }) => formatDate(date) },
  {
    key: 'time',
    header: 'Horario',
    render: ({ startTime, endTime }) =>
      [formatTime(startTime), formatTime(endTime)].filter(Boolean).join(' – '),
  },
  { key: 'reason', header: 'Motivo' },
  {
    key: 'status',
    header: 'Estado',
    render: ({ status }) => <StatusBadge status={status} />,
  },
];

export default function AppointmentHistory({
  page,
  isLoading,
  error,
  changePage,
  reload,
}) {
  return (
    <section
      aria-labelledby="appointment-history-title"
      className="min-w-0 space-y-4"
    >
      <h2
        id="appointment-history-title"
        className="text-xl font-bold text-med-text-main"
      >
        Historial de turnos
      </h2>
      {isLoading ? (
        <p role="status" className="text-med-text-sub">
          Cargando historial…
        </p>
      ) : error ? (
        <div className="flex flex-col items-start gap-3">
          <FormMessage type="error">{error}</FormMessage>
          <Button variant="outline" onClick={reload}>
            Reintentar
          </Button>
        </div>
      ) : page.data.length === 0 ? (
        <EmptyState title="Todavía no tenés turnos en el historial" />
      ) : (
        <>
          <ul className="space-y-3 lg:hidden">
            {page.data.map((appointment) => (
              <li
                key={appointment.id}
                className="rounded-lg border border-med-border bg-med-card p-4"
              >
                <dl className="space-y-2 text-sm wrap-anywhere">
                  {columns.map(({ key, header, render }) => (
                    <div
                      key={key}
                      className="flex flex-wrap items-baseline gap-x-2"
                    >
                      <dt className="font-semibold text-med-text-main">
                        {header}
                      </dt>
                      <dd className="min-w-0 text-med-text-sub">
                        {render ? render(appointment) : appointment[key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <DataTable
              caption="Historial de turnos"
              columns={columns}
              rows={page.data}
            />
          </div>
          <TablePagination
            pageIndex={page.pageIndex}
            pageSize={page.pageSize}
            total={page.total}
            onPageChange={changePage}
          />
        </>
      )}
    </section>
  );
}
