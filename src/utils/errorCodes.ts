import { ApolloError } from '@apollo/client';

export enum ErrorCodes {
  InvalidCredentials = 'invalid_credentials',
  UserNotFound = 'user_not_found',
  TooManyCheckAttempts = 'too_many_check_attempts',
  TooManySendAttempts = 'too_many_send_attempts',
}

export const errorCodesToMessage: { [key in string]: string } = {
  [ErrorCodes.InvalidCredentials]: 'Credenciales inválidas. Intente nuevamente',
  [ErrorCodes.UserNotFound]: 'Credenciales inválidas. Intente nuevamente',
  [ErrorCodes.TooManyCheckAttempts]: 'Too many attempts. Try again later.',
  [ErrorCodes.TooManySendAttempts]: 'Too many attempts. Try again later.',
};

export const apolloErrorToString: (error: ApolloError) => string = (error) => {
  console.debug(error);
  if (error.message === 'Unexpected token < in JSON at position 0') {
    return 'Unexpected server error';
  } else if (error.message in errorCodesToMessage) {
    return errorCodesToMessage[error.message];
  } else if (error.networkError) {
    return 'Encountered network error.';
  } else {
    return 'An unexpected error occurred.';
  }
};
