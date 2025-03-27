import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importer les icônes de modification et de suppression

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Simuler la récupération des rendez-vous depuis localStorage
  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, []);

  // Supprimer un rendez-vous
  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Mes rendez-vous</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">Aucun rendez-vous pris pour le moment.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg relative ${
                appointment.cancelled ? 'bg-gray-100 opacity-75' : 'bg-blue-50'
              }`}
            >
              <h3 className="text-xl font-semibold">Rendez-vous avec {appointment.doctor.name}</h3>
              <p className="text-gray-600">Date: {appointment.date}</p>
              <p className="text-gray-600">Heure: {appointment.time}</p>
              <p className="text-gray-600">Motif: {appointment.reason}</p>

              {appointment.cancelled && (
                <p className="text-red-500 font-semibold">Rendez-vous annulé</p>
              )}

              {/* Icônes de modification et de suppression en bas à droite */}
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {/* Icône de modification (désactivée si le rendez-vous est annulé) */}
                {appointment.cancelled ? (
                  <div className="text-gray-300 cursor-not-allowed" title="Modification désactivée">
                    <FaEdit className="w-5 h-5" />
                  </div>
                ) : (
                  <Link
                    to={`/edit-appointment/${index}`}
                    className="text-gray-500 hover:text-blue-500 cursor-pointer"
                  >
                    <FaEdit className="w-5 h-5" />
                  </Link>
                )}

                {/* Icône de suppression */}
                <div
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;