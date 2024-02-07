import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@errors';
import { User } from '@interfaces/user.interface';

function roleMiddleware(authorizedRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!res.locals.auth) {
        console.debug(
          'res.locals.auth already is not set, maybe you forgot to set the authMiddleware before this one?'
        );
        throw new Error('User not authenticated');
      }
      const { roles }: User = res.locals.auth;
      if (!roles.some((role) => authorizedRoles.includes(role)))
        // TODO: extract error
        throw new HttpError(403, 'User not authorized', 'UNAUTHORIZED');

      next();
    } catch (e) {
      next(e);
    }
  };
}

export default roleMiddleware;
