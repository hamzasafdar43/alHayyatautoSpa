import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './../features/createSlice'; 

// Persist configuration
const persistConfig = {
  key: 'root',
  storage, 
  whitelist: ['user'],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Store configuration with persisted reducer
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

// Persistor (needed for PersistGate in your app)
export const persistor = persistStore(store);
