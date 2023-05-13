import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetAuthTokenAction, SET_AUTH_TOKEN } from '../features/auth/store/authTypes';
import { RootState } from '../store';

const useAuthToken: () => [string | null, (token: string | null) => void] = () => {
  const dispatch = useDispatch();

  const authToken = useSelector<RootState, string | null>((state) => state.auth.authToken);

  const setAuthToken = useCallback(
    (token: string | null) => {
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: {
          token: token,
        },
      } as SetAuthTokenAction);
    },
    [dispatch],
  );

  return [authToken, setAuthToken];
};

export default useAuthToken;
