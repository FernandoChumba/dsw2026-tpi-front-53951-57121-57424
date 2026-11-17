import { Link, useNavigate, useParams } from 'react-router-dom';
import FormMessage from '../../shared/components/FormMessage';
import PageHeader from '../../shared/components/PageHeader';
import SpecialtyForm from '../components/SpecialtyForm';
import useSpecialtyForm from '../hooks/useSpecialtyForm';

const listPath = '/admin/specialties';

function SpecialtyFormContent({ id }) {
  const navigate = useNavigate();
  const { specialty, error, loading, save } = useSpecialtyForm(id);

  async function handleSubmit(values) {
    await save(values);
    navigate(listPath, {
      state: {
        specialtyMessage: id
          ? 'Especialidad actualizada correctamente.'
          : 'Especialidad registrada correctamente.',
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={id ? 'Editar especialidad' : 'Nueva especialidad'}
        description="Completá el nombre y la descripción de la especialidad."
      />
      {loading && <p role="status">Cargando especialidad…</p>}
      {error && (
        <div className="flex flex-col items-start gap-3">
          <FormMessage type="error">{error}</FormMessage>
          <Link to={listPath} className="text-med-primary-700 underline">
            Volver al listado
          </Link>
        </div>
      )}
      {!loading && !error && (
        <SpecialtyForm
          specialty={specialty}
          onSubmit={handleSubmit}
          onCancel={() => navigate(listPath)}
        />
      )}
    </div>
  );
}

export default function SpecialtyFormPage() {
  const { id } = useParams();

  return <SpecialtyFormContent key={id ?? 'new'} id={id} />;
}
