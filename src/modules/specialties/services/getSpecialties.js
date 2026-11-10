import { instance } from '../../shared/api/axiosInstance';

// GET /api/specialties.
// El backend pagina: pageIndex empieza en 0 y pageSize va de 1 a 100.
// Devuelve { pageSize, pageIndex, data, total }, donde cada elemento de data es
// { id, name, description }.
export async function getSpecialties({ pageIndex, pageSize, name }, signal) {
  const params = { pageIndex, pageSize };

  // name se envía solo si tiene contenido: con menos de 3 caracteres responde 400.
  if (name) {
    params.name = name;
  }

  const response = await instance.get('api/specialties', { params, signal });

  return response.data;
}

// Trae todas las especialidades, página por página, para los selectores.
export async function getAllSpecialties(signal) {
  const pageSize = 100;
  const firstPage = await getSpecialties({ pageIndex: 0, pageSize }, signal);
  const remainingPages = Math.max(0, Math.ceil(firstPage.total / pageSize) - 1);
  const pages = await Promise.all(
    Array.from({ length: remainingPages }, (_, index) =>
      getSpecialties({ pageIndex: index + 1, pageSize }, signal)
    )
  );

  return [firstPage, ...pages].flatMap(({ data }) => data);
}
