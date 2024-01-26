import HttpError from './HttpError';

export default class NotFound extends HttpError {
  constructor(message: string, code?: string) {
    super(404, message, code);
    this.name = 'Not Found';
  }
}
