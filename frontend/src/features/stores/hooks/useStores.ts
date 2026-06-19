import { useState, useEffect, useCallback } from 'react';
import { storesApi } from '../api/stores.api';
import { ratingsApi } from '../api/ratings.api';
import { Store } from '../types';

interface UseStoresOptions {
  defaultSortBy?: string;
  defaultSortOrder?: 'ASC' | 'DESC';
}

export function useStores(options: UseStoresOptions = {}) {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState(options.defaultSortBy || 'name');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>(options.defaultSortOrder || 'ASC');
  const [search, setSearch] = useState({ name: '', address: '' });

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { sortBy, sortOrder };
      Object.entries(search).forEach(([k, v]) => { if (v) params[k] = v; });
      setStores((await storesApi.getAll(params)).stores);
    } catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  }, [sortBy, sortOrder, search]);

  useEffect(() => { fetchStores(); }, [fetchStores]);

  const rateStore = useCallback(async (storeId: number, rating: number, isUpdate: boolean) => {
    if (isUpdate) await ratingsApi.update(storeId, rating);
    else await ratingsApi.submit(storeId, rating);
    await fetchStores();
  }, [fetchStores]);

  return { stores, loading, error, sortBy, sortOrder, setSortBy, setSortOrder, search, setSearch, refetch: fetchStores, rateStore };
}
