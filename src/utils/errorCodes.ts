import { ApolloError } from '@apollo/client';

export enum ErrorCodes {
  InvalidPhoneNumber = 'invalid_phone_number',
  PhoneNumberInvalid = 'phone_number_invalid',
  IncorrectVerificationCode = 'incorrect_verification_code',
  TooManyCheckAttempts = 'too_many_check_attempts',
  TooManySendAttempts = 'too_many_send_attempts',
}

export const errorCodesToMessage: { [key in string]: string } = {
  [ErrorCodes.InvalidPhoneNumber]: 'Invalid mobile number. Retry or enter a new number.',
  [ErrorCodes.PhoneNumberInvalid]: 'Invalid mobile number. Retry or enter a new number.',
  [ErrorCodes.IncorrectVerificationCode]: 'Incorrect pin. Try again or resend code..',
  [ErrorCodes.TooManyCheckAttempts]: 'Too many attempts. Try again later.',
  [ErrorCodes.TooManySendAttempts]: 'Too many attempts. Try again later.',
};

export const apolloErrorToString: (error: ApolloError) => string = (error) => {
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
