import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css'; // Estilo opcional

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div className="unauthorized-container">
      <h1>Acceso Denegado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <button onClick={goBack}>Volver</button>
    </div>
  );
};

export default Unauthorized;
