import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormMessage from '../../shared/components/FormMessage';
import { getApiError } from '../../shared/helpers/apiError';
import DoctorForm from '../components/DoctorForm';
import { getAllSpecialties } from '../../specialties/services/getSpecialties';
import { createDoctor } from '../services/createDoctor';
import { getDoctor } from '../services/getDoctor';
import { updateDoctor } from '../services/updateDoctor';

// Contenido de la página. Si la URL trae un id, se edita ese médico; si no,
// se registra uno nuevo.
function DoctorFormContent({ id }) {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState({
    specialties: [],
    doctor: null,
    error: '',
    loading: true,
  });

  useEffect(() => {
    // Si el usuario sale de la página antes de que lleguen las respuestas,
    // se descartan (mismo criterio que useDoctors).
    let ignore = false;

    async function load() {
      try {
        // Las especialidades se necesitan siempre, para el selector.
        const specialties = await getAllSpecialties();
        // El médico solo se pide al editar.
        let doctor = null;

        if (id) {
          doctor = await getDoctor(id);
        }

        if (!ignore) {
          setCatalog({ specialties, doctor, error: '', loading: false });
        }
      } catch (error) {
        // Por ejemplo, un id que no existe responde 404 y se muestra
        // "El elemento buscado no existe." con el enlace al listado.
        if (!ignore) {
          setCatalog({
            specialties: [],
            doctor: null,
            error: getApiError(error).message,
            loading: false,
          });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
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

// Las rutas /admin/doctors/new y /admin/doctors/:id/edit usan esta misma
// página. La key hace que React la arme de cero al pasar de una a otra, así el
// formulario no conserva los datos del médico anterior.
export default function DoctorFormPage() {
  const { id } = useParams();

  return <DoctorFormContent key={id ?? 'new'} id={id} />;
}
