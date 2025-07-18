import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant pour une route protégée
const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = sessionStorage.getItem('token');

  // Si l'utilisateur est authentifié, retourne le composant passé, sinon redirige
  return isAuthenticated ? Component : <Navigate to="/login" />;
};
export default PrivateRoute;
