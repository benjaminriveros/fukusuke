import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sushi from '../../assets/sushi.jpg';

import './Home.css';




export const HomePage = () => {
  return (
    <>
        <div className="content">
            <div className="image-container">
              <img src={Sushi} className='background-image' alt="Sushi" />
            <h1 className='overlay-text'>Bienvenido a Fukusuke</h1>
            </div>
            <div className="home-content">
              hola
            </div>
        </div>  
    </>
  );
};



export default HomePage;