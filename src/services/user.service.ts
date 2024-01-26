import { UpdateUserDto, UserDto, UserEnabledDto } from '@dtos/user.dto';
import { getAuthAdapter } from '@factories/authAdapter.factory';
import { Page } from '@interfaces';
import { AuthAdapter } from '@interfaces/user.interface';
import { GetAllUsersParams } from '@params/user.param';
import { UserResponse } from '@responses/user.response';

class UserService {
  private static instance: UserService;
  private authService: AuthAdapter = getAuthAdapter();

  private constructor() {}

  public async getAllUsers(filters: GetAllUsersParams): Promise<Page<UserResponse>> {
    return this.authService.getUsers(filters);
  }

  public async getUserByUsername(username: string): Promise<UserResponse> {
    return this.authService.getUserByUsername(username);
  }

  public async addUser(userDto: UserDto): Promise<string> {
    const { username, email, password, firstName, lastName, roles } = userDto;
    return this.authService.addUser(username, email, password, firstName, lastName, roles);
  }

  public async setUserEnabled(uid: string, { enabled }: UserEnabledDto): Promise<void> {
    return this.authService.setUserEnabled(uid, enabled);
  }

  public async updateUser(
    uid: string,
    { firstName, lastName, password }: UpdateUserDto
  ): Promise<void> {
    return this.authService.updateUser(uid, firstName, lastName, password);
  }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService();
    return UserService.instance;
  }
}

export default UserService;
