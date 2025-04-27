// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

function ProtectedRoute({ children, requiredRoles }) {
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const userRole = authState.roles;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRoles && !requiredRoles.some(role => userRole.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;