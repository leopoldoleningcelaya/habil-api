import { HttpError, NotFound } from '.';

export class AuthInvalidLogin extends HttpError {
  constructor(message: string) {
    super(401, message, 'AUTH_INVALID_LOGIN');
    this.name = 'Invalid user credentials';
  }
}

export class UserAlreadyExists extends HttpError {
  constructor(message: string) {
    super(409, message, 'USER_ALREADY_EXISTS');
    this.name = 'User exists with same username';
  }
}

export class InvalidToken extends HttpError {
  constructor(message = 'Invalid token') {
    super(401, message, 'INVALID_TOKEN');
    this.name = 'Access token is invalid';
  }
}

export class InvalidRefreshToken extends HttpError {
  constructor(message: string) {
    super(400, message, 'INVALID_REFRESH_TOKEN');
    this.name = 'Refresh token is invalid';
  }
}

export class UserNotFound extends NotFound {
  constructor(message: string) {
    super(message, 'USER_NOT_FOUND');
    this.name = 'User not found';
  }
}
