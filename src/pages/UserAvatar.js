import { motion } from 'framer-motion';

const UserAvatar = ({ name }) => {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <motion.div
      className="w-10 h-10 bg-[#4938e4] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3b2cb3] transition-colors"
      whileHover={{ scale: 1.1 }}
    >
      <span className="text-lg font-bold">{firstLetter}</span>
    </motion.div>
  );
};

export default UserAvatar;