import { useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';

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

function AvailabilityDay({ day, label, register, control }) {
  const field = `days.${day}`;
  const enabled = useWatch({ control, name: `${field}.enabled` });
  const labelId = useId();

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
          aria-label={`Habilitar ${label.toLowerCase()}`}
          className="peer sr-only"
          {...register(`${field}.enabled`)}
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
        aria-label={`Entrada del ${label.toLowerCase()}`}
        disabled={!enabled}
        {...register(`${field}.startTime`)}
      />
      <Input
        type="time"
        step={1800}
        label="Salida"
        aria-label={`Salida del ${label.toLowerCase()}`}
        disabled={!enabled}
        {...register(`${field}.endTime`)}
      />
    </div>
  );
}

export default function AvailabilityForm({
  initialAvailability = [],
  onCancel,
}) {
  const { register, control } = useForm({
    defaultValues: { days: getInitialDays(initialAvailability) },
  });

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-med-border p-4">
        <h2 className="text-lg font-semibold text-med-primary-900">
          Configuración de horarios
        </h2>
        <p className="text-sm text-med-text-sub">Intervalos de 30 minutos</p>
      </div>
      <div className="divide-y divide-med-border">
        {days.map(([day, label]) => (
          <AvailabilityDay
            key={day}
            day={day}
            label={label}
            register={register}
            control={control}
          />
        ))}
      </div>
      <div className="flex justify-end border-t border-med-border p-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </Card>
  );
}
