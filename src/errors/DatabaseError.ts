import HttpError from './HttpError';

export default class UserClockInLimitExceeded extends HttpError {
  constructor(message: string) {
    super(400, message, 'USER_CLOCK_IN_LIMIT_EXCEEDED');
    this.name = 'User reached clock in limit';
  }
}
