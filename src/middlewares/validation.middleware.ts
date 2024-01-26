import { plainToInstance } from 'class-transformer';
import { validate, ValidationError as IValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import ValidationError from '@errors/ValidationError';

const errorsToMessage = (errors: IValidationError[]): string => {
  return errors
    .map((error: IValidationError) => {
      if (error.constraints) {
        return Object.values(error.constraints);
      }
      return errorsToMessage(error.children);
    })
    .join(', ');
};

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, _res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: IValidationError[]) => {
      if (errors.length > 0) {
        const message = errorsToMessage(errors);
        next(new ValidationError(message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
