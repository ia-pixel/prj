// src/app/persistor.js
import { persistStore } from 'redux-persist';
import { store } from './store';

export const persistor = persistStore(store);

// Optionnel : Purger le store si nécessaire
export const purgeStore = async () => {
  await persistor.purge();
};