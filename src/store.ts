import { SingleViewItemsState } from '@features/singleViewItems/store/singleViewItemsTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { PersistState } from 'redux-persist/es/types';
import thunk, { ThunkDispatch } from 'redux-thunk';
import auth from './features/auth/store/authReducer';
import { AuthState } from './features/auth/store/authTypes';
import singleViewItems from './features/singleViewItems/store/singleViewItemsReducer';

const sensitiveStorage = createSensitiveStorage();

const mainPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: sensitiveStorage,
};

export interface RootState {
  auth: AuthState;
  singleViewItems: SingleViewItemsState;
  _persist?: PersistState;
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  singleViewItems: persistReducer(mainPersistConfig, singleViewItems),
});

const middleware = [thunk];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logger } = require('redux-logger');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
  middleware.push(logger);
}

const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

export default store;
export const persistor = persistStore(store);

// A correctly-typed wrapper for Redux hooks.
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
