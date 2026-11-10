import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { getDoctorAvailability } from '../services/getDoctorAvailability';
import { getDoctors } from '../services/getDoctors';

const pageSize = 100;

async function getDoctorOptions() {
  const first = await getDoctors({ pageIndex: 0, pageSize });
  const remaining = Math.max(0, Math.ceil(first.total / pageSize) - 1);
  const pages = await Promise.all(
    Array.from({ length: remaining }, (_, index) =>
      getDoctors({ pageIndex: index + 1, pageSize })
    )
  );

  return [first, ...pages].flatMap(({ data }) => data);
}

export default function useDoctorAvailability(doctorId) {
  const [catalog, setCatalog] = useState({
    doctors: [],
    error: '',
    loading: true,
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;

    getDoctorOptions().then(
      (doctors) => {
        if (active) setCatalog({ doctors, error: '', loading: false });
      },
      (error) => {
        if (active)
          setCatalog({
            doctors: [],
            error: getApiError(error).message,
            loading: false,
          });
      }
    );

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!doctorId) return;

    const controller = new AbortController();

    getDoctorAvailability(doctorId, controller.signal).then(
      (availability) => {
        if (!controller.signal.aborted)
          setResult({ doctorId, availability, error: '' });
      },
      (error) => {
        if (!controller.signal.aborted)
          setResult({
            doctorId,
            availability: [],
            error: getApiError(error).message,
          });
      }
    );

    return () => controller.abort();
  }, [doctorId]);

  return { catalog, result: result?.doctorId === doctorId ? result : null };
}
