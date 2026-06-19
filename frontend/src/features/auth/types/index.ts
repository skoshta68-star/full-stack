import { User } from '../../../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DemoAccount {
  label: string;
  email: string;
  password: string;
  icon: React.ComponentType<any>;
}
