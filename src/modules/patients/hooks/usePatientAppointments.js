import { useEffect, useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import { getApiError } from '../../shared/helpers/apiError';
import { getPatientAppointments } from '../services/getPatientAppointments';

export default function usePatientAppointments() {
  const { dni } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

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

  return {
    appointments,
    isLoading,
    error,
    reload: () => setReloadKey((key) => key + 1),
  };
}
