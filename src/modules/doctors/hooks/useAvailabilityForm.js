import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getApiError } from '../../shared/helpers/apiError';
import { saveDoctorAvailability } from '../services/saveDoctorAvailability';

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

export default function useAvailabilityForm(doctorId, initialAvailability) {
  const hasAvailability = useRef(initialAvailability.length > 0);
  const pending = useRef(false);
  const [saveState, setSaveState] = useState({
    saving: false,
    error: '',
    saved: false,
  });
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

  function getDayFields(day) {
    const field = 'days.' + day;
    const enabledName = field + '.enabled';
    const startName = field + '.startTime';
    const endName = field + '.endTime';
    const startField = register(startName, {
      validate: (value) => {
        if (!getValues(enabledName)) return true;

        if (!value) return 'Ingresá la hora de entrada.';

        return isHalfHour(value) || 'Usá intervalos de 30 minutos.';
      },
    });

    return {
      enabled: register(enabledName, {
        onChange: (event) => {
          clearErrors('root');

          if (!event.target.checked) clearErrors([startName, endName]);
        },
      }),
      startTime: {
        ...startField,
        onChange: async (event) => {
          await startField.onChange(event);

          if (getValues(endName)) await trigger(endName);
        },
      },
      endTime: register(endName, {
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
      }),
    };
  }

  async function submit(values) {
    if (pending.current) return;

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

    if (!doctorId) {
      setSaveState({
        saving: false,
        error: 'Seleccioná un médico.',
        saved: false,
      });

      return;
    }

    pending.current = true;
    setSaveState({ saving: true, error: '', saved: false });
    try {
      await saveDoctorAvailability(
        { doctorId, days: selectedDays },
        hasAvailability.current
      );
      hasAvailability.current = true;
      setSaveState({ saving: false, error: '', saved: true });
    } catch (error) {
      setSaveState({
        saving: false,
        error: getApiError(error).message,
        saved: false,
      });
    } finally {
      pending.current = false;
    }
  }

  return {
    days,
    control,
    getDayFields,
    errors,
    onSubmit: handleSubmit(submit),
    busy: isSubmitting || saveState.saving,
    saved: saveState.saved,
    saveError: saveState.error,
  };
}
