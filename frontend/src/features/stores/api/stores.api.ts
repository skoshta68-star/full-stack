import api from '../../../services/api';
import { Store } from '../types';

export const storesApi = {
  getAll(params: Record<string, string>): Promise<{ stores: Store[]; total: number }> {
    return api.get(`/stores?${new URLSearchParams(params).toString()}`).then(r => r.data);
  },
  getById(id: number): Promise<Store> {
    return api.get(`/stores/${id}`).then(r => r.data);
  },
};
