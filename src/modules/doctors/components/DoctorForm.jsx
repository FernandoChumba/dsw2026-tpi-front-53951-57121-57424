import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import { getApiError } from '../../shared/helpers/apiError';

// Campos del formulario que pueden recibir un error del backend.
const FIELDS = ['name', 'licenseNumber', 'specialtyId'];

function DoctorFields({ doctor, specialties = [], onSubmit, onCancel }) {
  const pending = useRef(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: doctor?.name ?? '',
      licenseNumber: doctor?.licenseNumber ?? '',
      specialtyId: doctor?.specialty?.id ?? '',
    },
  });
  const hasSpecialties = specialties.length > 0;

  async function submit(values) {
    if (pending.current || !onSubmit) return;

    pending.current = true;

    try {
      await onSubmit(values);
    } catch (error) {
      // Si el backend rechaza un campo, el error se muestra debajo de ese
      // campo; si no, se muestra un mensaje general.
      const { message, details } = getApiError(error);
      const fieldErrors = details.filter(({ field }) => FIELDS.includes(field));

      fieldErrors.forEach(({ field, issue }) =>
        setError(field, { message: issue })
      );

      if (fieldErrors.length === 0) setError('root', { message });
    } finally {
      pending.current = false;
    }
  }

  return (
    <Card>
      <div className="border-b border-med-border p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-med-primary-900">
          {doctor ? 'Editar médico' : 'Registrar nuevo médico'}
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
          <FormMessage type="error">{errors.root.message}</FormMessage>
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

export default function DoctorForm({ doctor, ...props }) {
  return <DoctorFields key={doctor?.id ?? 'new'} doctor={doctor} {...props} />;
}
