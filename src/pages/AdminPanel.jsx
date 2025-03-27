import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addPage, deletePage, updatePage, togglePageAccessibility } from '../features/pages/pagesSlice';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const pages = useSelector((state) => state.pages.pages); // Récupère les pages depuis Redux
    const [newPageName, setNewPageName] = useState('');
    const [editingPageId, setEditingPageId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    // Gestion des messages d'erreur et de succès
    useEffect(() => {
      if (error || success) {
        const timer = setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [error, success]);
  
    // Ajouter une nouvelle page
    const handleAddPage = () => {
      if (!newPageName.trim()) {
        setError("Le nom de la page ne peut pas être vide.");
        return;
      }
  
      const pageExists = pages.some(page => page.name === newPageName);
      if (pageExists) {
        setError("Une page avec ce nom existe déjà.");
        return;
      }
  
      const confirmAdd = window.confirm(`Voulez-vous vraiment ajouter la page "${newPageName}" ?`);
      if (confirmAdd) {
        const newPage = {
          id: Date.now(),
          name: newPageName,
          path: `/${newPageName.toLowerCase()}`,
          accessible: true,
        };
        dispatch(addPage(newPage)); // Utilise l'action Redux pour ajouter une page
        setNewPageName('');
        setSuccess(`La page "${newPageName}" a été ajoutée avec succès.`);
      }
    };
  
    // Rendre une page accessible/inaccessible
    const handleToggleAccessibility = (id) => {
      const confirmToggle = window.confirm("Voulez-vous vraiment changer l'accessibilité de cette page ?");
      if (confirmToggle) {
        dispatch(togglePageAccessibility(id)); // Utilise l'action Redux pour changer l'accessibilité
        setSuccess(`L'accessibilité de la page a été modifiée.`);
      }
    };
  
    // Supprimer une page
    const handleDeletePage = (id) => {
      const pageToDelete = pages.find(page => page.id === id);
      const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer la page "${pageToDelete.name}" ?`);
      if (confirmDelete) {
        dispatch(deletePage(id)); // Utilise l'action Redux pour supprimer une page
        setSuccess(`La page "${pageToDelete.name}" a été supprimée avec succès.`);
      }
    };
  
    // Commencer l'édition d'une page
    const startEditing = (id, name) => {
      setEditingPageId(id);
      setNewPageName(name);
    };
  
    // Sauvegarder les modifications d'une page
    const handleSaveEdit = (id) => {
      if (!newPageName.trim()) {
        setError("Le nom de la page ne peut pas être vide.");
        return;
      }
  
      const pageExists = pages.some(page => page.name === newPageName && page.id !== id);
      if (pageExists) {
        setError("Une page avec ce nom existe déjà.");
        return;
      }
  
      const confirmSave = window.confirm(`Voulez-vous vraiment sauvegarder les modifications pour la page "${newPageName}" ?`);
      if (confirmSave) {
        dispatch(updatePage({ id, name: newPageName })); // Utilise l'action Redux pour mettre à jour une page
        setEditingPageId(null);
        setSuccess(`La page a été modifiée avec succès.`);
      }
    };
  
    return (
      <motion.div 
        className="min-h-screen bg-[#f3f4f6] py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#4938e4] mb-4">Panneau d'administration</h1>
            <p className="text-xl text-gray-600">Gérez les pages de votre site</p>
          </div>
  
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* Formulaire d'ajout de page */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="Nom de la nouvelle page"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#4938e4] focus:border-transparent"
                />
                <button
                  onClick={handleAddPage}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Ajouter
                </button>
              </div>
  
              {/* Liste des pages */}
              {pages.map(page => (
                <div key={page.id} className="flex justify-between items-center">
                  {editingPageId === page.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newPageName}
                        onChange={(e) => setNewPageName(e.target.value)}
                        className="px-2 py-1 border rounded-lg"
                      />
                      <button
                        onClick={() => handleSaveEdit(page.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  ) : (
                    <span className="text-lg font-medium text-gray-700">{page.name}</span>
                  )}
                  <div className="space-x-2">
                    <button
                      onClick={() => handleToggleAccessibility(page.id)}
                      className={`px-4 py-2 rounded-lg ${
                        page.accessible ? 'bg-red-500' : 'bg-green-500'
                      } text-white`}
                    >
                      {page.accessible ? 'Rendre inaccessible' : 'Rendre accessible'}
                    </button>
                    <button
                      onClick={() => startEditing(page.id, page.name)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeletePage(page.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Messages d'erreur et de succès */}
        {error && (
          <motion.div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </motion.div>
        )}
  
        {success && (
          <motion.div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {success}
          </motion.div>
        )}
      </motion.div>
    );
  };
  
  export default AdminPanel;