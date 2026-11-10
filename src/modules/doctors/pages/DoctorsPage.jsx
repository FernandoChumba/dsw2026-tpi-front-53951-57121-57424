import { Link, useLocation } from 'react-router-dom';
import Button from '../../shared/components/Button';
import FormMessage from '../../shared/components/FormMessage';
import Card from '../../shared/components/Card';
import DataTable from '../../shared/components/DataTable';
import EmptyState from '../../shared/components/EmptyState';
import PageHeader from '../../shared/components/PageHeader';
import SearchInput from '../../shared/components/SearchInput';
import TablePagination from '../../shared/components/TablePagination';
import useDoctors, { MIN_SEARCH_LENGTH } from '../hooks/useDoctors';

// Enlaces con el mismo aspecto que Button: navegan a otra pantalla, por eso
// son <Link> y no <button>.
const linkClass =
  'inline-flex min-h-11 items-center rounded-lg bg-med-primary-900 px-4 py-2 font-medium text-med-card shadow-sm transition hover:bg-med-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-med-primary-600';

// Columnas de la tabla. Solo se muestran datos que el backend devuelve:
// nombre, matrícula y especialidad (ver docs/api-contract.md).
const columns = [
  { key: 'name', header: 'Nombre' },
  { key: 'licenseNumber', header: 'Matrícula' },
  {
    key: 'specialty',
    header: 'Especialidad',
    render: (doctor) => doctor.specialty?.name ?? 'Sin especialidad',
  },
];

function DoctorsPage() {
  const { state } = useLocation();
  const {
    doctors,
    total,
    pageIndex,
    pageSize,
    search,
    isSearchTooShort,
    isLoading,
    error,
    changeSearch,
    changePage,
    reload,
  } = useDoctors();

  // Contenido de la tabla según el estado de la consulta.
  function renderContent() {
    if (isLoading) {
      return (
        <p role="status" className="py-8 text-center text-sm text-med-text-sub">
          Cargando médicos…
        </p>
      );
    }

    if (error) {
      return (
        <div role="alert">
          <EmptyState
            title={error}
            action={
              <Button variant="outline" onClick={reload}>
                Reintentar
              </Button>
            }
          />
        </div>
      );
    }

    return (
      <DataTable
        caption="Listado de médicos"
        columns={columns}
        rows={doctors}
        emptyMessage={
          search.trim()
            ? 'No hay médicos que coincidan con la búsqueda.'
            : 'Todavía no hay médicos registrados.'
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {state?.doctorMessage && (
        <FormMessage type="success">{state.doctorMessage}</FormMessage>
      )}
      <PageHeader
        title="Directorio de médicos"
        description="Gestioná el personal médico y su disponibilidad."
        actions={
          <>
            <Link to="/admin/doctors/availability" className={linkClass}>
              Agregar disponibilidad horaria
            </Link>
            <Link to="/admin/doctors/new" className={linkClass}>
              Nuevo médico
            </Link>
          </>
        }
      />

      <div className="max-w-md">
        <SearchInput
          label="Buscar médico"
          placeholder="Buscar médico por nombre…"
          value={search}
          onChange={(event) => changeSearch(event.target.value)}
          error={
            isSearchTooShort
              ? `Ingresá al menos ${MIN_SEARCH_LENGTH} caracteres para buscar.`
              : ''
          }
        />
      </div>

      <Card className="overflow-hidden p-0">
        {renderContent()}
        <TablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          total={total}
          onPageChange={changePage}
        />
      </Card>
    </div>
  );
}

export default DoctorsPage;
