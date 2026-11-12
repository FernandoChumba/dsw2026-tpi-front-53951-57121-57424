import { useForm } from 'react-hook-form';
import Button from '../../../shared/components/Button';
import FormMessage from '../../../shared/components/FormMessage';
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

// Resumen del horario elegido y motivo de la consulta.
export default function BookingSummary({
  doctorName,
  slot,
  onConfirm,
  isSubmitting,
  disabled,
  error,
}) {
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

      {error && <FormMessage type="error">{error}</FormMessage>}

      <Textarea
        label="Motivo de la consulta"
        placeholder="Contá brevemente por qué pedís el turno."
        error={errors.reason?.message}
        disabled={isSubmitting}
        {...register('reason', { validate: validateReason })}
      />

      <Button
        type="submit"
        disabled={!slot || !onConfirm || isSubmitting || disabled}
        className="min-h-11 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-end"
      >
        {isSubmitting ? 'Confirmando…' : 'Confirmar Turno'}
      </Button>
    </form>
  );
}
