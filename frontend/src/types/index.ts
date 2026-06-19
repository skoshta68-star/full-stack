export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  STORE_OWNER = 'store_owner',
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: UserRole;
  averageRating?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
