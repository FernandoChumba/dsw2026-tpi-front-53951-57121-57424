import Card from '../../../shared/components/Card';

// Tarjeta con el médico elegido. Muestra solo lo que trae el backend (nombre y
// especialidad): el mockup tiene foto, "Verificado" y clínica, pero esos datos
// no existen en la API.
// Iniciales del médico para el avatar, sin el título: 'Dr. Robert Chen' → 'RC'.
function getDoctorInitials(name) {
  const nameWithoutTitle = name.replace(/^Dra?\.\s*/, '');
  const words = nameWithoutTitle.split(' ');
  let initials = '';

  for (const word of words.slice(0, 2)) {
    initials += word.charAt(0);
  }

  return initials.toUpperCase();
}

export default function DoctorSummary({ doctor, specialty }) {
  return (
    <Card className="flex items-center gap-4 p-5 sm:p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-med-primary-200 bg-med-primary-100 text-lg font-bold text-med-primary-900 sm:h-16 sm:w-16">
        {getDoctorInitials(doctor.name)}
      </div>
      <div className="overflow-hidden">
        <h2 className="text-base font-bold text-med-primary-900 sm:text-lg">
          {doctor.name}
        </h2>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-med-primary-700 sm:text-sm sm:normal-case sm:tracking-normal sm:text-med-text-sub">
          {specialty.name}
        </p>
      </div>
    </Card>
  );
}
