import { NextFunction, Request, Response } from 'express';
import { UserResponse } from '@responses/auth.response';
import AuthService from '@services/auth.service';

const authService: AuthService = AuthService.getInstance();

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token: string = req.header('Authorization')?.split(' ')[1] as string;
  try {
    const userResponse: UserResponse = await authService.verifyToken(token);
    res.locals.auth = userResponse;
    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
