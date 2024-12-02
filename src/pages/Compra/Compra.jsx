import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../components/Carrito/Carrito.js";
import { AuthContext } from "../../functions/AuthContext";
import "./Compra.css";

const Compra = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext); // Obtener cartItems y setCartItems del contexto
  const [metodoPago, setMetodoPago] = useState("");
  const [estadoPago, setEstadoPago] = useState(null);
  const navigate = useNavigate();
  
  const confirmarCompra = async () => {
    if (!metodoPago) {
      alert("Por favor, seleccione un método de pago.");
      return;
    }

    // Procesar el pago (simulado o con backend)
    const resultado = { success: true };// Cambia esto por la lógica de tu backend

    if (resultado.success) {
      setEstadoPago("exitoso");
      setCartItems([]); // Vaciar carrito después del pago exitoso
      alert("Su pedido se está preparando.");
      setTimeout(() => {
        navigate("/"); // Redirigir al inicio después de unos segundos
      }, 3000);
    } else {
      setEstadoPago("fallido");
      alert(`Error: ${resultado.message}`);
    }
  };

  const calcularTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="compra-container">
      <h2>Confirmar Compra</h2>
      <div className="productos-carrito">
        <h3>Productos en tu carrito</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price.toLocaleString()} ={" "}
              ${((item.price * item.quantity).toLocaleString())}
            </li>
          ))}
        </ul>
        <h4>Total: ${calcularTotal().toLocaleString()}</h4>
      </div>
      <p>Seleccione su método de pago:</p>
      <div className="metodos-pago">
        <label>
          <input
            type="radio"
            name="metodoPago"
            value="Tarjeta de Débito"
            onChange={(e) => setMetodoPago(e.target.value)}
          />
          Tarjeta de Débito
        </label>
        <label>
          <input
            type="radio"
            name="metodoPago"
            value="Tarjeta de Crédito"
            onChange={(e) => setMetodoPago(e.target.value)}
          />
          Tarjeta de Crédito
        </label>
        <label>
          <input
            type="radio"
            name="metodoPago"
            value="Efectivo"
            onChange={(e) => setMetodoPago(e.target.value)}
          />
          Efectivo
        </label>
      </div>
      <button
        className="confirmar-button"
        onClick={() => {
          if (isAuthenticated) {
            confirmarCompra();
          } else {
            alert('Necesitas iniciar sesión para confirmar la compra.');
          }
        }}
        disabled={!metodoPago}
      >
        Pagar
      </button>

      {estadoPago === "exitoso" && (
        <p className="mensaje-exito">El pago fue exitoso. ¡Su pedido se está preparando!</p>
      )}
      {estadoPago === "fallido" && (
        <p className="mensaje-error">El pago falló. Por favor, intente nuevamente.</p>
      )}
    </div>
  );
};

export default Compra;
