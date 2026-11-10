import { useParams } from 'react-router-dom';

// Página para crear o editar un médico.
// Si la URL trae un id (/admin/doctors/:id/edit), se edita; si no, se crea.
// Por ahora solo muestra el título: el formulario llega en F18 y F19.
function DoctorFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
      {isEdit ? 'Editar médico' : 'Nuevo médico'}
    </h1>
  );
}

export default DoctorFormPage;
