export class UserResponse {
  id: string;
  email: string;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  roles: string[];
  createdTimestamp: number;
}
