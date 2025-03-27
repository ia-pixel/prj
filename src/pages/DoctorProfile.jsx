import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';
import axios from 'axios';

const DoctorProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // État pour gérer les champs modifiables
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    specialty: user.specialty,
    experience: user.experience,
    location: user.location,
    rating: user.rating,
    languages: user.languages.join(", "), // Convertir le tableau en chaîne pour l'input
  });
  const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir les langues en tableau
    const updatedUser = {
      ...user,
      ...formData,
      languages: formData.languages.split(",").map((lang) => lang.trim()), // Convertir la chaîne en tableau
    };

    try {
      // Envoyer les modifications au serveur
      const response = await axios.put(`http://localhost:5001/api/users/${user.id}`, updatedUser);

      // Mettre à jour l'état Redux
      dispatch(updateUser(updatedUser));

      // Afficher un message de succès
      setSuccessMessage('Modifications enregistrées avec succès !');

      // Désactiver le mode édition après 2 secondes
      setTimeout(() => {
        setEditMode(false);
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      setSuccessMessage('Erreur lors de la mise à jour. Veuillez réessayer.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Profil du Docteur</h1>

      {successMessage && (
        <div className={`p-4 mb-6 rounded-lg ${successMessage.includes('Erreur') ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : 'bg-green-100 border-l-4 border-green-500 text-green-700'}`}>
          {successMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Informations personnelles */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-700">Informations personnelles</h2>
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Enregistrer
              </button>
            </form>
          ) : (
            <>
              <p className="text-gray-600 mt-2">Nom: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </>
          )}
        </div>

        {/* Informations professionnelles */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-700">Informations professionnelles</h2>
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Spécialité</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expérience (années)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Localisation</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Note (/5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Langues (séparées par des virgules)</label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Enregistrer
              </button>
            </form>
          ) : (
            <>
              <p className="text-gray-600 mt-2">Spécialité: {user.specialty}</p>
              <p className="text-gray-600">Expérience: {user.experience} ans</p>
              <p className="text-gray-600">Localisation: {user.location}</p>
              <p className="text-gray-600">Note: {user.rating}/5</p>
              <p className="text-gray-600">Langues: {user.languages.join(", ")}</p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          {editMode ? (
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={() => setEditMode(false)}
            >
              Annuler
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => setEditMode(true)}
            >
              Modifier le profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;