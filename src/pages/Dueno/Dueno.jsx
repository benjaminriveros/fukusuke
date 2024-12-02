import React, { useState } from "react";
import "./Dueno.css";

const Reportes = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await fetch(
        `/api/ventas/report?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
    }
  };

  return (
    <div className="reportes-container">
      <h2>Reporte de Ventas</h2>
      <div className="date-picker">
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={fetchSales}>Generar Reporte</button>
      </div>

      {sales.length > 0 ? (
        <table className="sales-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.cliente}</td>
                <td>{JSON.parse(sale.productos).join(", ")}</td>
                <td>${sale.total.toFixed(2)}</td>
                <td>{new Date(sale.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron ventas en el período seleccionado.</p>
      )}
    </div>
  );
};

export default Reportes;
