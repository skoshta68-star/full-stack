import api from '../../../services/api';
import { User } from '../../../types';
import { DashboardStats, StoreFormData, UserFormData } from '../types';

export const adminApi = {
  getStats(): Promise<DashboardStats> {
    return api.get('/users/stats').then(r => r.data);
  },
  getUsers(params: Record<string, string>): Promise<{ users: User[]; total: number }> {
    return api.get(`/users?${new URLSearchParams(params).toString()}`).then(r => r.data);
  },
  getUser(id: number): Promise<User> {
    return api.get(`/users/${id}`).then(r => r.data);
  },
  createUser(data: UserFormData): Promise<User> {
    return api.post('/users', data).then(r => r.data);
  },
  updateUser(id: number, data: Partial<UserFormData>): Promise<User> {
    return api.put(`/users/${id}`, data).then(r => r.data);
  },
  deleteUser(id: number): Promise<any> {
    return api.delete(`/users/${id}`).then(r => r.data);
  },
  getStores(params: Record<string, string>): Promise<{ stores: any[]; total: number }> {
    return api.get(`/stores?${new URLSearchParams(params).toString()}`).then(r => r.data);
  },
  createStore(data: StoreFormData): Promise<any> {
    return api.post('/stores', data).then(r => r.data);
  },
  updateStore(id: number, data: Partial<StoreFormData>): Promise<any> {
    return api.put(`/stores/${id}`, data).then(r => r.data);
  },
  deleteStore(id: number): Promise<any> {
    return api.delete(`/stores/${id}`).then(r => r.data);
  },
  getStoreOwners(): Promise<User[]> {
    return api.get('/users?role=store_owner&limit=100').then(r => r.data.users);
  },
};
