import { useSelector } from 'react-redux';
import DoctorNotifications from './pages/DoctorNotifications';
import UserNotifications from './pages/UserNotifications';

const NotificationRoute = () => {
  const { role } = useSelector((state) => state.auth);
  return role === 'doctor' ? <DoctorNotifications /> : <UserNotifications />;
};

export default NotificationRoute;