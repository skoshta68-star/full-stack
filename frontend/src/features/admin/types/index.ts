import { UserRole } from '../../../types';

export interface DashboardStats {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
  avgRating: number;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
}

export interface StoreFormData {
  name: string;
  email: string;
  address: string;
  ownerId: string;
}
