import { useEffect, useRef, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { getDoctorAvailability } from '../services/getDoctorAvailability';
import { getDoctors } from '../services/getDoctors';
import { saveDoctorAvailability } from '../services/saveDoctorAvailability';

// Trae todos los médicos para el selector.
// El backend devuelve como máximo 100 por página, así que se piden las páginas
// una por una hasta tener el total.
async function getAllDoctors() {
  const pageSize = 100;
  let pageIndex = 0;
  let doctors = [];
  let page;

  do {
    page = await getDoctors({ pageIndex, pageSize });
    doctors = doctors.concat(page.data);
    pageIndex++;
    // Si una página llega vacía se corta, para no quedar en un bucle infinito.
  } while (page.data.length > 0 && doctors.length < page.total);

  return doctors;
}

// Estado de la pantalla de disponibilidad: la lista de médicos para el
// selector y la disponibilidad del médico elegido (doctorId viene de la URL).
export default function useDoctorAvailability(
  doctorId,
  { saveOnly = false, initialAvailability = [] } = {}
) {
  const hasAvailability = useRef(initialAvailability.length > 0);
  const [saveState, setSaveState] = useState({
    saving: false,
    error: '',
    saved: false,
  });
  const pending = useRef(false);

  async function saveAvailability(days) {
    if (pending.current) return;

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
      await saveDoctorAvailability({ doctorId, days }, hasAvailability.current);
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

  const [catalog, setCatalog] = useState({
    doctors: [],
    error: '',
    loading: true,
  });
  const [result, setResult] = useState(null);

  // La lista de médicos se carga una sola vez, al entrar a la página.
  useEffect(() => {
    if (saveOnly) return;

    // Si el usuario sale de la página antes de que llegue la respuesta, esa
    // respuesta se descarta (mismo criterio que useDoctors).
    let ignore = false;

    async function load() {
      try {
        const doctors = await getAllDoctors();

        if (!ignore) setCatalog({ doctors, error: '', loading: false });
      } catch (error) {
        if (!ignore) {
          setCatalog({
            doctors: [],
            error: getApiError(error).message,
            loading: false,
          });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [saveOnly]);

  // La disponibilidad se vuelve a pedir cada vez que cambia el médico elegido.
  useEffect(() => {
    if (saveOnly || !doctorId) return;

    // Si se elige otro médico antes de que llegue la respuesta, la anterior
    // se descarta para no mostrar los horarios de otro médico.
    let ignore = false;

    async function load() {
      try {
        const availability = await getDoctorAvailability(doctorId);

        if (!ignore) setResult({ doctorId, availability, error: '' });
      } catch (error) {
        if (!ignore) {
          setResult({
            doctorId,
            availability: [],
            error: getApiError(error).message,
          });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [doctorId, saveOnly]);

  // El resultado se usa solo si es del médico elegido ahora. Mientras llega
  // la respuesta del nuevo médico, se devuelve null y la página muestra
  // "Cargando disponibilidad…".
  const currentResult = result && result.doctorId === doctorId ? result : null;

  return {
    catalog,
    result: currentResult,
    saveAvailability,
    saving: saveState.saving,
    saveError: saveState.error,
    saved: saveState.saved,
  };
}
