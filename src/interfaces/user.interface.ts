import { UserRoles } from '@enums';
import { GetAllUsersParams } from '@params/user.param';
import { LoginGrant } from '@responses/user.response';
import { Page } from '.';

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
  getUserByUid(uId: string): Promise<AuthUser>;
  getUserByUsername(username: string): Promise<AuthUser>;
  getUsers(filters: GetAllUsersParams): Promise<Page<AuthUser>>;
  modifyUserRoles(uid: string, roles: UserRoles[]): Promise<void>;
  setUserEnabled(uid: string, enabled: boolean): Promise<void>;
  verifyToken(token: string): Promise<AuthUser>;
  changePassword(uid: string, password: string): Promise<void>;
}
