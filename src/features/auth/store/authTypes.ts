export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

export interface AuthState {
  authToken: string | null;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: {
    token: string;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
  payload: null;
}

export interface TokenExpiredAction {
  type: typeof TOKEN_EXPIRED;
}

export type AuthActions = SetAuthTokenAction | LogoutAction | TokenExpiredAction;
