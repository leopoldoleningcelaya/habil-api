import HttpError from './HttpError';

export default class ValidationError extends HttpError {
  constructor(message: string) {
    super(404, message, 'VALIDATION_ERROR');
    this.name = 'Validation Error';
  }
}
