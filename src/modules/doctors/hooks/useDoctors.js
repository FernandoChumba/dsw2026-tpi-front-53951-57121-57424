import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { deleteDoctor } from '../services/deleteDoctor';
import { getDoctors } from '../services/getDoctors';

export const PAGE_SIZE = 10;
export const MIN_SEARCH_LENGTH = 3;

const SEARCH_DELAY_MS = 400;
const emptyPage = { data: [], total: 0 };

export default function useDoctors() {
  const [query, setQuery] = useState({ search: '', pageIndex: 0 });
  const [response, setResponse] = useState(null);
  const { search, pageIndex } = query;
  const name = search.trim();
  const isSearchTooShort = name.length > 0 && name.length < MIN_SEARCH_LENGTH;
  const current = response?.query === query ? response : null;
  const page = current?.page ?? emptyPage;

  useEffect(() => {
    if (isSearchTooShort) return;

    let active = true;
    const timer = setTimeout(
      async () => {
        try {
          const result = await getDoctors({
            pageIndex,
            pageSize: PAGE_SIZE,
            name,
          });

          if (active) setResponse({ query, page: result });
        } catch (error) {
          if (active) setResponse({ query, error: getApiError(error).message });
        }
      },
      name ? SEARCH_DELAY_MS : 0
    );

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isSearchTooShort, name, pageIndex, query]);

  async function removeDoctor(id) {
    await deleteDoctor(id);
    setQuery((previous) => ({
      ...previous,
      pageIndex:
        previous === query && page.data.length === 1 && pageIndex > 0
          ? pageIndex - 1
          : previous.pageIndex,
    }));
  }

  return {
    doctors: page.data,
    total: page.total,
    pageIndex,
    pageSize: PAGE_SIZE,
    search,
    isSearchTooShort,
    isLoading: !isSearchTooShort && !current,
    error: current?.error ?? '',
    changeSearch: (value) => setQuery({ search: value, pageIndex: 0 }),
    changePage: (value) =>
      setQuery((previous) => ({ ...previous, pageIndex: value })),
    reload: () => setQuery((previous) => ({ ...previous })),
    removeDoctor,
  };
}
