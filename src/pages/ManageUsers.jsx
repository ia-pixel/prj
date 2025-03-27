import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TrashIcon, PlusIcon } from '@heroicons/react/solid'; // Importer les icônes Trash et Plus uniquement ici

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user', facePhoto: ''});
  const [message, setMessage] = useState(null); // État pour gérer les messages
  const { user: adminUser } = useSelector((state) => state.auth);

  // Récupérer les utilisateurs avec le rôle "user" depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/users/${userId}`, { role: newRole });
      if (response.status === 200) {
        setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
        setMessage({ type: 'success', text: 'Rôle mis à jour avec succès' });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle :', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du rôle' });
    }
  };
  
  // Supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      // Afficher le message de confirmation
      setConfirmationMessage('Utilisateur supprimé avec succès');

      // Masquer le message après 3 secondes
      setTimeout(() => {
        setConfirmationMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur:', error);
    }
  };
  

  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log("Ajout utilisateur déclenché !");
  
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/api/users', newUser);
      console.log("Réponse serveur :", response.data);
      setUsers([...users, response.data]); // Mettre à jour la liste des utilisateurs
      setNewUser({ name: '', email: '', password: '', role: 'user', facePhoto: '' }); // Réinitialiser le formulaire
      setMessage({ type: 'success', text: 'Utilisateur ajouté avec succès' }); // Afficher un message de succès
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’utilisateur :', error);
      setMessage({ type: 'error', text: 'Erreur lors de l’ajout de l’utilisateur' }); // Afficher un message d'erreur
    }
  };

  // Effacer le message après quelques secondes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Gestion des utilisateurs</h1>

      {/* Afficher le message de succès ou d'erreur */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Formulaire pour ajouter un nouvel utilisateur */}
      <form onSubmit={handleAddUser} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">👤 Ajouter un utilisateur</h2>

        <div className="space-y-5">
          {/* Champ Nom */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nom"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              required
            />
            <span className="absolute left-3 top-3 text-gray-400">👤</span>
          </div>

          {/* Champ Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              required
            />
            <span className="absolute left-3 top-3 text-gray-400">📧</span>
          </div>

          {/* Champ Mot de passe */}
          <div className="relative">
            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              required
            />
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          </div>

          {/* Sélection du rôle */}
          <div className="relative">
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
            <span className="absolute left-3 top-3 text-gray-400">🎭</span>
          </div>

          {/* Bouton Ajouter */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md transform hover:scale-105"
          >
            <PlusIcon className="h-5 w-5 mr-2" /> {/* Utiliser PlusIcon ici */}
            <span>Ajouter</span>
          </button>
        </div>
      </form>

      {/* Liste des utilisateurs */}
      <div className="overflow-x-auto shadow-md rounded-lg max-h-[500px] relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left"></th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Rôle</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">Aucun utilisateur trouvé.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-6 py-3">📌</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3 text-left">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 ml-4"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;