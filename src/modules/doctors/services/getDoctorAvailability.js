import { instance } from '../../shared/api/axiosInstance';

// GET /api/doctors/{id}/availabilities (solo Administrador).
// Devuelve [{ id, day, startTime, endTime }]: una regla por día cargado.
// La lista viene vacía si el médico no tiene disponibilidad este mes.
// encodeURIComponent evita que un id con caracteres raros cambie la ruta.
export async function getDoctorAvailability(id) {
  const response = await instance.get(
    `api/doctors/${encodeURIComponent(id)}/availabilities`
  );

  return response.data;
}
