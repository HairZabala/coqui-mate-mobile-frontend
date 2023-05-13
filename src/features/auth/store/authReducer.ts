import { AnyAction } from 'redux';
import { AuthActions, AuthState, LOGOUT, SetAuthTokenAction, SET_AUTH_TOKEN, TOKEN_EXPIRED } from './authTypes';

const initialState: AuthState = {
  authToken: null,
};

export default function authReducer(state = initialState, action: AuthActions | AnyAction): AuthState {
  switch (action.type) {
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        authToken: (action as SetAuthTokenAction).payload!.token,
      };
    }

    case TOKEN_EXPIRED:
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
