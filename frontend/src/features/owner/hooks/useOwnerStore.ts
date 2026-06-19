import { useState, useEffect, useCallback } from 'react';
import { ownerApi } from '../api/owner.api';
import { StoreData } from '../types';

export function useOwnerStore() {
  const [store, setStore] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try { setStore(await ownerApi.getStoreDashboard()); }
    catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return { store, loading, error, refetch: fetchDashboard };
}
