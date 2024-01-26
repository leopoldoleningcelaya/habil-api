import { NextFunction, Request, Response } from 'express';
import HttpError from '@errors/HttpError';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const code: string = error.code || 'UNKNOWN_ERROR';

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Code:: ${code}`
    );
    res.status(status).json({ message, code });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
