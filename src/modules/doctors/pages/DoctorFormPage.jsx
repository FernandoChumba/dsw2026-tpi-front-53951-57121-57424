import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormMessage from '../../shared/components/FormMessage';
import { getApiError } from '../../shared/helpers/apiError';
import DoctorForm from '../components/DoctorForm';
import { createDoctor, getDoctorSpecialties } from '../services/createDoctor';

export default function DoctorFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState({
    specialties: [],
    error: '',
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const specialties = await getDoctorSpecialties(controller.signal);

        if (!controller.signal.aborted)
          setCatalog({ specialties, error: '', loading: false });
      } catch (error) {
        if (!controller.signal.aborted)
          setCatalog({
            specialties: [],
            error: getApiError(error).message,
            loading: false,
          });
      }
    }

    if (!id) load();

    return () => controller.abort();
  }, [id]);

  async function save(values) {
    await createDoctor(values);
    navigate('/admin/doctors', {
      state: { doctorMessage: 'Médico registrado correctamente.' },
    });
  }

  if (id) return <h1 className="text-xl font-semibold">Editar médico</h1>;

  if (catalog.loading) return <p role="status">Cargando especialidades…</p>;

  if (catalog.error)
    return (
      <div className="flex flex-col gap-4">
        <FormMessage type="error">{catalog.error}</FormMessage>
        <Link to="/admin/doctors">Volver al listado</Link>
      </div>
    );

  return (
    <DoctorForm
      specialties={catalog.specialties}
      onSubmit={save}
      onCancel={() => navigate('/admin/doctors')}
    />
  );
}
