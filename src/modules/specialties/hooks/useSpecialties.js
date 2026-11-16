import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { getSpecialties } from '../services/getSpecialties';

const pageSize = 10;
const emptyPage = { data: [], total: 0 };

export default function useSpecialties() {
  const [query, setQuery] = useState({ search: '', pageIndex: 0 });
  const [response, setResponse] = useState(null);
  const { search, pageIndex } = query;
  const name = search.trim();
  const isTooShort = name.length > 0 && name.length < 3;
  const current = response?.query === query ? response : null;

  useEffect(() => {
    if (isTooShort) return;

    let active = true;
    const timer = setTimeout(
      async () => {
        try {
          const page = await getSpecialties({ pageIndex, pageSize, name });

          if (active) setResponse({ query, page, error: '' });
        } catch (error) {
          if (active)
            setResponse({
              query,
              page: emptyPage,
              error: getApiError(error).message,
            });
        }
      },
      name ? 300 : 0
    );

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isTooShort, name, pageIndex, query]);

  return {
    search,
    pageIndex,
    pageSize,
    isTooShort,
    isLoading: !isTooShort && !current,
    error: current?.error ?? '',
    page: current?.page ?? emptyPage,
    changeSearch: (value) => setQuery({ search: value, pageIndex: 0 }),
    changePage: (value) => setQuery({ search, pageIndex: value }),
    retry: () => setQuery({ ...query }),
  };
}
