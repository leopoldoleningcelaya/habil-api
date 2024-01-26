import AuthController from '@controllers/auth.controller';
import { CredentialsDto, RefreshTokenDto } from '@dtos/auth.dto';
import { validationMiddleware } from '@middlewares';
import authMiddleware from '@middlewares/auth.middleware';
import Route from '.';

class AuthRoute extends Route {
  public path = '/auth';
  private authController: AuthController;

  protected initializeRoutes() {
    this.authController = new AuthController();
    this.router.post(
      '/login',
      [validationMiddleware(CredentialsDto, 'body')],
      this.authController.login
    );
    this.router.post(
      '/refreshToken',
      [validationMiddleware(RefreshTokenDto, 'body')],
      this.authController.refreshToken
    );
    this.router.get('/verifyToken', [authMiddleware], this.authController.verifyToken);
  }
}

export default AuthRoute;
