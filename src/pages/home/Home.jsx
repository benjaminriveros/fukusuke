import React, { useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sushi from '../../assets/sushi.jpg';
import Ebi from '../../assets/Ebi-Keto-Oriental.png';
import Almond from '../../assets/Almond-Oriental.png';
import Avocado from '../../assets/Avocado-Furai-Oriental.png';
import Sabi from '../../assets/Sabi-Oriental.png';
import promo30 from '../../assets/Promo-30.png';
import promo50 from '../../assets/Promo-50-frito.png';
import './Home.css';
import { CartContext } from "../../components/Carrito/Carrito.js";

export const HomePage = () => {
  // Estado para el modal
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState('');

  const sushiMenu = [
    {
      name: "Ebi Keto Oriental",
      price: 7200,
      oldPrice: 14400,
      image: Ebi,
    },
    {
      name: "Almond Oriental",
      price: 6000,
      oldPrice: 12000,
      image: Almond,
    },
    {
      name: "Sabi Oriental",
      price: 7400,
      oldPrice: 14800,
      image: Sabi,
    },
    {
      name: "Avocado Furai Oriental",
      price: 7200,
      oldPrice: 14400,
      image: Avocado,
    },
  ];

  const promos = [
    {
      id: 1,
      name: "Promo 30 Premium",
      description: [
        "Camarón, queso, cebollín, envuelto en palta.",
        "Salmón, palta, cebollín, envuelto en queso.",
        "Atún, palta, queso, envuelto en ciboulette.",
      ],
      price: 14990,
      image: promo30,
    },
    {
      id: 2,
      name: "Promo 50 Frito",
      description: [
        "Queso, cebollín, pollo, frito en panko.",
        "Queso, cebollín, camarón, frito en panko.",
      ],
      price: 16990,
      image: promo50,
    },
  ];

  
  const { addToCart } = useContext(CartContext); // Acceso al contexto
  const navigate = useNavigate();


    // Función para obtener los productos del menú desde la BD
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products'); // Cambia el endpoint según tu backend
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Productos obtenidos:', data);
        setMenuItems(data); // Almacena los productos obtenidos en el estado
        setError('');
      } catch (err) {
        console.error('Error al obtener los productos del menú:', err);
        setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
      }
    };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Funciones para el modal
  const openModal = (promo) => {
    setSelectedPromo(promo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPromo(null);
  };



  return (
    <>
      {/* Imagen de bienvenida */}
      <div className="content-a">

        <img src={Sushi} className="background-image" alt="Sushi" />
        <h1 className="overlay-text">Bienvenido a Fukusuke</h1>

      </div>
      {/* Sección de promociones */}
      <div className="promos-section">
        <h2>Nuestras promos favoritas</h2>
        <div className="promos-container">
          {promos.map((promo) => (
            <div key={promo.id} className="promo-item" >
              <div className="promoCart" onClick={() => openModal(promo)}>
              <img src={promo.image} alt={promo.name} className="promo-image" />
              <h3>{promo.name}</h3>
              <p>${promo.price.toLocaleString()}</p>
              </div>
              <button className="add-to-cart" onClick={() => addToCart(promo)}>
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPromo && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img src={selectedPromo.image} alt={selectedPromo.name} className="modal-image" />
            <h2>{selectedPromo.name}</h2>
            <div className="descripcion">
              {selectedPromo.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </div>
            <div className="survey">
              <h3>¿Deseas palitos?</h3>
              <label>
                <input type="radio" name="palitos" value="Sí" /> Sí
                <input type="radio" name="palitos" value="No" /> No
              </label>
              <h3>Elige tus salsas</h3>
              <label>
                <input type="checkbox" name="salsa" value="Soya" /> Soya
              </label>
              <label>
                <input type="checkbox" name="salsa" value="Teriyaki" /> Teriyaki
              </label>
            </div>
            <div className="modal-footer">
              <button className="add-to-cart-button" onClick={() => {addToCart(selectedPromo);closeModal(); }}>
                Añadir al carrito - ${selectedPromo.price.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sección de menú */}
      <div className="menu-section">
        <h2>Nuestra Carta</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="sushi-menu">
          {menuItems.map((item) => (
            <div key={item.id} className="sushi-item">
              <img src={item.image} alt={item.name} className="sushi-image" />
              <h3>{item.name}</h3>
              <p>
                <span className="current-price">${item.price.toLocaleString()}</span>
              </p>
              <button className="add-to-cart" onClick={() => addToCart(item)}>
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
