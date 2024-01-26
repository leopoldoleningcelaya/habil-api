import { NextFunction, Request, Response } from 'express';
import { CredentialsDto, RefreshTokenDto } from '@dtos/auth.dto';
import AuthService from '@services/auth.service';

class AuthController {
  public authService: AuthService = AuthService.getInstance();

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const credentialsDto: CredentialsDto = req.body;
      const response = await this.authService.login(credentialsDto);
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshTokenDto: RefreshTokenDto = req.body;
      const response = await this.authService.refreshToken(refreshTokenDto);
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).send({ data: res.locals.auth, message: 'Token verified' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export default AuthController;
