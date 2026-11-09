import { useParams } from 'react-router-dom';

// Página para crear o editar una especialidad.
// Si la URL trae un id (/admin/specialties/:id/edit), se edita; si no, se crea.
// Por ahora solo muestra el título: el formulario llega en F14 y F15.
function SpecialtyFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
      {isEdit ? 'Editar especialidad' : 'Nueva especialidad'}
    </h1>
  );
}

export default SpecialtyFormPage;
