import { motion } from 'framer-motion';
import { FiUsers, FiActivity, FiShield, FiHeart } from 'react-icons/fi';
import teamImage from "../assets/team.jpg";

const About = () => {
  const stats = [
    { icon: <FiUsers className="w-6 h-6" />, value: '0+', label: 'Patients satisfaits' },
    { icon: <FiActivity className="w-6 h-6" />, value: 'Equipe en constitution', label: 'Taux de réussite' },
    { icon: <FiShield className="w-6 h-6" />, value: '256-bits', label: 'Chiffrement SSL' },
    { icon: <FiHeart className="w-6 h-6" />, value: '24/7', label: 'Support médical' }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-[#f3f4f6]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#4938e4] to-[#3b2cb3] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            Révolutionner les soins de santé numérique
          </motion.h1>
          <p className="text-xl max-w-2xl mx-auto">
            Chez DocTeq, nous fusionnons technologie de pointe et expertise médicale pour créer 
            l'écosystème santé de demain.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="text-[#4938e4] mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notre Histoire */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={teamImage} 
              alt="Notre équipe" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4938e4dd] via-transparent to-transparent" />
          </motion.div>

          <div>
            <h2 className="text-3xl font-bold text-[#4938e4] mb-6">Notre Histoire</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fondée en 2025 par une équipe d'etudiants en programmation, DocTeq est née d'une vision simple : 
              rendre les soins de santé accessibles, sécurisés et intuitifs grâce à la technologie.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-[#4938e410] p-3 rounded-full">
                  <FiHeart className="w-6 h-6 text-[#4938e4]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mission</h3>
                  <p className="text-gray-600">Digitaliser le parcours patient tout en préservant l'humain</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[#4938e410] p-3 rounded-full">
                  <FiShield className="w-6 h-6 text-[#4938e4]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Engagement</h3>
                  <p className="text-gray-600">Protection maximale des données de santé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Valeurs */}
      <div className="bg-gradient-to-r from-[#4938e4] to-[#3b2cb3] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="p-6 border border-white/20 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Innovation Responsable</h3>
              <p>Développer des solutions technologiques éthiques et centrées sur l'humain</p>
            </motion.div>
            <motion.div 
              className="p-6 border border-white/20 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Transparence</h3>
              <p>Des algorithmes audités et des processus vérifiables</p>
            </motion.div>
            <motion.div 
              className="p-6 border border-white/20 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold mb-4">Accessibilité</h3>
              <p>Des solutions adaptées à tous les publics et besoins</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;