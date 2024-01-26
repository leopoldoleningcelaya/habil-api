import UsersController from '@controllers/user.controller';
import { ChangeUserPasswordDto, UserDto, UserEnabledDto } from '@dtos/user.dto';
import { UserRoles } from '@enums';
import { roleMiddleware, validationMiddleware } from '@middlewares';
import authMiddleware from '@middlewares/auth.middleware';
import { GetAllUsersParams } from '@params/user.param';
import Route from '@routes';

class UsersRoute extends Route {
  public path = '/users';
  private usersController: UsersController;

  protected initializeMiddlewares(): void {
    this.router.use(authMiddleware);
  }

  protected initializeRoutes() {
    this.usersController = new UsersController();

    this.router.get(
      '',
      [roleMiddleware([UserRoles.ADMIN]), validationMiddleware(GetAllUsersParams, 'query')],
      this.usersController.getAllUsers
    );

    this.router.get(
      '/:username',
      [roleMiddleware([UserRoles.ADMIN])],
      this.usersController.getUser
    );

    this.router.post(
      '/',
      [roleMiddleware([UserRoles.ADMIN]), validationMiddleware(UserDto, 'body')],
      this.usersController.addUser
    );
    this.router.patch(
      '/:id/enabled',
      [roleMiddleware([UserRoles.ADMIN]), validationMiddleware(UserEnabledDto, 'body')],
      this.usersController.setUserEnabled
    );
    this.router.patch(
      '/password',
      [validationMiddleware(ChangeUserPasswordDto, 'body')],
      this.usersController.changeUserPassword
    );
  }
}

export default UsersRoute;
