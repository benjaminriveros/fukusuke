import React, { useState, useContext } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import './Menu.css';
import California from '../../assets/California-Tari.png';
import Pulpo from '../../assets/Pulpo-Coreano.png';
import Malibu from '../../assets/Malibu-Keto-Oriental-Sin-arroz.png';
import Spicy from '../../assets/Spicy-Sake.png';
import Samurai from '../../assets/Samurai-Nikkei.png';

import { CartContext } from "../../components/Carrito/Carrito.js"

const menuData = [
    {
      id: 1,
      name: "California Tari",
      oldPrice: "$9.800",
      price: "$4.900",
      image: California,
      isNew: false,
    },
    {
      id: 2,
      name: "Pulpo Coreano",
      oldPrice: "$15.800",
      price: "$7.900",
      image: Pulpo,
      isNew: true,
    },
    {
      id: 3,
      name: "Malibú Keto Oriental (sin arroz)",
      oldPrice: "$13.800",
      price: "$6.900",
      image: Malibu,
      isNew: true,
    },
    {
        id: 4,
        name: "Spicy Sake",
        oldPrice: "$14.800",
        price: "$7.400",
        image: Spicy,
        isNew: true,
      },
      {
        id: 5,
        name: "Samurai Nikkei",
        oldPrice: "$11.800",
        price: "$5.900",
        image: Samurai,
        isNew: true,
      },
    
  ];


export const Menu = () => {
    const [cart, setCart] = useState([]); // Estado para el carrito
    const { addToCart } = useContext(CartContext); // Usar el contexto global del carrito

    const handleAddToCart = (item) => {
        addToCart(item);
      };

    

    
      // Función para eliminar un producto del carrito
      const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      };

    return (
        <div>
        <header>
          <h1>Sushi Menu</h1>
        </header>
        <div className="menu-grid">
          {menuData.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="image-container">
                {item.isNew && <span className="new-badge">Nuevo</span>}
                <img src={item.image} alt={item.name} />
              </div>
              <div className="menu-details">
                <h3>{item.name}</h3>
                <p className="old-price">{item.oldPrice}</p>
                <p className="price">{item.price}</p>
                <div className="menu-actions">
                  <AiOutlineHeart className="icon" />
                  <AiOutlineShoppingCart className="icon" onClick={() => addToCart(item)}/>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>

    );
};

export default Menu;