import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../shared/components/Button';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import DataTable from '../../shared/components/DataTable';
import FormMessage from '../../shared/components/FormMessage';
import PageHeader from '../../shared/components/PageHeader';
import SearchInput from '../../shared/components/SearchInput';
import TablePagination from '../../shared/components/TablePagination';
import useSpecialties from '../hooks/useSpecialties';

const columns = [
  { key: 'name', header: 'Especialidad' },
  { key: 'description', header: 'Descripción' },
];

function actionColumn(onRemove) {
  return {
    key: 'actions',
    header: 'Acciones',
    render: (specialty) => (
      <div className="flex flex-nowrap gap-1">
        <Link
          to={`/admin/specialties/${encodeURIComponent(specialty.id)}/edit`}
          aria-label={`Editar ${specialty.name}`}
          className="inline-flex min-h-9 items-center rounded-lg border border-med-border px-2 py-1 text-xs text-med-primary-900 hover:bg-med-primary-50"
        >
          Editar
        </Link>
        <Button
          variant="outline"
          className="min-h-9 px-2 py-1 text-xs"
          aria-label={`Eliminar ${specialty.name}`}
          onClick={() => onRemove(specialty)}
        >
          Eliminar
        </Button>
      </div>
    ),
  };
}

export default function SpecialtiesPage() {
  const { state } = useLocation();
  const [specialtyToRemove, setSpecialtyToRemove] = useState(null);
  const [notice, setNotice] = useState('');
  const {
    search,
    pageIndex,
    pageSize,
    isTooShort,
    isLoading,
    error,
    page,
    changeSearch,
    changePage,
    retry,
    removeSpecialty,
  } = useSpecialties();

  async function confirmRemoval() {
    await removeSpecialty(specialtyToRemove.id);
    setNotice('La especialidad se eliminó correctamente.');
  }

  const message = notice || state?.specialtyMessage;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {message && <FormMessage type="success">{message}</FormMessage>}
      <PageHeader
        title="Directorio de especialidades"
        description="Consultá y buscá especialidades médicas."
        actions={
          <Link
            to="/admin/specialties/new"
            className="inline-flex min-h-11 items-center rounded-lg bg-med-primary-900 px-4 font-medium text-med-card hover:bg-med-primary-800"
          >
            Nueva especialidad
          </Link>
        }
      />
      <div className="w-full max-w-md">
        <SearchInput
          label="Buscar especialidad"
          value={search}
          maxLength={100}
          onChange={(event) => changeSearch(event.target.value)}
          error={isTooShort ? 'Ingresá al menos 3 caracteres para buscar.' : ''}
        />
      </div>
      {isLoading && (
        <p role="status" className="text-med-text-sub">
          Cargando especialidades…
        </p>
      )}
      {error && (
        <div className="flex flex-col items-start gap-3">
          <FormMessage type="error">{error}</FormMessage>
          <Button variant="outline" onClick={retry}>
            Reintentar
          </Button>
        </div>
      )}
      {!isTooShort && !isLoading && !error && (
        <div className="min-w-0">
          <DataTable
            caption="Listado de especialidades"
            columns={[...columns, actionColumn(setSpecialtyToRemove)]}
            rows={page.data}
            emptyMessage={
              search.trim()
                ? 'No se encontraron especialidades.'
                : 'No hay especialidades registradas.'
            }
          />
          {page.total > 0 && (
            <TablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              total={page.total}
              onPageChange={changePage}
            />
          )}
        </div>
      )}
      <ConfirmDialog
        isOpen={Boolean(specialtyToRemove)}
        title="Eliminar especialidad"
        description={
          specialtyToRemove && `¿Querés eliminar ${specialtyToRemove.name}?`
        }
        confirmLabel="Eliminar"
        variant="danger"
        onClose={() => setSpecialtyToRemove(null)}
        onConfirm={confirmRemoval}
      />
    </div>
  );
}
