import { useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import useDoctorAvailability from '../hooks/useDoctorAvailability';

const days = [
  ['LUNES', 'Lunes'],
  ['MARTES', 'Martes'],
  ['MIÉRCOLES', 'Miércoles'],
  ['JUEVES', 'Jueves'],
  ['VIERNES', 'Viernes'],
  ['SÁBADO', 'Sábado'],
  ['DOMINGO', 'Domingo'],
];

function getInitialDays(availability) {
  const rules = new Map(availability.map((rule) => [rule.day, rule]));

  return Object.fromEntries(
    days.map(([day]) => {
      const rule = rules.get(day);

      return [
        day,
        {
          enabled: Boolean(rule),
          startTime: rule?.startTime?.slice(0, 5) ?? '',
          endTime: rule?.endTime?.slice(0, 5) ?? '',
        },
      ];
    })
  );
}

function isHalfHour(value) {
  return /^(?:[01]\d|2[0-3]):(?:00|30)$/.test(value ?? '');
}

function AvailabilityDay({
  day,
  label,
  register,
  control,
  getValues,
  clearErrors,
  trigger,
  errors,
  disabled,
}) {
  const field = 'days.' + day;
  const enabledName = field + '.enabled';
  const startName = field + '.startTime';
  const endName = field + '.endTime';
  const enabled = useWatch({ control, name: enabledName });
  const labelId = useId();
  const startField = register(startName, {
    validate: (value) => {
      if (!getValues(enabledName)) return true;

      if (!value) return 'Ingresá la hora de entrada.';

      return isHalfHour(value) || 'Usá intervalos de 30 minutos.';
    },
  });
  const endField = register(endName, {
    validate: (value) => {
      if (!getValues(enabledName)) return true;

      if (!value) return 'Ingresá la hora de salida.';

      if (!isHalfHour(value)) return 'Usá intervalos de 30 minutos.';

      const start = getValues(startName);

      return (
        !isHalfHour(start) ||
        start < value ||
        'La salida debe ser posterior a la entrada.'
      );
    },
  });

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="grid grid-cols-2 items-center gap-x-3 gap-y-2 px-4 py-3 sm:grid-cols-[1fr_1fr_1fr_1fr] sm:gap-4"
    >
      <span id={labelId} className="font-medium text-med-text-main">
        {label}
      </span>
      <label className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 justify-self-end sm:justify-self-start">
        <input
          type="checkbox"
          role="switch"
          aria-label={'Habilitar ' + label.toLowerCase()}
          disabled={disabled}
          className="peer sr-only"
          {...register(enabledName, {
            onChange: (event) => {
              clearErrors('root');

              if (!event.target.checked) clearErrors([startName, endName]);
            },
          })}
        />
        <span
          aria-hidden="true"
          className="relative h-6 w-10 shrink-0 rounded-full bg-med-text-muted after:absolute after:top-1 after:left-1 after:size-4 after:rounded-full after:bg-med-card after:content-[''] peer-checked:bg-med-primary-700 peer-checked:after:translate-x-4 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-med-primary-600"
        />
        <span className="text-xs text-med-text-sub">
          {enabled ? 'Activo' : 'Inactivo'}
        </span>
      </label>
      <Input
        type="time"
        step={1800}
        label="Entrada"
        aria-label={'Entrada del ' + label.toLowerCase()}
        disabled={!enabled || disabled}
        error={errors?.startTime?.message}
        {...startField}
        onChange={async (event) => {
          await startField.onChange(event);

          if (getValues(endName)) await trigger(endName);
        }}
      />
      <Input
        type="time"
        step={1800}
        label="Salida"
        aria-label={'Salida del ' + label.toLowerCase()}
        disabled={!enabled || disabled}
        error={errors?.endTime?.message}
        {...endField}
      />
    </div>
  );
}

export default function AvailabilityForm({
  initialAvailability = [],
  onCancel,
}) {
  const [params] = useSearchParams();
  const doctorId = params.get('doctorId') ?? '';
  // F21 ya cargó las reglas; este uso del hook solo guarda y evita repetir consultas.
  const { saveAvailability, saving, saveError, saved } = useDoctorAvailability(
    doctorId,
    { saveOnly: true, initialAvailability }
  );
  const {
    register,
    control,
    getValues,
    clearErrors,
    setError,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { days: getInitialDays(initialAvailability) },
    mode: 'onChange',
  });

  async function submit(values) {
    clearErrors('root');
    const selectedDays = days
      .filter(([day]) => values.days[day]?.enabled)
      .map(([day]) => ({
        day,
        startTime: values.days[day].startTime,
        endTime: values.days[day].endTime,
      }));

    if (selectedDays.length === 0) {
      setError('root', { message: 'Habilitá al menos un día de atención.' });

      return;
    }

    await saveAvailability(selectedDays);
  }

  const busy = isSubmitting || saving;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-med-border p-4">
        <h2 className="text-lg font-semibold text-med-primary-900">
          Configuración de horarios
        </h2>
        <p className="text-sm text-med-text-sub">Intervalos de 30 minutos</p>
      </div>
      {saved && (
        <div className="px-4 pt-4">
          <FormMessage type="success">
            Disponibilidad horaria configurada con éxito
          </FormMessage>
        </div>
      )}
      {saveError && (
        <div className="px-4 pt-4">
          <FormMessage type="error">{saveError}</FormMessage>
        </div>
      )}
      <form noValidate onSubmit={handleSubmit(submit)}>
        <div className="divide-y divide-med-border">
          {days.map(([day, label]) => (
            <AvailabilityDay
              key={day}
              day={day}
              label={label}
              register={register}
              control={control}
              getValues={getValues}
              clearErrors={clearErrors}
              trigger={trigger}
              errors={errors.days?.[day]}
              disabled={busy}
            />
          ))}
        </div>
        {errors.root?.message && (
          <div className="px-4 pt-4">
            <FormMessage type="error">{errors.root.message}</FormMessage>
          </div>
        )}
        <div className="flex justify-end gap-2 border-t border-med-border p-4">
          <Button variant="outline" disabled={busy} onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? 'Guardando…' : 'Guardar disponibilidad'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
