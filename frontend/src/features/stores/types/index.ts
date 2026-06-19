import { User } from '../../../types';

export interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  overallRating: number;
  userRating: number | null;
}

export interface Rating {
  id: number;
  userId: number;
  storeId: number;
  rating: number;
  user?: User;
  store?: Store;
  createdAt?: string;
}
