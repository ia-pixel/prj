import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa'; // Importer l'icône de corbeille

const DoctorAppointments = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem('appointments')) || []
  );
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [cancelReason, setCancelReason] = useState('');

  // Filtrer les rendez-vous pour le médecin connecté
  const doctorAppointments = appointments.filter(
    (appointment) => appointment.doctor && user && appointment.doctor.id === user.id
  );

  // Fonction pour ajouter une notification
  const addNotification = (userId, message) => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    savedNotifications.push({ userId, message, read: false, timestamp: new Date().toISOString() });
    localStorage.setItem('notifications', JSON.stringify(savedNotifications));
  };

  // Annuler un rendez-vous
  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setCancelReason('');
  };

  // Confirmer l'annulation du rendez-vous
  const confirmCancel = () => {
    const updatedAppointments = appointments.map((app) =>
      app.id === selectedAppointment.id
        ? { ...app, cancelled: true, cancelReason }
        : app
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);

    // Ajouter une notification pour l'utilisateur
    addNotification(
      selectedAppointment.user.id,
      `Votre rendez-vous avec ${selectedAppointment.doctor.name} a été annulé. Motif: ${cancelReason}`
    );

    setSelectedAppointment(null);
  };

  // Supprimer un rendez-vous
  const handleDeleteAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter((app) => app.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Rendez-vous à venir</h1>

      {doctorAppointments.length === 0 ? (
        <p className="text-center text-gray-600">Aucun rendez-vous à venir.</p>
      ) : (
        <div className="space-y-6">
          {doctorAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-6 border rounded-lg relative ${
                appointment.cancelled ? 'bg-gray-100 opacity-75' : 'bg-white'
              }`}
            >
              <h3 className="text-xl font-semibold">{appointment.user.name}</h3>
              <p className="text-gray-600">Date: {appointment.date} à {appointment.time}</p>
              <p className="text-gray-600">Motif: {appointment.reason}</p>
              <p className="text-gray-600">Scan: {appointment.user.scan ? 'Disponible' : 'Non disponible'}</p>

              {appointment.cancelled && (
                <p className="text-red-500 font-semibold">Rendez-vous annulé</p>
              )}

              <div className="mt-4 flex space-x-4">
                {!appointment.cancelled && (
                  <button
                    onClick={() => handleCancel(appointment)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Annuler
                  </button>
                )}
              </div>

              {/* Icône de corbeille pour supprimer le rendez-vous */}
              <div
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteAppointment(appointment.id)}
              >
                <FaTrash className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal pour annuler un rendez-vous */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Annuler le rendez-vous</h3>
            <textarea
              placeholder="Motif de l'annulation"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              rows="4"
            />
            <div className="flex space-x-4">
              <button
                onClick={confirmCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Confirmer
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;