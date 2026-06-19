import { useState, useEffect } from 'react';
import { ownerApi } from '../api/owner.api';
import { StoreData } from '../types';

export function useOwnerDashboard() {
  const [store, setStore] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratOrder, setRatOrder] = useState<'asc' | 'desc'>('asc');
  const [ratOrderBy, setRatOrderBy] = useState<'rating' | 'date'>('date');

  useEffect(() => {
    const fetch = async () => {
      try { setStore(await ownerApi.getStoreDashboard()); }
      catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleSortRatings = (field: 'rating' | 'date') => {
    const a = ratOrderBy === field && ratOrder === 'asc';
    setRatOrder(a ? 'desc' : 'asc');
    setRatOrderBy(field);
  };

  const checkAsc = (a: any, b: any) => a < b ? -1 : 1;
  const sortedRatings = store ? [...store.ratings].sort((a, b) => {
    const val = ratOrderBy === 'rating' ? checkAsc(a.rating, b.rating) : checkAsc(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime());
    return ratOrder === 'asc' ? val : -val;
  }) : [];

  return { store, loading, error, ratOrder, ratOrderBy, sortedRatings, handleSortRatings };
}
