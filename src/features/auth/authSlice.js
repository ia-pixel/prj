import { createSlice } from '@reduxjs/toolkit';

// Charger l'état initial depuis localStorage
const loadStateFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  const storedAccessToken = localStorage.getItem('accessToken');
  const storedRole = localStorage.getItem('role');
  const storedIsDarkMode = localStorage.getItem('isDarkMode');

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: storedAccessToken || null,
    role: storedRole || null,
    isDarkMode: storedIsDarkMode === 'true', // Convertir en booléen
  };
};

const initialState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.role = user.role;

      // Sauvegarder dans localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', user.role);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;
      state.isDarkMode = false;

      // Supprimer de localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      localStorage.removeItem('isDarkMode');
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Sauvegarder dans localStorage
      localStorage.setItem('isDarkMode', state.isDarkMode);
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      // Mettre à jour l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, toggleDarkMode, updateUser } = authSlice.actions;
export default authSlice.reducer;