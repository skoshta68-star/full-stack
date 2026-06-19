import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../api/admin.api';
import { User } from '../../../types';
import { DashboardStats } from '../types';

export function useAdmin() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async () => {
    try { setStats(await adminApi.getStats()); }
    catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
