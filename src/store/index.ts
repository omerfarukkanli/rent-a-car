import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authService } from './service/auth.service';
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
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';

export const PERSIST_CONFIG_KEY = 'persist_rentt_a_car';

const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  storage: storage,
};

const rootReducer = combineReducers({
  authendication: authendicationSlice.reducer,
  [authService.reducerPath]: authService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authService.middleware),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
