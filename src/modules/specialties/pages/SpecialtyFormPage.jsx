import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../shared/components/PageHeader';
import SpecialtyForm from '../components/SpecialtyForm';
import useSpecialtyForm from '../hooks/useSpecialtyForm';

const listPath = '/admin/specialties';

export default function SpecialtyFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { save } = useSpecialtyForm();

  async function handleSubmit(values) {
    await save(values);
    navigate(listPath, {
      state: { specialtyMessage: 'Especialidad registrada correctamente.' },
    });
  }

  if (id) return <PageHeader title="Editar especialidad" />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nueva especialidad"
        description="Ingresá el nombre y la descripción de la especialidad."
      />
      <SpecialtyForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(listPath)}
      />
    </div>
  );
}
