export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const SET_REMEMBER_ME = 'SET_REMEMBER_ME';

export interface AuthState {
  authToken: string | null;
  rememberMe: boolean;
  emailRemember: string;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: {
    token: string;
  };
}

export interface SetRememberMeAction {
  type: typeof SET_REMEMBER_ME;
  payload: {
    rememberMe: boolean;
    emailRemember: string;
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
