import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useProductsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        if (searchInput) {
          next.set('search', searchInput);
        } else {
          next.delete('search');
        }

        next.set('page', '1');
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const setParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }

      next.set('page', '1');
      return next;
    });
  };

  const setCategory = (value: string) => setParam('category', value);

  const clearSearch = () => {
    setSearchInput('');
    setParam('search', '');
  };

  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    search,
    category,
    page,
    searchInput,
    setSearchInput,
    setCategory,
    clearSearch,
    setPage,
  };
};
