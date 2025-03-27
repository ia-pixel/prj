import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DoctorNotifications = () => {
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [users, setUsers] = useState([]); // Pour stocker la liste des utilisateurs
  const [selectedMessage, setSelectedMessage] = useState(null); // Pour suivre le message sélectionné
  const [notification, setNotification] = useState({ show: false, message: '', type: '' }); // Pour gérer les notifications

  // Afficher une notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000); // Masquer la notification après 3 secondes
  };

  // Récupérer la liste des utilisateurs (patients et docteurs)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        showNotification('Erreur lors du chargement des utilisateurs', 'error');
      }
    };

    fetchUsers();
  }, []);

  // Récupérer les messages du docteur connecté
  useEffect(() => {
    if (!user || user.role !== 'doctor') return;

    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5001/messages');
        const data = await response.json();

        // Filtrer les messages du docteur connecté
        const doctorMessages = data.filter(msg => msg.doctorId === user.id);
        setNotifications(doctorMessages);
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error);
        showNotification('Erreur lors du chargement des messages', 'error');
      }
    };

    fetchMessages();
  }, [user]);

  // Fonction pour envoyer une réponse
  const handleReply = async (messageId, replyMessage) => {
    const reply = {
      id: Date.now(),
      originalNotificationId: messageId,
      message: replyMessage,
      doctorId: user.id,
      senderId: user.id,
      timestamp: new Date().toISOString(),
      read: false,
    };

    try {
      const response = await fetch('http://localhost:5001/messages/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reply),
      });

      if (response.ok) {
        showNotification('Réponse envoyée avec succès !', 'success');
        setNotifications(prevNotifications => prevNotifications.map(msg =>
          msg.id === messageId ? { ...msg, replies: [...(msg.replies || []), reply] } : msg
        ));
        setReplyMessage(''); // Réinitialiser le champ de réponse après envoi
      } else {
        showNotification('Erreur lors de l\'envoi de la réponse.', 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('Une erreur est survenue.', 'error');
    }
  };

  // Fonction pour supprimer un message
  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5001/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showNotification('Message supprimé avec succès !', 'success');
        setNotifications(prevNotifications => prevNotifications.filter(msg => msg.id !== messageId));
      } else {
        showNotification('Erreur lors de la suppression du message.', 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('Une erreur est survenue.', 'error');
    }
  };

  // Fonction pour marquer un message comme "lu"
  const handleMarkAsRead = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:5001/messages/${messageId}/read`, {
        method: 'PUT',
      });

      if (response.ok) {
        setNotifications(prevNotifications => prevNotifications.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        ));
      } else {
        showNotification('Erreur lors du marquage du message comme lu.', 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('Une erreur est survenue.', 'error');
    }
  };

  // Fonction pour récupérer le nom complet de l'envoyeur
  const getSenderName = (senderId) => {
    const sender = users.find(user => user.id === senderId);
    return sender ? sender.name : 'Utilisateur inconnu';
  };

  // Fonction pour afficher la boîte de message
  const handleSelectMessage = (messageId) => {
    setSelectedMessage(messageId);
    handleMarkAsRead(messageId); // Marquer le message comme lu lorsqu'il est sélectionné
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg relative">
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

      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Messages des Patients</h1>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-600">Aucun message reçu.</p>
      ) : (
        <div className="space-y-6">
          {notifications.map((notification, index) => (
            <div key={index} className="p-6 border rounded-lg">
              <div
                className={`cursor-pointer ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
                onClick={() => handleSelectMessage(notification.id)}
              >
                <p className="text-gray-600">
                  {!notification.read && <span className="text-red-500">Nouveau </span>}
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500">
                  Envoyé par: {getSenderName(notification.senderId)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>

              {selectedMessage === notification.id && (
                <div className="mt-4">
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Écrivez votre réponse..."
                    className="w-full p-2 mt-4 border rounded-lg"
                  />

                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleReply(notification.id, replyMessage)}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    >
                      Répondre
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(notification.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg"
                    >
                      Supprimer
                    </button>
                  </div>

                  {(notification.replies ?? []).map((reply, replyIndex) => (
                    <div key={replyIndex} className="mt-4 p-4 bg-green-50 rounded-lg">
                      <p className="text-gray-600">{reply.message}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(reply.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorNotifications;