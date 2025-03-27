import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiTag } from 'react-icons/fi';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "L'avenir de la télémédecine",
      date: "18 Fevrier 2025",
      category: "Innovation",
      excerpt: "Découvrez comment les nouvelles technologies révolutionnent la consultation à distance...",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Sécurité des données médicales",
      date: "18 Fevrier 2025",
      category: "Sécurité",
      excerpt: "Les meilleures pratiques pour protéger vos informations de santé...",
      readTime: "4 min"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-[#f3f4f6] py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#4938e4] mb-4">Blog Médical</h1>
          <p className="text-xl text-gray-600">Actualités et insights sur la santé numérique</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FiCalendar className="mr-2" />
                  <span>{post.date}</span>
                  <FiTag className="ml-4 mr-2" />
                  <span className="text-[#4938e4]">{post.category}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.readTime} de lecture</span>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-[#4938e4] hover:text-[#3b2cb3] font-medium"
                  >
                    Lire plus →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;