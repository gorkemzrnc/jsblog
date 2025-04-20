
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;