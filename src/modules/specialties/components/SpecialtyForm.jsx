import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import Textarea from '../../shared/components/Textarea';
import { getApiError } from '../../shared/helpers/apiError';
import { FIELD_LIMITS, NAME_PATTERN } from '../../shared/helpers/inputRules';

function rules(label, minimum, maximum) {
  return {
    setValueAs: (value) => value.trim(),
    required: `Ingresá ${label}.`,
    minLength: {
      value: minimum,
      message: `Ingresá al menos ${minimum} caracteres.`,
    },
    maxLength: {
      value: maximum,
      message: `Ingresá hasta ${maximum} caracteres.`,
    },
  };
}

export default function SpecialtyForm({ specialty, onSubmit, onCancel }) {
  const pending = useRef(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: specialty?.name ?? '',
      description: specialty?.description ?? '',
    },
  });

  async function save(values) {
    if (pending.current) return;

    pending.current = true;

    try {
      await onSubmit(values);
    } catch (error) {
      const { message, details } = getApiError(error);
      const fields = details.filter(
        ({ field }) => field === 'name' || field === 'description'
      );

      if (fields.length === 0) setError('root', { message });

      for (const { field, issue } of fields) {
        setError(field, { message: issue || message });
      }
    } finally {
      pending.current = false;
    }
  }

  return (
    <Card>
      <form
        noValidate
        onSubmit={handleSubmit(save)}
        className="flex flex-col gap-4 p-4 sm:p-6"
      >
        <Input
          label="Nombre"
          required
          maxLength={FIELD_LIMITS.name}
          error={errors.name?.message}
          {...register('name', {
            ...rules('el nombre', 3, FIELD_LIMITS.name),
            pattern: NAME_PATTERN,
          })}
        />
        <Textarea
          label="Descripción"
          required
          maxLength={FIELD_LIMITS.description}
          error={errors.description?.message}
          {...register(
            'description',
            rules('la descripción', 10, FIELD_LIMITS.description)
          )}
        />
        {errors.root?.message && (
          <FormMessage type="error">{errors.root.message}</FormMessage>
        )}
        <div className="flex flex-wrap justify-end gap-2 border-t border-med-border pt-4">
          <Button variant="outline" disabled={isSubmitting} onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando…' : 'Guardar especialidad'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
