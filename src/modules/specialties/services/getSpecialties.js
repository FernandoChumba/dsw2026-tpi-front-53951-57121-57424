import { instance } from '../../shared/api/axiosInstance';

// GET /api/specialties.
// El backend pagina: pageIndex empieza en 0 y pageSize va de 1 a 100.
// Devuelve { pageSize, pageIndex, data, total }, donde cada elemento de data es
// { id, name, description }.
export async function getSpecialties({ pageIndex, pageSize, name }) {
  const params = { pageIndex, pageSize };

  // name se envía solo si tiene contenido: con menos de 3 caracteres responde 400.
  if (name) {
    params.name = name;
  }

  const response = await instance.get('api/specialties', { params });

  return response.data;
}

// Trae todas las especialidades para los selectores.
// El backend devuelve como máximo 100 por página, así que se piden las páginas
// una por una hasta tener el total.
export async function getAllSpecialties() {
  const pageSize = 100;
  let pageIndex = 0;
  let specialties = [];
  let page;

  do {
    page = await getSpecialties({ pageIndex, pageSize });
    specialties = specialties.concat(page.data);
    pageIndex++;
    // Si una página llega vacía se corta, para no quedar en un bucle infinito.
  } while (page.data.length > 0 && specialties.length < page.total);

  return specialties;
}
