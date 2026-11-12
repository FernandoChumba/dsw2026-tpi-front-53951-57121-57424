import { instance } from '../../shared/api/axiosInstance';

export async function cancelAppointment(id) {
  try {
    await instance.delete(`api/appointments/${encodeURIComponent(id)}`, {
      responseType: 'text',
    });
  } catch (error) {
    // La respuesta exitosa es texto; los errores del contrato son JSON.
    if (typeof error.response?.data === 'string') {
      try {
        error.response.data = JSON.parse(error.response.data);
      } catch {
        // Si el servidor no devuelve JSON, apiError usa su mensaje general.
      }
    }

    throw error;
  }
}
