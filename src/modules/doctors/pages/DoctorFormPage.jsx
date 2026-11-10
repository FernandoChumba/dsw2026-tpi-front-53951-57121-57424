import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormMessage from '../../shared/components/FormMessage';
import { getApiError } from '../../shared/helpers/apiError';
import DoctorForm from '../components/DoctorForm';
import { getAllSpecialties } from '../../specialties/services/getSpecialties';
import { createDoctor } from '../services/createDoctor';
import { getDoctor } from '../services/getDoctor';
import { updateDoctor } from '../services/updateDoctor';

function DoctorFormContent({ id }) {
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
        const [specialties, doctor] = await Promise.all([
          getAllSpecialties(controller.signal),
          id ? getDoctor(id, controller.signal) : null,
        ]);

        if (!controller.signal.aborted)
          setCatalog({ specialties, doctor, error: '', loading: false });
      } catch (error) {
        if (!controller.signal.aborted)
          setCatalog({
            specialties: [],
            error: getApiError(error).message,
            loading: false,
          });
      }
    }

    load();

    return () => controller.abort();
  }, [id]);

  async function save(values) {
    if (id) await updateDoctor(id, values);
    else await createDoctor(values);

    navigate('/admin/doctors', {
      state: {
        doctorMessage: id
          ? 'Médico actualizado correctamente.'
          : 'Médico registrado correctamente.',
      },
    });
  }

  if (catalog.loading) return <p role="status">Cargando datos…</p>;

  if (catalog.error)
    return (
      <div className="flex flex-col gap-4">
        <FormMessage type="error">{catalog.error}</FormMessage>
        <Link to="/admin/doctors">Volver al listado</Link>
      </div>
    );

  return (
    <DoctorForm
      doctor={catalog.doctor}
      specialties={catalog.specialties}
      onSubmit={save}
      onCancel={() => navigate('/admin/doctors')}
    />
  );
}

export default function DoctorFormPage() {
  const { id } = useParams();

  return <DoctorFormContent key={id ?? 'new'} id={id} />;
}
