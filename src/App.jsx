import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import MemberDashboard from './pages/MemberDashboard';
import Appointment from './pages/Appointment.jsx';
import Contact from './pages/Contact';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import Blog from './pages/Blog';
import Faq from './pages/Faq';
import Services from './pages/Services';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FaceIDLogin from './pages/FaceIDLogin.jsx';
import VerifyFace from './pages/VerifyFace';
import Scanner from './pages/Scanner.jsx';
import Reseach from './pages/reseach.jsx';
import Chatbot from './pages/chatbot.jsx';
import MyAppointments from './components/MyAppointments';
import EditAppointment from './components/EditAppointment';
import MyScans from './components/MyScans';
import AdminPanel from './pages/AdminPanel.jsx';
import DoctorAppointments from './pages/DoctorAppointments';
import UserNotifications from './pages/UserNotifications';
import DoctorNotifications from './pages/DoctorNotifications';
import ManageUsers from './pages/ManageUsers.jsx';
import DoctorProfile from './pages/DoctorProfile.jsx';
import ManageDoctors from './pages/ManageDoctors.jsx';
import { useSelector } from 'react-redux';

function App() {
  // Optimisation des performances
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Exemple concret : Limiter les requêtes en arrière-plan
        window.__isActive = true;

        // Déclencher les mises à jour prioritaires
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(() => {
            // Mettre à jour les données critiques
          }, { timeout: 1000 });
        }
      } else {
        window.__isActive = false;
        // Réduire les timers non essentiels
        clearNonEssentialIntervals();
      }
    };

    const clearNonEssentialIntervals = () => {
      // Exemple : Nettoyer les intervalles non essentiels
      const intervals = window.__nonEssentialIntervals || [];
      intervals.forEach(interval => clearInterval(interval));
      window.__nonEssentialIntervals = [];
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.__isActive = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// Composant pour conditionner l'affichage du Footer
const AppContent = () => {
  const location = useLocation(); // Hook pour obtenir l'emplacement actuel
  const { role } = useSelector((state) => state.auth); 
  
  // Ne pas afficher le Footer sur la page Chatbot
  const showFooter = !location.pathname.includes('/chatbot');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Home />
              </motion.div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/faceid-login" element={<FaceIDLogin />} />
          <Route path="/verify-face" element={<VerifyFace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<About />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/my-scans" element={<MyScans />} />
          <Route path="/reseach" element={<Reseach />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/edit-appointment/:index" element={<EditAppointment />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-doctors" element={<ManageDoctors />} />
          <Route
            path="/notifications"
            element={role === 'doctor' ? <DoctorNotifications /> : <UserNotifications />}
          />

          {/* Route principale */}
          <Route
            path="/forgot-password"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ForgotPassword />
              </motion.div>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/member" element={<MemberDashboard />} />
          </Route>

          <Route
            path="/contact"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Contact />
              </motion.div>
            }
          />
        </Routes>
      </main>
      {showFooter && <Footer />} {/* Afficher le Footer uniquement si showFooter est true */}

      {/* Ajoutez ToastContainer ici */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;