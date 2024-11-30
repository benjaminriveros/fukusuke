import React from 'react';
import './Header.css'; // Make sure to create a CSS file for styling
import Fukusuke from '../../assets/fukusuke.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src ={Fukusuke} alt="Logo" className="header-logo" />
                <h1 className="header-title">Fukusuke</h1>
            </div>
            <div className="header-button">
                <button className="menu-button">Menu</button>
            </div>
            <div className="header-button">
                <button className="menu-button">Menu</button>
            </div>
            <div className="header-button">
                <button className="menu-button">Menu</button>
            </div>
            <div className="header-button">
                <button className="menu-button">Menu</button>
            </div>
        </header>
    );
};

export default Header;