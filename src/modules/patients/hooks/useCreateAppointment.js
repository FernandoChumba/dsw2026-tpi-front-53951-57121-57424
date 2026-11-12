import { useRef, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { createAppointment } from '../services/createAppointment';

export default function useCreateAppointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [conflict, setConflict] = useState(false);
  const submitting = useRef(false);
  const completed = useRef(false);

  async function create({ doctorId, availabilitySlotId, dni, reason }) {
    if (submitting.current || completed.current || conflict) return;

    const trimmedReason = reason?.trim() ?? '';

    if (
      !doctorId ||
      !availabilitySlotId ||
      !dni ||
      trimmedReason.length < 5 ||
      trimmedReason.length > 500
    ) {
      setError('Revisá el horario, el motivo y los datos de tu sesión.');

      return;
    }

    submitting.current = true;
    setIsSubmitting(true);
    setError('');

    try {
      const response = await createAppointment({
        doctorId,
        availabilitySlotId,
        dni,
        reason: trimmedReason,
      });

      if (response.status !== 201) {
        setError(
          'No se pudo confirmar el turno. Consultá Mis turnos antes de volver a intentar.'
        );
        completed.current = true;

        return;
      }

      completed.current = true;
      setSuccess(true);

      return 'success';
    } catch (requestError) {
      const apiError = getApiError(requestError);

      if (
        requestError.response?.status === 409 &&
        apiError.code === 'APPOINTMENT_CONFLICT'
      ) {
        setConflict(true);

        return 'conflict';
      }

      setError(apiError.message);
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  return {
    create,
    isSubmitting,
    success,
    error,
    conflict,
    clearConflict: () => setConflict(false),
  };
}
