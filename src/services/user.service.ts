import { ChangeUserPasswordDto, UserDto, UserEnabledDto } from '@dtos/user.dto';
import { getAuthAdapter } from '@factories/authAdapter.factory';
import { Page } from '@interfaces';
import { AuthAdapter } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import { GetAllUsersParams } from '@params/user.param';

class UserService {
  private static instance: UserService;
  private authService: AuthAdapter = getAuthAdapter();

  private constructor() {}

  public async getAllUsers(filters: GetAllUsersParams): Promise<Page<User>> {
    return this.authService.getUsers(filters);
  }

  public async getUserByUsername(username: string): Promise<User> {
    return this.authService.getUserByUsername(username);
  }

  public async addUser(userDto: UserDto): Promise<string> {
    const { username, email, password, roles } = userDto;
    return this.authService.addUser(username, email, password, roles);
  }

  public async setUserEnabled(id: string, { enabled }: UserEnabledDto): Promise<void> {
    return this.authService.setUserEnabled(id, enabled);
  }

  public async changeUserPassword(id: string, { password }: ChangeUserPasswordDto): Promise<void> {
    return this.authService.changeUserPassword(id, password);
  }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService();
    return UserService.instance;
  }
}

export default UserService;
