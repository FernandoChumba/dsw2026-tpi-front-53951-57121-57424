import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';

export default function DoctorForm({ specialties = [], onSubmit, onCancel }) {
  const pending = useRef(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', licenseNumber: '', specialtyId: '' },
  });
  const hasSpecialties = specialties.length > 0;

  async function submit(values) {
    if (pending.current || !onSubmit) return;

    pending.current = true;

    try {
      await onSubmit(values);
    } catch {
      setError('root', {
        message: 'No se pudo guardar el médico. Volvé a intentar.',
      });
    } finally {
      pending.current = false;
    }
  }

  return (
    <Card>
      <div className="border-b border-med-border p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-med-primary-900">
          Registrar nuevo médico
        </h2>
        <p className="mt-1 text-sm text-med-text-sub">
          Completá el nombre, la especialidad y la matrícula del profesional.
        </p>
      </div>
      <form
        noValidate
        onSubmit={(event) => {
          if (pending.current) {
            event.preventDefault();

            return;
          }

          return handleSubmit(submit)(event);
        }}
        className="flex flex-col gap-4 p-4 sm:p-6"
      >
        <Input
          label="Nombre completo"
          placeholder="Nombre y apellido"
          required
          error={errors.name?.message}
          {...register('name', {
            setValueAs: (value) => value.trim(),
            required: 'Ingresá el nombre completo.',
            minLength: { value: 3, message: 'Ingresá al menos 3 caracteres.' },
            maxLength: { value: 100, message: 'Ingresá hasta 100 caracteres.' },
          })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            label="Especialidad"
            required
            disabled={!hasSpecialties}
            error={errors.specialtyId?.message}
            {...register('specialtyId', {
              required: 'Seleccioná una especialidad.',
              validate: (value) =>
                specialties.some(({ id }) => id === value) ||
                'Seleccioná una especialidad disponible.',
            })}
          >
            <option value="">Seleccioná una especialidad</option>
            {specialties.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
          <Input
            label="Matrícula médica"
            required
            error={errors.licenseNumber?.message}
            {...register('licenseNumber', {
              setValueAs: (value) => value.trim(),
              required: 'Ingresá la matrícula médica.',
            })}
          />
        </div>
        {!hasSpecialties && (
          <p role="status" className="text-sm text-med-text-sub">
            No hay especialidades disponibles para registrar un médico.
          </p>
        )}
        {errors.root?.message && (
          <p role="alert" className="text-sm text-med-danger-text">
            {errors.root.message}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2 border-t border-med-border pt-4">
          <Button variant="outline" disabled={isSubmitting} onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!hasSpecialties || !onSubmit || isSubmitting}
          >
            {isSubmitting ? 'Guardando…' : 'Guardar médico'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
