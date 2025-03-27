import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "Comment prendre un rendez-vous en ligne ?",
      answer: "Connectez-vous à votre espace patient, sélectionnez 'Prendre rendez-vous' et suivez les étapes..."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Nous utilisons un chiffrement AES-256 et certifions HIPAA pour protéger vos informations."
    },
    {
      question: "Comment puis-je obtenir mes résultats d'analyse en ligne ?",
      answer: "Connectez-vous à votre espace patient, sélectionnez 'Analyses' et trouvez la spécialité ou l'analyse que vous recherchez."
    },
    {
      question: "Comment puis-je mettre en contact avec l'équipe d'assistance en ligne ?",
      answer: "Connectez-vous à votre espace patient, sélectionnez 'Contactez-nous' et renseignez les informations requises."
    },
    {
      question: "Comment puis-je suivre mes résultats d'analyse en temps réel ?",
      answer: "Connectez-vous à votre espace patient, sélectionnez 'Analyses' et trouvez la spécialité ou l'analyse que vous recherchez. Vous pourrez suivre les résultats en temps réel."
    },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-[#f3f4f6] py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#4938e4] mb-4">FAQ</h1>
          <p className="text-xl text-gray-600">Trouvez des réponses à vos questions fréquentes</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium">{item.question}</span>
                <FiChevronDown className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 pb-6 pt-2 border-t border-gray-100"
                >
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Faq;