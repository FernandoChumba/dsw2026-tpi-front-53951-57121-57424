import { useEffect, useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import { getApiError } from '../../shared/helpers/apiError';
import { getAppointmentHistory } from '../services/getAppointmentHistory';

const pageSize = 10;

export default function useAppointmentHistory() {
  const { dni } = useAuth();
  const [query, setQuery] = useState({ pageIndex: 0 });
  const [result, setResult] = useState(null);
  const current =
    result?.dni === dni && result?.query === query ? result : null;
  const { pageIndex } = query;

  useEffect(() => {
    if (!dni) return;

    const controller = new AbortController();
    let active = true;

    async function load() {
      try {
        const page = await getAppointmentHistory({
          dni,
          pageIndex,
          pageSize,
          signal: controller.signal,
        });

        if (active) setResult({ dni, query, page });
      } catch (error) {
        if (active)
          setResult({ dni, query, error: getApiError(error).message });
      }
    }

    load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [dni, pageIndex, query]);

  return {
    page: current?.page,
    isLoading: Boolean(dni) && !current,
    error: dni
      ? current?.error
      : 'No se encontró el DNI de tu sesión. Volvé a iniciar sesión.',
    changePage: (value) => setQuery({ pageIndex: value }),
    reload: () => setQuery({ pageIndex }),
  };
}
