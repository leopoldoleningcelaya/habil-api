import { UserRoles } from '@enums';
import { GetAllUsersParams } from '@params/user.param';
import { Page } from '.';
import { User } from './user.interface';

export type AuthRecord = User;

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  roles: string[];
  createdTimestamp: number;
}

export interface AuthAdapter {
  login(email: string, password: string): Promise<LoginGrant>;
  refreshToken(refreshToken: string): Promise<LoginGrant>;
  addUser(username: string, email: string, password: string, roles: UserRoles[]): Promise<string>;
  getUserById(id: string): Promise<AuthUser>;
  getUserByUsername(username: string): Promise<AuthUser>;
  getUsers(filters: GetAllUsersParams): Promise<Page<AuthUser>>;
  modifyUserRoles(id: string, roles: UserRoles[]): Promise<void>;
  setUserEnabled(id: string, enabled: boolean): Promise<void>;
  verifyToken(token: string): Promise<AuthUser>;
  changeUserPassword(id: string, password: string): Promise<void>;
}

export class LoginGrant {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
}
