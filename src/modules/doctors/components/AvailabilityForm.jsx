import { useId } from 'react';
import { useWatch } from 'react-hook-form';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import useAvailabilityForm from '../hooks/useAvailabilityForm';

function AvailabilityDay({ label, fields, control, errors, disabled }) {
  const enabled = useWatch({ control, name: fields.enabled.name });
  const labelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className="grid grid-cols-2 items-center gap-x-3 gap-y-2 px-4 py-3 lg:grid-cols-[1fr_1fr_1fr_1fr] lg:gap-4"
    >
      <span id={labelId} className="font-medium text-med-text-main">
        {label}
      </span>
      <label className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 justify-self-end lg:justify-self-start">
        <input
          type="checkbox"
          role="switch"
          aria-label={'Habilitar ' + label.toLowerCase()}
          disabled={disabled}
          className="peer sr-only"
          {...fields.enabled}
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
        {...fields.startTime}
      />
      <Input
        type="time"
        step={1800}
        label="Salida"
        aria-label={'Salida del ' + label.toLowerCase()}
        disabled={!enabled || disabled}
        error={errors?.endTime?.message}
        {...fields.endTime}
      />
    </div>
  );
}

export default function AvailabilityForm({
  doctorId,
  initialAvailability = [],
  onCancel,
}) {
  const {
    days,
    control,
    getDayFields,
    errors,
    onSubmit,
    busy,
    saved,
    saveError,
  } = useAvailabilityForm(doctorId, initialAvailability);

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
      <form noValidate onSubmit={onSubmit}>
        <div className="divide-y divide-med-border">
          {days.map(([day, label]) => (
            <AvailabilityDay
              key={day}
              label={label}
              fields={getDayFields(day)}
              control={control}
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
