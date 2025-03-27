import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, accessToken, isLoading } = useSelector((state) => state.auth);
  
  return {
    isAuthenticated: !!accessToken,
    user,
    isLoading,
    isAdmin: user?.role === 'admin'
  };
};