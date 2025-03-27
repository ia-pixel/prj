import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Contact = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' }); // Pour gérer les notifications

  // Afficher une notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Masquer la notification après 3 secondes
  };

  // Récupérer la liste des docteurs
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/doctors'); // Remplacez par votre endpoint pour récupérer les docteurs
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Erreur lors du chargement des docteurs:', error);
        showNotification('Erreur lors du chargement des docteurs', 'error');
      }
    };
    fetchDoctors();
  }, []);

  // Fonction pour envoyer un message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !message.trim()) {
      showNotification('Veuillez sélectionner un docteur et écrire un message.', 'error');
      return;
    }

    const newMessage = {
      id: Date.now(),
      doctorId: parseInt(selectedDoctor),
      message: message,
      timestamp: new Date().toISOString(),
      read: false,
      senderId: user.id,
    };

    try {
      const response = await fetch('http://localhost:5001/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        showNotification('Message envoyé avec succès !', 'success');
        setMessage('');
        setSelectedDoctor('');
      } else {
        showNotification('Erreur lors de l\'envoi du message.', 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('Une erreur est survenue.', 'error');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f3f4f6] py-16 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#4938e4] mb-4">Contactez un Docteur</h1>
          <p className="text-xl text-gray-600">Envoyez un message à un docteur spécifique</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-3xl mx-auto">
          <form className="space-y-6" onSubmit={handleSendMessage}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionnez un Docteur</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#4938e4] focus:border-transparent"
              >
                <option value="">Choisissez un docteur</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Votre Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#4938e4] focus:border-transparent"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#4938e4] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#3b2cb3] transition-colors"
            >
              <FiSend className="w-5 h-5" />
              <span>Envoyer le message</span>
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;