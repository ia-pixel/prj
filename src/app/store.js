// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import pagesReducer from '../features/pages/pagesSlice'; // Importe le slice des pages
import { authApi } from '../features/auth/authApi'; // Import corrigé

// Configuration de la persistance pour l'authentification
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'accessToken', 'isDarkMode'],
};

// Configuration de la persistance pour les pages (optionnel)
const pagesPersistConfig = {
  key: 'pages',
  storage,
  whitelist: ['pages'], // Persiste uniquement la liste des pages
};

// Combine les reducers avec la persistance
const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  pages: persistReducer(pagesPersistConfig, pagesReducer), // Ajoute le slice des pages
  [authApi.reducerPath]: authApi.reducer,
};

// Configure le store Redux
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactive la vérification de sérialisation pour redux-persist
    }).concat(authApi.middleware),
});

// Exporte le persistor pour redux-persist
export const persistor = persistStore(store);