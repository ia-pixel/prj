import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon, PlusIcon } from "@heroicons/react/solid";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [newDoctor, setNewDoctor] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: 'doctor',
    specialty: '',
    pinterestId: '',
    experience: '',
    location: '',
    rating: '',
    languages: [],
    facePhoto: ''
  });
  const [errors, setErrors] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [languageError, setLanguageError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Pour le message de confirmation

  const { user } = useSelector((state) => state.auth);

  const validLanguages = [
    "Français", "Espagnol", "Anglais", "Allemand", "Italien", "Portugais", 
    "Arabe", "Chinois", "Russe", "Japonais", "Hindi", "Néerlandais", 
    "Suédois", "Danois", "Polonais", "Turc", "Coréen", "Grec", "Finnois", 
    "Norvégien", "Tchèque", "Hongrois", "Serbe", "Bulgare", "Roumain", 
    "Indonésien", "Vietnamien", "Thaï", "Malais", "Filipino", "Swahili"
  ];

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/doctors');
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Erreur lors du chargement des docteurs:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      setDoctors(updatedDoctors);
  
      // Afficher le message de confirmation
      setConfirmationMessage('Docteur supprimé avec succès');
  
      // Masquer le message après 3 secondes
      setTimeout(() => {
        setConfirmationMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la suppression du docteur:', error);
    }
  };
  
  const validateForm = () => {
    const errors = {};
    if (!newDoctor.name) errors.name = 'Le nom est requis';
    if (!newDoctor.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newDoctor.email)) {
      errors.email = 'Email invalide';
    }
    if (!newDoctor.specialty) errors.specialty = 'La spécialité est requise';
    if (!newDoctor.experience) errors.experience = 'L\'expérience est requise';
    if (!newDoctor.location) errors.location = 'Le lieu de travail est requis';
    if (newDoctor.languages.length === 0) errors.languages = 'Les langues sont requises';
    return errors;
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }
      const addedDoctor = await response.json();
      setDoctors([...doctors, addedDoctor]);
      setShowAddModal(false);
      setSuccessMessage('Docteur ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du docteur:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
    setNewDoctor({ ...newDoctor, languages: selectedLanguages });
  };

  const handleAddLanguage = () => {
    if (validLanguages.includes(currentLanguage) && !newDoctor.languages.includes(currentLanguage)) {
      setNewDoctor({ 
        ...newDoctor, 
        languages: [...newDoctor.languages, currentLanguage] 
      });
      setCurrentLanguage('');
      setLanguageError('');
    } else {
      setLanguageError('Langue invalide ou déjà ajoutée');
    }
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  useEffect(() => {
    if (showAddModal) {
      setNewDoctor(prevState => ({
        ...prevState,
        id: generateRandomId()
      }));
    }
  }, [showAddModal]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Gestion des Docteurs</h1>

      {/* Bouton pour ouvrir la modal d'ajout */}
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors mb-6 flex items-center"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Ajouter un docteur
      </button>

      {/* Message de confirmation */}
      {confirmationMessage && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {confirmationMessage}
        </div>
      )}

      {/* Modal d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Ajouter un nouveau docteur</h2>
            <form onSubmit={handleAddDoctor}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  value={newDoctor.name}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg"
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newDoctor.email}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg"
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <input
                  type="text"
                  name="specialty"
                  placeholder="Spécialité"
                  value={newDoctor.specialty}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg"
                  required
                />
                {errors.specialty && <p className="text-red-500">{errors.specialty}</p>}
                <input
                  type="text"
                  name="experience"
                  placeholder="Expérience (années)"
                  value={newDoctor.experience}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg"
                  required
                />
                {errors.experience && <p className="text-red-500">{errors.experience}</p>}
                <input
                  type="text"
                  name="location"
                  placeholder="Lieu de travail"
                  value={newDoctor.location}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg"
                  required
                />
                {errors.location && <p className="text-red-500">{errors.location}</p>}

                {/* Ajouter une langue */}
                <input
                  type="text"
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  placeholder="Saisir une langue"
                  className="p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Ajouter
                </button>
                {languageError && <p className="text-red-500">{languageError}</p>}
                <div>
                  <strong>Langues sélectionnées :</strong>
                  <ul>
                    {newDoctor.languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </div>
                {errors.languages && <p className="text-red-500">{errors.languages}</p>}
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des docteurs avec défilement */}
      <div className="overflow-x-auto shadow-md rounded-lg max-h-[500px] relative">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 sticky top-0 z-0"> {/* L'en-tête avec un z-index de 0 */}
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Spécialité</th>
              <th className="px-6 py-3 text-left">Expérience</th>
              <th className="px-6 py-3 text-left">Lieu</th>
              <th className="px-6 py-3 text-left">Langues</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[400px]"> {/* Le corps du tableau avec défilement */}
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-b">
                <td className="px-6 py-3">{doctor.name}</td>
                <td className="px-6 py-3">{doctor.email}</td>
                <td className="px-6 py-3">{doctor.specialty}</td>
                <td className="px-6 py-3">{doctor.experience} ans</td>
                <td className="px-6 py-3">{doctor.location}</td>
                <td className="px-6 py-3">{doctor.languages.join(', ')}</td>
                <td className="px-6 py-3 text-red-500 cursor-pointer">
                  <TrashIcon
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="h-6 w-6"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message de succès */}
      {successMessage && (
        <div className="fixed top-10 left-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
