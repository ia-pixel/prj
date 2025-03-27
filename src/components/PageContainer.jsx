// components/PageContainer.jsx
import { useSelector } from 'react-redux';

const PageContainer = ({ children }) => {
  const { isDarkMode } = useSelector((state) => state.auth);
  
  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDarkMode ? 'dark:bg-gray-900 dark:text-gray-100' : 'bg-white text-gray-800'
    }`}>
      {children}
    </div>
  );
};

export default PageContainer;