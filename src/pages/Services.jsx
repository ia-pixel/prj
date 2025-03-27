import { motion } from 'framer-motion';
import { FiHeart, FiSmartphone, FiCloud, FiShield } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Suivi Médical",
      description: "Surveillance en temps réel de vos indicateurs de santé"
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Téléconsultation",
      description: "Consultations à distance avec des professionnels certifiés"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-[#f3f4f6] py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#4938e4] mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600">Une gamme complète de solutions digitales santé</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-[#4938e4] mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#4938e4] to-[#3b2cb3] text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Notre Engagement</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <FiShield className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Sécurité Maximale</h3>
                <p>Certifications HIPAA et GDPR pour la protection de vos données</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiCloud className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Disponibilité 24/7</h3>
                <p>Accès permanent à vos dossiers et résultats d'analyses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;