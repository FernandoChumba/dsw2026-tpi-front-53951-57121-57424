import { formatTime } from '../../../shared/helpers/formatDate';
import { formatLongDate } from './dates';

// Resumen del horario elegido. Solo muestra la selección: el motivo de la
// consulta llega con F26 y el botón para confirmar (que registra el turno en
// el backend) con F27. Así no hay un botón que parezca reservar sin hacerlo.
export default function BookingSummary({ doctorName, slot }) {
  return (
    <div className="rounded-2xl border border-med-primary-200/60 bg-med-primary-50 p-5 sm:p-6">
      <div className="border-l-4 border-med-primary-900 pl-3.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
          Resumen de Selección
        </span>
        {slot ? (
          <>
            <p className="mt-0.5 text-base font-bold text-med-primary-900 sm:text-lg">
              {formatLongDate(slot.date)}, {formatTime(slot.startTime)} HS
            </p>
            <p className="mt-0.5 text-xs text-med-text-sub">
              {doctorName} • Duración: 30 min
            </p>
          </>
        ) : (
          <p className="mt-0.5 text-sm text-med-text-sub">
            Elegí un horario disponible para continuar.
          </p>
        )}
      </div>
    </div>
  );
}
