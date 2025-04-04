import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function ProtectedRoute({ allowedRoles }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(currentUser.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}