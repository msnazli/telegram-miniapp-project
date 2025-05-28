import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userData = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!token || !userData) return <Navigate to="/login" />;

  if (role && userData.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
