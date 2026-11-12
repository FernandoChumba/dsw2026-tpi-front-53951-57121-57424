import { useForm } from 'react-hook-form';
import Button from '../../../shared/components/Button';
import Textarea from '../../../shared/components/Textarea';
import { formatTime } from '../../../shared/helpers/formatDate';
import { formatLongDate } from './dates';

// Límites del motivo según el contrato de la API (`reason`).
const REASON_MIN_LENGTH = 5;
const REASON_MAX_LENGTH = 500;

// Revisa el motivo sin contar los espacios de los bordes: así "     " no
// cuenta como un motivo de 5 caracteres.
function validateReason(value) {
  const reason = value.trim();

  if (reason.length === 0) {
    return 'Ingresá el motivo de la consulta.';
  }

  if (reason.length < REASON_MIN_LENGTH) {
    return `El motivo debe tener al menos ${REASON_MIN_LENGTH} caracteres.`;
  }

  if (reason.length > REASON_MAX_LENGTH) {
    return `El motivo puede tener hasta ${REASON_MAX_LENGTH} caracteres.`;
  }

  return true;
}

// Resumen del horario elegido, motivo de la consulta y botón para confirmar.
// - slot: bloque elegido en el calendario (null si todavía no se eligió).
// - onConfirm: recibe { slot, reason } cuando el formulario es válido.
//   El envío al backend llega con F27: mientras no se pase onConfirm, el
//   botón queda deshabilitado para que el paciente no pulse algo que no
//   hace nada.
export default function BookingSummary({ doctorName, slot, onConfirm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { reason: '' } });

  function onValid({ reason }) {
    if (onConfirm) {
      onConfirm({ slot, reason: reason.trim() });
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col gap-5 rounded-2xl border border-med-primary-200/60 bg-med-primary-50 p-5 sm:p-6"
    >
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

      <Textarea
        label="Motivo de la consulta"
        placeholder="Contá brevemente por qué pedís el turno."
        error={errors.reason?.message}
        {...register('reason', { validate: validateReason })}
      />

      {/* Sin horario elegido, o sin onConfirm (llega con F27), no se puede confirmar. */}
      <Button
        type="submit"
        disabled={!slot || !onConfirm}
        className="min-h-11 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-end"
      >
        Confirmar Turno
      </Button>
    </form>
  );
}
