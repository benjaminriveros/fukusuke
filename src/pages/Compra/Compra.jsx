import React, { useContext } from 'react';
import { CartContext } from '../../pages/Carrito/Carrito.jsx';
import './Compra.css';

export const Compra = () => {
  const { cartItems } = useContext(CartContext);

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="content">
      <h2>Resumen de Compra</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
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
          <div className="total-price">
            <h3>Total: ${totalPrice.toLocaleString()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Compra;