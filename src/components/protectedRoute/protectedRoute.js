import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirige al inicio de sesión
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== requiredRole) {
      // Si el rol no coincide, redirige a una página de no autorizado
      return <Navigate to="/unauthorized" replace />;
    }

    // Si todo es válido, renderiza el componente hijo
    return children;
  } catch (err) {
    console.error('Error al decodificar token:', err);
    // Si hay un problema con el token, redirige al inicio de sesión
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
