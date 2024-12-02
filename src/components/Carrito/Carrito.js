import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (item) => {
    setCartItems((prevCart) => {const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Aumentar la cantidad
  const increaseQuantity = (name) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuir la cantidad
  const decreaseQuantity = (name) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Eliminar producto
  const removeFromCart = (name) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  // Confirmar compra
  const confirmPurchase = () => {
    window.location.href = "/compra";  // Navegar a /compra
  };

  // Anular compra
  const cancelPurchase = () => {
    setCartItems([]); // Vaciar carrito
  };


  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, increaseQuantity,decreaseQuantity,removeFromCart,confirmPurchase,cancelPurchase, }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
