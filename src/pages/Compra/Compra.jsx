import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sushi from '../../assets/sushi.jpg';
import Ebi from '../../assets/Ebi-Keto-Oriental.png';
import Almond from '../../assets/Almond-Oriental.png';
import Avocado from '../../assets/Avocado-Furai-Oriental.png';
import Sabi from '../../assets/Sabi-Oriental.png';
import promo30 from '../../assets/Promo-30.png';
import promo50 from '../../assets/Promo-50-frito.png';
import './Compra.css';
import { CartContext } from "../../components/Carrito/Carrito.js";

export const Compra = () => {
  // Estado para el modal
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="content">
        acca se dbeen incluir las cosas que se quieren comprar
      </div>

      {/* Sección de promociones */}

      {/* Modal */}

      {/* Sección de menú */}

    </>
  );
};

export default Compra;
