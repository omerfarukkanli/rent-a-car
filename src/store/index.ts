import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authendicationSlice } from './slices/authendication.slice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Storage } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { carService } from './service/car.service';
import { authService } from './service/auth.service';

export const PERSIST_CONFIG_KEY = 'persist_rentt_a_car';

interface StorageAdapter extends Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const createNoopStorage = (): StorageAdapter => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve();
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export const storage: StorageAdapter = (
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()
) as StorageAdapter;

const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  authendication: authendicationSlice.reducer,
  [authService.reducerPath]: authService.reducer,
  [carService.reducerPath]: carService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authService.middleware, carService.middleware),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
