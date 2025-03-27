import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogIn, FiLogOut, FiCamera, FiHeart, FiMessageSquare, FiMic, FiCalendar, FiUser, FiUsers, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout, toggleDarkMode } from '../features/auth/authSlice';
import { Bot } from "lucide-react";
import { FiActivity, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const { user, isDarkMode, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const firstName = user?.name ? user.name.split(' ')[0] : '';

  // Message de bienvenue en fonction du rôle
  const welcomeMessage = role === 'admin' || role === 'doctor' 
    ? `Hey ${role === 'admin' ? 'Admin' : 'Docteur'} ${firstName} !` 
    : `Hey ${firstName} !`;

  // Charger les notifications non lues
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    
    if (user) {
      const userNotifications = savedNotifications.filter(
        (notification) => notification.userId === user.id && !notification.read
      );
      setUnreadNotifications(userNotifications.length);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signup');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Liens statiques pour tous les utilisateurs
  const staticLinks = [
    { name: 'Accueil', path: '/' },
    { 
      name: 'Research', 
      path: '/reseach', 
      icon: <FiMessageSquare className="w-5 h-5" />
    },
    {
      name: 'Chatbot',
      path: '/chatbot',
      icon: <Bot className="w-5 h-5" />
    },
  ];

  // Ajouter "Contact" uniquement pour les utilisateurs normaux (user)
  if (role === 'user') {
    staticLinks.push({ name: 'Contact', path: '/contact' });
  }

  // Liens supplémentaires pour les utilisateurs (user)
  const userLinks = [
    { name: 'Scanner', path: '/scanner', icon: <FiHeart className="w-5 h-5" /> },
    { name: 'Rendez-vous', path: '/appointment', icon: <FiCalendar className="w-5 h-5" /> },
  ];

  // Liens supplémentaires pour les administrateurs
  const adminLinks = [
    { name: 'Gestion des utilisateurs', path: '/manage-users', icon: <FiUsers className="w-5 h-5" /> },
    { name: 'Gestion des docteurs', path: '/manage-doctors', icon: <FiUser className="w-5 h-5" /> },
  ];

  // Liens supplémentaires pour les docteurs
  const doctorLinks = [
    { name: 'Rendez-vous à venir', path: '/doctor-appointments', icon: <FiCalendar className="w-5 h-5" /> },
    { name: 'Profil', path: '/doctor-profile', icon: <FiUser className="w-5 h-5" /> },
  ];

  // Fusionne les liens en fonction du rôle
  let navLinks = [...staticLinks];
  if (role === 'admin') {
    navLinks = [...navLinks, ...adminLinks];
  } else if (role === 'doctor') {
    navLinks = [...staticLinks]; // Les docteurs n'ont que les liens statiques dans la navbar
  } else if (role === 'user') {
    navLinks = [...navLinks, ...userLinks]; // Ajoute les liens spécifiques aux utilisateurs
  }

  return (
    <motion.header 
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4938e4] to-[#3b2cb3] bg-clip-text text-transparent">
              DocTeq 
            </span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-2
                  ${isActive ? 'text-[#4938e4]' : 'hover:text-[#3b2cb3]'}` 
                }
              >
                {link.icon && link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <motion.div className="relative group">
                <div className="flex items-center space-x-2">
                  <button
                    className="initials-button"
                    onClick={toggleMenu}
                  >
                    <span className="initials-text">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </button>

                  {/* Message de bienvenue en fonction du rôle */}
                  {user && (
                    <span className="font-medium text-sm">
                      {welcomeMessage}
                    </span>
                  )}
                </div>
                
                {menuOpen && (
                 <motion.div
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.2 }}
                 className="dropdown-menu"
               >
                 {/* Options pour les utilisateurs */}
                 {role === 'user' && (
                   <>
                     <Link 
                       to="/my-appointments"
                       className="dropdown-item"
                     >
                       <FiCalendar className="w-5 h-5" />
                       <span>Mes rendez-vous</span>
                     </Link>
                     <Link 
                       to="/my-scans"
                       className="dropdown-item"
                     >
                       <FiActivity className="w-5 h-5" />
                       <span>Mes scans</span>
                     </Link>
                     <Link 
                       to="/notifications"
                       className="dropdown-item"
                     >
                       <FiBell className="w-5 h-5" />
                       <span>Notifications</span>
                       {unreadNotifications > 0 && (
                         <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                           {unreadNotifications}
                         </span>
                       )}
                     </Link>
                   </>
                 )}
               
                 {/* Options pour les docteurs */}
                 {role === 'doctor' && (
                   <>
                     <Link 
                       to="/doctor-appointments"
                       className="dropdown-item"
                     >
                       <FiCalendar className="w-5 h-5" />
                       <span>Rendez-vous à venir</span>
                     </Link>
                     <Link 
                       to="/doctor-profile"
                       className="dropdown-item"
                     >
                       <FiUser className="w-5 h-5" />
                       <span>Profil</span>
                     </Link>
                     <Link 
                       to="/notifications"
                       className="dropdown-item"
                     >
                       <FiBell className="w-5 h-5" />
                       <span>Notifications</span>
                       {unreadNotifications > 0 && (
                         <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                           {unreadNotifications}
                         </span>
                       )}
                     </Link>
                   </>
                 )}
               
                 {/* Options pour les admins */}
                 {role === 'admin' && (
                   <>
                     <Link 
                       to="/admin"
                       className="dropdown-item"
                     >
                       <FiSettings className="w-5 h-5" />
                       <span>Admin</span>
                     </Link>
                     <Link 
                       to="/manage-users"
                       className="dropdown-item"
                     >
                       <FiUsers className="w-5 h-5" />
                       <span>Gestion des utilisateurs</span>
                     </Link>
                     <Link 
                       to="/manage-doctors"
                       className="dropdown-item"
                     >
                       <FiUser className="w-5 h-5" />
                       <span>Gestion des docteurs</span>
                     </Link>
                   </>
                 )}
               
                 {/* Option de connexion Face ID */}
                 <Link 
                   to="/faceid-login"
                   className="dropdown-item"
                 >
                   <FiCamera className="w-5 h-5" />
                   <span>Connexion Face ID</span>
                 </Link>
               
                 {/* Bouton de déconnexion */}
                 <button 
                   onClick={handleLogout}
                   className="dropdown-item"
                 >
                   <FiLogOut className="w-5 h-5" />
                   <span>Déconnexion</span>
                 </button>
               </motion.div>
                )}
              </motion.div>
            ) : (
              <>
                <Link 
                  to="/faceid-login" 
                  className="flex items-center justify-center w-28 h-8 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                >
                  <FiCamera className="w-5 h-5" />
                  <span className="ml-2">FaceID</span>
                </Link>

                <Link 
                  to="/login" 
                  className="flex items-center justify-center w-28 h-8 bg-[#4938e4] text-white rounded-lg text-sm hover:bg-[#3b2cb3] transition-colors"
                >
                  <FiLogIn className="w-5 h-5" />
                  <span className="ml-2">Connexion</span>
                </Link>
              </>
            )}

            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-400 transition-colors"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;