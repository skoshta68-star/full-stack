import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin.api';

export function useAdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0, avgRating: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentStores, setRecentStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, usersData, storesData] = await Promise.all([
          adminApi.getStats(),
          adminApi.getUsers({ sortBy: 'name', sortOrder: 'ASC', limit: '5' }),
          adminApi.getStores({ sortBy: 'name', sortOrder: 'ASC', limit: '5' })
        ]);
        setStats(statsData);
        setRecentUsers(usersData.users);
        setRecentStores(storesData.stores);
      } catch (err: any) { setError(err.response?.data?.message || 'Failed'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return { stats, recentUsers, recentStores, loading, error };
}
