import { CredentialsDto, RefreshTokenDto } from '@dtos/auth.dto';
import { getAuthAdapter } from '@factories/authAdapter.factory';
import { AuthAdapter } from '@interfaces/user.interface';
import { LoginGrant, UserResponse } from '@responses/user.response';

class AuthService {
  private static instance: AuthService;
  private authService: AuthAdapter = getAuthAdapter();

  private constructor() {}

  public async login({ email, password }: CredentialsDto): Promise<LoginGrant> {
    return this.authService.login(email, password);
  }

  public async refreshToken({ refresh_token }: RefreshTokenDto): Promise<LoginGrant> {
    return this.authService.refreshToken(refresh_token);
  }

  public async verifyToken(token: string): Promise<UserResponse> {
    return this.authService.verifyToken(token);
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService();
    return AuthService.instance;
  }
}

export default AuthService;
