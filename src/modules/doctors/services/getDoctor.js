import { instance } from '../../shared/api/axiosInstance';

// GET /api/doctors/{id} (solo Administrador).
// Devuelve { id, name, licenseNumber, specialty: { id, name } }.
// Si el médico no existe, el backend responde 404 (ENTITY_NOTFOUND).
// encodeURIComponent evita que un id con caracteres raros cambie la ruta.
export async function getDoctor(id) {
  const response = await instance.get(`api/doctors/${encodeURIComponent(id)}`);

  return response.data;
}
