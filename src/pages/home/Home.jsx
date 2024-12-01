import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sushi from '../../assets/sushi.jpg';

import './Home.css';




export const HomePage = () => { 
  const sushiMenu = [ //Esto deberia tener algun tipo de relación con la base de datos me imagino 
    {
      name: "Ebi Keto Oriental",
      price: 7200,
      oldPrice: 14400,
      image: "https://via.placeholder.com/300x300",
    },
    {
      name: "Almond Oriental",
      price: 6000,
      oldPrice: 12000,
      image: "https://via.placeholder.com/300x300",
    },
    {
      name: "Sabi Oriental",
      price: 7400,
      oldPrice: 14800,
      image: "https://via.placeholder.com/300x300",
    },
    {
      name: "Avocado Furai Oriental",
      price: 7200,
      oldPrice: 14400,
      image: "https://via.placeholder.com/300x300",
    },
  ];
  const navigate = useNavigate();
  const addToCart = (item) => {
    alert(`Añadido al carrito: ${item.name}`);
  };

  return (
    <>
        <div className="content">
          <div className="image-container">
            <img src={Sushi} className='background-image' alt="Sushi" />
            <h1 className='overlay-text'>Bienvenido a Fukusuke</h1>
          </div>

        </div>
        {/* Sección de promociones */}
        <div className="promos-section">
          <h2>Nuestras promos favoritas</h2>
          <div className="promos-container">
            <div className="promo-item">
              <img src="https://via.placeholder.com/300x200" alt="Promo 100" className="promo-image" />
              <div className="promo-info">
                <h3>Promo 100</h3>
                <p>- Queso, cebollín, pollo, envuelto en palta.</p>
                <p>$33.990</p>
                <button onClick={() => navigate('/menu/promo100')}>Ver producto →</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://via.placeholder.com/300x200" alt="Promo 50" className="promo-image" />
              <div className="promo-info">
                <h3>Promo 50 (frito)</h3>
                <p>- Queso, cebollín, pollo, frito en panko.</p>
                <p>$16.990</p>
                <button onClick={() => navigate('/menu/promo50')}>Ver producto →</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://via.placeholder.com/300x200" alt="Promo 30" className="promo-image" />
              <div className="promo-info">
              <h3>Promo 30</h3>
              <p>- Queso, cebollín, camarón, frito en panko.</p>
              <p>$10.990</p>
              <button onClick={() => navigate('/menu/promo30')}>Ver producto →</button>
            </div>
          </div>
        </div>

        <div className="menu-section">
      <h2>Nuestra Carta</h2>
      <div className="sushi-menu">
        {sushiMenu.map((item, index) => (
          <div key={index} className="sushi-item">
            <img src={item.image} alt={item.name} className="sushi-image" />
            <h3>{item.name}</h3>
            <p>
              <span className="old-price">${item.oldPrice.toLocaleString()}</span>{" "}
              <span className="current-price">${item.price.toLocaleString()}</span>
            </p>
            <button className="add-to-cart" onClick={() => addToCart(item)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
      </div>
    </>
  );
};

export default HomePage;