import { Link, useNavigate, useParams } from 'react-router-dom';
import FormMessage from '../../shared/components/FormMessage';
import DoctorForm from '../components/DoctorForm';
import useDoctorForm from '../hooks/useDoctorForm';

// Contenido de la página. Si la URL trae un id, se edita ese médico; si no,
// se registra uno nuevo. La carga y el guardado están en useDoctorForm: acá
// solo se decide qué mostrar y a dónde navegar.
function DoctorFormContent({ id }) {
  const navigate = useNavigate();
  const { specialties, doctor, error, loading, save } = useDoctorForm(id);

  // Después de guardar se vuelve al listado con un mensaje de éxito.
  async function handleSubmit(values) {
    await save(values);

    navigate('/admin/doctors', {
      state: {
        doctorMessage: id
          ? 'Médico actualizado correctamente.'
          : 'Médico registrado correctamente.',
      },
    });
  }

  if (loading) return <p role="status">Cargando datos…</p>;

  if (error)
    return (
      <div className="flex flex-col gap-4">
        <FormMessage type="error">{error}</FormMessage>
        <Link to="/admin/doctors">Volver al listado</Link>
      </div>
    );

  return (
    <DoctorForm
      doctor={doctor}
      specialties={specialties}
      onSubmit={handleSubmit}
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
