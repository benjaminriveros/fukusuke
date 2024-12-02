import React, { useContext } from 'react';
import { CartContext } from '../../pages/Carrito/Carrito.jsx';
import './Compra.css';

export const Compra = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <div className="content">
        <h2>Resumen de Compra</h2>
        {cartItems.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name}</span>
                <span>
                  ${item.price.toLocaleString()} x {item.quantity} = $
                  {(item.price * item.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Compra;