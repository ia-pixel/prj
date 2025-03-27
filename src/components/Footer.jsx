import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { isDarkMode } = useSelector((state) => state.auth);
  
  // Configuration des animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.footer
      className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Section À propos */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-[#4938e4] mb-4">DocTeq</h3>
            <p className="text-sm leading-relaxed">
              Plateforme innovante de gestion médicale alliant technologie et soins de santé.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="p-2 rounded-full bg-[#4938e410] hover:bg-[#4938e420] transition">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#4938e410] hover:bg-[#4938e420] transition">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#4938e410] hover:bg-[#4938e420] transition">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-[#4938e4] mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link to="/about" className="block hover:text-[#4938e4] transition-colors">À propos</Link>
              <Link to="/services" className="block hover:text-[#4938e4] transition-colors">Services</Link>
              <Link to="/blog" className="block hover:text-[#4938e4] transition-colors">Blog</Link>
              <Link to="/faq" className="block hover:text-[#4938e4] transition-colors">FAQ</Link>
            </nav>
          </motion.div>

          {/* Coordonnées */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-[#4938e4] mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <FiMapPin className="flex-shrink-0 mt-1" />
                <span>5050 Rue Hochelaga<br/>Montreal, QC</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="flex-shrink-0" />
                <span>contact@docteq.ca</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="flex-shrink-0" />
                <span>+1 (581) 459 8376</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-[#4938e4] mb-4">Newsletter</h3>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'border-gray-300'
                } focus:ring-2 focus:ring-[#4938e4]`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#4938e4] text-white py-2 rounded-lg hover:bg-[#3b2cb3] transition-colors"
              >
                S'abonner
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t text-center text-sm"
          variants={itemVariants}
        >
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} DocTeq - Tous droits réservés
            <br/>
            <span className="text-xs">Conçu avec ❤️ pour votre santé</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;