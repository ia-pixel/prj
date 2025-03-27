// features/pages/pagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// État initial des pages
const initialState = {
  pages: [
    { id: 1, name: 'Accueil', path: '/', accessible: true },
    { id: 2, name: 'Rendez-vous', path: '/appointment', accessible: true },
    { id: 3, name: 'Contact', path: '/contact', accessible: true },
    { id: 4, name: 'Scanner', path: '/scanner', accessible: true, icon: 'FiHeart' },
    { id: 5, name: 'Research', path: '/research', accessible: true, icon: 'FiMessageCircle' },
    { id: 6, name: 'Chatbot', path: '/chatbot', accessible: true, icon: 'Bot' },
  ],
};

// Crée le slice pour les pages
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage: (state, action) => {
      state.pages.push(action.payload);
    },
    deletePage: (state, action) => {
      state.pages = state.pages.filter(page => page.id !== action.payload);
    },
    updatePage: (state, action) => {
      const { id, name } = action.payload;
      const page = state.pages.find(page => page.id === id);
      if (page) {
        page.name = name;
      }
    },
    togglePageAccessibility: (state, action) => {
      const page = state.pages.find(page => page.id === action.payload);
      if (page) {
        page.accessible = !page.accessible;
      }
    },
  },
});

// Exporte les actions
export const { addPage, deletePage, updatePage, togglePageAccessibility } = pagesSlice.actions;

// Exporte le reducer
export default pagesSlice.reducer;