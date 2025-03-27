import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa'; // Importer l'icône de corbeille

const UserNotifications = () => {
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Charger les notifications au montage du composant
  useEffect(() => {
    if (!user) return;

    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const userNotifications = savedNotifications.filter(
      (notification) => notification.userId === user.id
    );

    setNotifications(userNotifications);
    setUnreadNotifications(userNotifications.filter((n) => !n.read).length);
  }, [user]);

  // Marquer une notification comme lue
  const handleNotificationClick = (notificationId) => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updatedNotifications = savedNotifications.map((notification) =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    );

    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications.filter((notification) => notification.userId === user.id));
    setUnreadNotifications(0);
  };

  // Supprimer une notification
  const handleDeleteNotification = (notificationId) => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updatedNotifications = savedNotifications.filter(
      (notification) => notification.id !== notificationId
    );

    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications.filter((notification) => notification.userId === user.id));
  };

  // Afficher les réponses liées à une notification
  const getReplies = (notificationId) => {
    return notifications.filter(
      (n) => n.originalNotificationId === notificationId && n.sender === 'doctor'
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-600">Aucune nouvelle notification.</p>
      ) : (
        <div className="space-y-6">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg relative ${
                !notification.read ? 'bg-blue-50' : 'bg-white'
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              {/* Afficher le message de la notification */}
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.timestamp).toLocaleString()}
              </p>

              {/* Afficher les réponses du docteur (si applicable) */}
              {notification.type !== 'appointment_cancellation' &&
                getReplies(notification.id).map((reply, replyIndex) => (
                  <div key={replyIndex} className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-gray-600">{reply.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(reply.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}

              {/* Afficher un style différent pour les annulations de rendez-vous */}
              {notification.type === 'appointment_cancellation' && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-600">⚠️ {notification.message}</p>
                </div>
              )}

              {/* Icône de corbeille pour supprimer la notification */}
              <div
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Empêcher la propagation du clic à la boîte de notification
                  handleDeleteNotification(notification.id);
                }}
              >
                <FaTrash className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNotifications;