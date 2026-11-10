import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { getAllSpecialties } from '../../specialties/services/getSpecialties';
import { createDoctor } from '../services/createDoctor';
import { getDoctor } from '../services/getDoctor';
import { updateDoctor } from '../services/updateDoctor';

// Lógica del formulario de médicos (alta y edición).
// La página solo dibuja lo que devuelve este hook; las llamadas HTTP viven en
// los services (página → hook → service).
// - id: si viene, se edita ese médico; si no, se registra uno nuevo.
export default function useDoctorForm(id) {
  const [data, setData] = useState({
    specialties: [],
    doctor: null,
    error: '',
    loading: true,
  });

  useEffect(() => {
    // Si el usuario sale de la página antes de que lleguen las respuestas,
    // se descartan (mismo criterio que useDoctors).
    let ignore = false;

    async function load() {
      try {
        // Las especialidades se necesitan siempre, para el selector.
        const specialties = await getAllSpecialties();
        // El médico solo se pide al editar.
        let doctor = null;

        if (id) {
          doctor = await getDoctor(id);
        }

        if (!ignore) {
          setData({ specialties, doctor, error: '', loading: false });
        }
      } catch (error) {
        // Por ejemplo, un id que no existe responde 404 y la página muestra
        // "El elemento buscado no existe." con el enlace al listado.
        if (!ignore) {
          setData({
            specialties: [],
            doctor: null,
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
  }, [id]);

  // Guarda el médico: si hay id lo actualiza (PUT), si no lo crea (POST).
  // Si el backend rechaza los datos, el error sigue hacia DoctorForm, que lo
  // muestra debajo del campo correspondiente.
  async function save(values) {
    if (id) {
      await updateDoctor(id, values);
    } else {
      await createDoctor(values);
    }
  }

  return { ...data, save };
}
