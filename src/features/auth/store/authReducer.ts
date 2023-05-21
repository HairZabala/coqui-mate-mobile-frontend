import { AnyAction } from 'redux';
import {
  AuthActions,
  AuthState,
  LOGOUT,
  SET_AUTH_TOKEN,
  SET_REMEMBER_ME,
  SetAuthTokenAction,
  SetRememberMeAction,
  TOKEN_EXPIRED,
} from './authTypes';

const initialState: AuthState = {
  authToken: null,
  rememberMe: false,
  emailRemember: '',
};

export default function authReducer(state = initialState, action: AuthActions | AnyAction): AuthState {
  switch (action.type) {
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        authToken: (action as SetAuthTokenAction).payload!.token,
      };
    }
    case SET_REMEMBER_ME: {
      return {
        ...state,
        rememberMe: (action as SetRememberMeAction).payload!.rememberMe,
        emailRemember: (action as SetRememberMeAction).payload!.emailRemember,
      };
    }

    case TOKEN_EXPIRED:
    case LOGOUT: {
      return {
        ...state,
        authToken: null,
      };
    }
    default: {
      return state;
    }
  }
}
