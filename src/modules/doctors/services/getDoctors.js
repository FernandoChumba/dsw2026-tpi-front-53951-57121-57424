import { instance } from '../../shared/api/axiosInstance';

// GET /api/doctors (solo Administrador).
// El backend pagina: pageIndex empieza en 0 y pageSize va de 1 a 100.
// Devuelve { pageSize, pageIndex, data, total }, donde cada elemento de data es
// { id, name, licenseNumber, specialty: { id, name } }.
export async function getDoctors({ pageIndex, pageSize, name }) {
  const params = { pageIndex, pageSize };

  // name se envía solo si tiene contenido: un nombre vacío responde 400.
  if (name) {
    params.name = name;
  }

  const response = await instance.get('api/doctors', { params });

  return response.data;
}
