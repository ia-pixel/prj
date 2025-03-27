import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Appointment = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    reason: '',
    doctor: null, // Stocke le médecin sélectionné
    user: user, // Utilisateur connecté
    scan: JSON.parse(localStorage.getItem('scans')) || [], // Scan de l'utilisateur
  });
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]); // Liste des médecins
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  // Charger les médecins au montage du composant
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des médecins :', error);
      }
    };

    fetchDoctors();
  }, []);

  // Liste des types de rendez-vous
  const appointmentTypes = [
    { id: 1, type: 'Cardiologie' },
    { id: 2, type: 'Dermatologie' },
    { id: 3, type: 'Pédiatrie' },
    { id: 4, type: 'Neurologie' },
    { id: 5, type: 'Chirurgie' },
    { id: 6, type: 'Psychiatrie' },
    { id: 7, type: 'Radiologie' },
  ];

  // Filtrer les médecins en fonction du type de rendez-vous sélectionné
  const filterDoctors = (type) => {
    const filtered = doctors.filter((doctor) => doctor.specialty === type);
    setFilteredDoctors(filtered);
  };

  // Gérer la sélection du type de rendez-vous
  const handleAppointmentTypeChange = (e) => {
    const selectedType = appointmentTypes.find((type) => type.id === parseInt(e.target.value));
    setSelectedAppointmentType(selectedType);
    filterDoctors(selectedType.type);
    setAppointment({ ...appointment, doctor: null }); // Réinitialiser la sélection du médecin
  };

  // Gérer la sélection du médecin
  const handleDoctorSelection = (doctor) => {
    setAppointment({ ...appointment, doctor });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!appointment.date || !appointment.time || !appointment.reason || !appointment.doctor) {
      setError('Tous les champs doivent être remplis.');
      setConfirmation('');
      return;
    }

    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const newAppointment = {
      id: Date.now(), // ID unique pour le rendez-vous
      ...appointment,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        scan: appointment.scan[appointment.scan.length - 1] || null, // Dernier scan
      },
    };
    savedAppointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(savedAppointments));

    setError('');
    setConfirmation(
      `Rendez-vous confirmé pour le ${appointment.date} à ${appointment.time} avec ${appointment.doctor.name}. Motif: ${appointment.reason}`
    );
    setAppointment({ date: '', time: '', reason: '', doctor: null });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Prendre un rendez-vous</h1>

      {/* Affichage des erreurs */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Affichage de la confirmation */}
      {confirmation && <div className="text-green-500 text-center mb-4">{confirmation}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sélection du type de rendez-vous */}
        <div>
          <label htmlFor="appointmentType" className="block text-lg font-medium mb-2">
            Type de rendez-vous
          </label>
          <select
            id="appointmentType"
            name="appointmentType"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleAppointmentTypeChange}
          >
            <option value="">Sélectionnez un type de rendez-vous</option>
            {appointmentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>

        {/* Sélection du médecin */}
        {selectedAppointmentType && (
          <div>
            <label className="block text-lg font-medium mb-2">Médecins disponibles</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                    appointment.doctor?.id === doctor.id ? 'bg-blue-50' : 'bg-white'
                  }`}
                  onClick={() => handleDoctorSelection(doctor)}
                >
                 <div className="flex items-center space-x-4">
  <iframe
    src={`https://assets.pinterest.com/ext/embed.html?id=${doctor.pinterestId}`}
    height="150"
    width="150"
    frameBorder="0"
    scrolling="no"
    className="rounded-full"
  ></iframe>
  <div>
    <h3 className="text-xl font-semibold">{doctor.name}</h3>
    <p className="text-gray-600">{doctor.specialty}</p>
  </div>
</div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Expérience :</span> {doctor.experience} ans
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Localisation :</span> {doctor.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Note :</span> {doctor.rating}/5
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Langues :</span> {doctor.languages.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Afficher le médecin sélectionné */}
        {appointment.doctor && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold">Médecin sélectionné :</h3>
            <p className="text-gray-600">{appointment.doctor.name}</p>
          </div>
        )}

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-lg font-medium mb-2">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={appointment.date}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
          />
        </div>

        {/* Heure */}
        <div>
          <label htmlFor="time" className="block text-lg font-medium mb-2">
            Heure
          </label>
          <input
            id="time"
            name="time"
            type="time"
            value={appointment.time}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
          />
        </div>

        {/* Motif */}
        <div>
          <label htmlFor="reason" className="block text-lg font-medium mb-2">
            Motif
          </label>
          <textarea
            id="reason"
            name="reason"
            value={appointment.reason}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
          />
        </div>

        {/* Bouton de confirmation */}
        <button
          type="submit"
          className="bg-[#4938e4] text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full transition-colors text-lg"
        >
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default Appointment;