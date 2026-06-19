import { Request } from 'express';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  STORE_OWNER = 'store_owner',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  role: UserRole;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStore {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: IJwtPayload;
}
