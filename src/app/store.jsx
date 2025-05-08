import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './../features/createSlice'; 
import { carWashBillApi } from '../features/Api';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  [carWashBillApi.reducerPath]: carWashBillApi.reducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist user slice
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store setup
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required when using redux-persist
    }).concat(carWashBillApi.middleware),
});

// Persistor
export const persistor = persistStore(store);
