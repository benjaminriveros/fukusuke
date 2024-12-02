import React, { useState, useEffect } from "react";
import "./Despacho.css";

const Despacho = () => {
  const [orden, setOrdenes] = useState([]); //antes orden se llamaba ordenes

  const ordenes = [ //este es temporal hasta que se cree la api
    {
        id: 1,
        cliente: "Juan Pérez",
        direccion: "Calle Falsa 123",
        productos: ["Sushi Roll", "Sopa Miso"],
        hora: "10:30 AM"
      },
      {
        id: 2,
        cliente: "Ana Gómez",
        direccion: "Av. Siempre Viva 742",
        productos: ["Tempura", "Sashimi"],
        hora: "10:45 AM"
      },
      {
        id: 3,
        cliente: "Luis Martínez",
        direccion: "Calle 8, Nro. 5",
        productos: ["Ramen", "Té Verde"],
        hora: "11:00 AM",
      }
  ]

  // Simular la llegada de órdenes desde el backend
  useEffect(() => {
    // Obtener las órdenes (puedes conectar un backend aquí)
    const fetchOrdenes = async () => {
      const response = await fetch("/api/ordenes"); // Ajusta esta ruta a tu backend (no se comooo) 
      const data = await response.json();
      setOrdenes(data);
    };

    fetchOrdenes();
  }, []);

  return (
    <div className="despacho-container">
      <h2>Órdenes de Despacho</h2>
      <ul className="ordenes-list">
        {ordenes.map((orden, index) => (
          <li key={index} className="orden-item">
            <div>
              <p><strong>Orden #{orden.id}</strong></p>
              <p><strong>Cliente:</strong> {orden.cliente}</p>
              <p><strong>Dirección:</strong> {orden.direccion}</p>
              <p><strong>Pedido:</strong> {orden.productos.join(", ")}</p>
              <p><strong>Hora de llegada:</strong> {orden.hora}</p>
            </div>
            <button className="entregar-button">Entregar a Cocina</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Despacho;
