import api from '../../../services/api';
import { StoreData } from '../types';

export const ownerApi = {
  getStoreDashboard(): Promise<StoreData> {
    return api.get('/stores/owner').then(r => r.data);
  },
  updateProfile(data: { name?: string; address?: string }): Promise<any> {
    return api.put('/auth/me', data).then(r => r.data);
  },
};
