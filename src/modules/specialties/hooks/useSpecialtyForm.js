import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { createSpecialty } from '../services/createSpecialty';
import { getSpecialty } from '../services/getSpecialty';
import { updateSpecialty } from '../services/updateSpecialty';

export default function useSpecialtyForm(id) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    let active = true;

    async function load() {
      try {
        const specialty = await getSpecialty(id, controller.signal);

        if (active) {
          setResult({ specialty, error: '' });
        }
      } catch (error) {
        if (active) {
          setResult({ specialty: null, error: getApiError(error).message });
        }
      }
    }

    load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  return {
    specialty: result?.specialty,
    error: result?.error,
    loading: Boolean(id && !result),
    save: (values) =>
      id ? updateSpecialty(id, values) : createSpecialty(values),
  };
}
