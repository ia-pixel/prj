import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaCalendarCheck, FaUserMd, FaClinicMedical } from 'react-icons/fa';
import PageContainer from '../components/PageContainer';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#4938e4] to-[#3b2cb3] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in text-shadow-lg !text-blue-400">
  La révolution numérique de votre santé
</h1>





          <p className="text-xl mb-8">Une plateforme tout-en-un pour gérer vos soins médicaux en toute simplicité</p>
          <Link
            to="/appointment"
            className="inline-block bg-white text-[#4938e4] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-[#4938e4] mb-12">
          Nos solutions innovantes
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <FaUserMd className="text-4xl text-[#4938e4] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Médecins qualifiés</h3>
            <p className="text-gray-600">Accédez à notre réseau de professionnels certifiés</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <FaCalendarCheck className="text-4xl text-[#4938e4] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gestion intelligente</h3>
            <p className="text-gray-600">Planifiez et suivez vos rendez-vous en temps réel</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <FaStethoscope className="text-4xl text-[#4938e4] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Diagnostic digital</h3>
            <p className="text-gray-600">Solutions de télémédecine intégrées</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
            <FaClinicMedical className="text-4xl text-[#4938e4] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dossier médical</h3>
            <p className="text-gray-600">Stockage sécurisé de vos documents de santé</p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-12">
              <h2 className="text-3xl font-bold text-[#4938e4] mb-6">Une expérience patient repensée</h2>
              <p className="text-gray-600 mb-6">
                Grâce à notre interface intuitive, gérez l'ensemble de votre parcours médical
                en quelques clics. Consultez vos résultats d'analyses, communiquez avec votre
                médecin et recevez des alertes personnalisées.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="bg-[#4938e4] text-white rounded-full p-2 mr-3">✓</span>
                  <span className="text-gray-600">Notifications des rappels de vaccins</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-[#4938e4] text-white rounded-full p-2 mr-3">✓</span>
                  <span className="text-gray-600">Historiques médicaux complets</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-[#4938e4] text-white rounded-full p-2 mr-3">✓</span>
                  <span className="text-gray-600">Messageries sécurisées</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 min-h-[400px] bg-[url('../public/img1.jpg')] bg-cover bg-center rounded-r-2xl" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#4938e4] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-5xl font-bold mb-2">0+</div>
            <div className="text-gray-200">Patients satisfaits</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-bold mb-2">2-6+</div>
            <div className="text-gray-200">Professionnels partenaires</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-bold mb-2">24/7</div>
            <div className="text-gray-200">Support disponible</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#4938e4] mb-6">
          Prêt à prendre le contrôle de votre santé ?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez notre communauté de patients et professionnels engagés dans une médecine moderne
          et accessible à tous.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-[#4938e4] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3b2cb3] transition-all transform hover:scale-105"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
