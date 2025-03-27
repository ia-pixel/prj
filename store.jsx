// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Importe ton slice d'authentification
import pagesReducer from '../features/pages/pagesSlice'; // Importe le slice des pages que nous allons créer

// Configure le store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer, // Slice pour l'authentification
    pages: pagesReducer, // Slice pour la gestion des pages
  },
});