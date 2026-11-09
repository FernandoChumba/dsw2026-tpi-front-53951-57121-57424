import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { getDoctors } from '../services/getDoctors';

export const PAGE_SIZE = 10;
export const MIN_SEARCH_LENGTH = 3;

// Espera antes de buscar mientras el usuario escribe, para no llamar a la API
// en cada tecla.
const SEARCH_DELAY_MS = 400;

// Estado del listado de médicos: búsqueda, página actual y resultado de la API.
// La página solo muestra lo que devuelve este hook; la llamada HTTP vive en el
// service (página → hook → service).
export default function useDoctors() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({ data: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const term = debouncedSearch.trim();
  // Con 1 o 2 caracteres el backend responde 400: se avisa y no se consulta.
  const isSearchTooShort =
    search.trim().length > 0 && search.trim().length < MIN_SEARCH_LENGTH;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (term.length > 0 && term.length < MIN_SEARCH_LENGTH) return;

    // Si el usuario cambia de página o de búsqueda antes de que llegue la
    // respuesta anterior, esa respuesta se descarta para no pisar la nueva.
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError('');

      try {
        const page = await getDoctors({
          pageIndex,
          pageSize: PAGE_SIZE,
          name: term,
        });

        if (!ignore) setResult({ data: page.data, total: page.total });
      } catch (requestError) {
        if (!ignore) setError(getApiError(requestError).message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [term, pageIndex, reloadKey]);

  // Una búsqueda nueva siempre vuelve a la primera página.
  const changeSearch = (value) => {
    setSearch(value);
    setPageIndex(0);
  };

  const reload = () => setReloadKey((key) => key + 1);

  return {
    doctors: result.data,
    total: result.total,
    pageIndex,
    pageSize: PAGE_SIZE,
    search,
    isSearchTooShort,
    isLoading,
    error,
    changeSearch,
    changePage: setPageIndex,
    reload,
  };
}
