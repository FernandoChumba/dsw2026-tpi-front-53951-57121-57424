import { useEffect, useRef, useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import { getApiError } from '../../shared/helpers/apiError';
import { cancelAppointment } from '../services/cancelAppointment';
import { getPatientAppointments } from '../services/getPatientAppointments';

export default function usePatientAppointments() {
  const { dni } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [isCancelling, setIsCancelling] = useState(false);
  const cancellationPending = useRef(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError('');
      setAppointments([]);

      if (!dni) {
        setError('No se encontró el DNI de tu sesión. Volvé a iniciar sesión.');
        setIsLoading(false);

        return;
      }

      try {
        const data = await getPatientAppointments(dni);

        if (!ignore) setAppointments(data);
      } catch (requestError) {
        if (!ignore) setError(getApiError(requestError).message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [dni, reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  async function cancel(id) {
    if (!id || cancellationPending.current) return;

    cancellationPending.current = true;
    setIsCancelling(true);

    try {
      await cancelAppointment(id);
      setAppointments((current) => current.filter((item) => item.id !== id));
      reload();

      return { success: true };
    } catch (requestError) {
      const apiError = getApiError(requestError);

      if (
        requestError.response?.status === 409 &&
        apiError.code === 'APPOINTMENT_INVALID_STATUS'
      ) {
        reload();
      }

      return { success: false, message: apiError.message };
    } finally {
      cancellationPending.current = false;
      setIsCancelling(false);
    }
  }

  return {
    appointments,
    isLoading,
    error,
    reload,
    cancel,
    isCancelling,
  };
}
