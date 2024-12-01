import React, {useContext, useState} from 'react';
import './Header.css'; // Make sure to create a CSS file for styling
import Fukusuke from '../../assets/fukusuke.png';
import { CartContext } from "../../pages/Carrito/Carrito.jsx";

const Header = () => {

    const genderOptions = [
        { value: '', label: 'Seleccione un género' },
        { value: 'masculine', label: 'Masculino' },
        { value: 'feminine', label: 'Femenino' },
        { value: 'non-binary', label: 'No binario' },
    ];
    


    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [gender, setGender] = useState('');

    
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const { cartItems } = useContext(CartContext); // Acceso al carrito
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <img src ={Fukusuke} alt="Logo" className="header-logo" />
                    <h1 className="header-title">Fukusuke</h1>
                </div>
                <div className="header-button">
                    <button className="menu-button">Inicio</button>
                    <button className="menu-button">Menu</button>
                    <button className="menu-button" onClick={openCart}>🛒 Carrito ({cartItems.length})</button>
                    <button className="menu-button" onClick={openLoginModal}>Registro/Login</button>
                </div>
            </header>

            {isLoginModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeLoginModal}>&times;</span>
                        <h2>Login</h2>
                        <form className="login-form">
                            <label htmlFor="username">Usuario:</label>
                            <input type="text" id="username" name="username" required />
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required />
                            <button type="submit" className="login-button">Login</button>
                        </form>
                        <p>No tienes un usuario? <a href="#" onClick={() => { closeLoginModal(); openRegisterModal(); }}>Registrate</a></p>
                    </div>
                </div>
            )}

            {isRegisterModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeRegisterModal}>&times;</span>
                        <h2>Registro</h2>
                        <form className="register-form">
                            <label htmlFor="new-username">Nombre:</label>
                            <input type="text" id="new-username" name="new-username" required />
                            <label htmlFor="new-rut">Rut:</label>
                            <input type="rut" id="new-rut" name="new-rut" required />
                            <label htmlFor="new-password">Contraseña:</label>
                            <input type="password" id="new-password" name="new-password" required />
                            <label htmlFor="new-direccion">Direccion:</label>
                            <input type="direccion" id="new-direccion" name="new-direccion" required />
                            <label htmlFor="new-region">Region:</label>
                            <input type="region" id="new-region" name="new-region" required />
                            <label htmlFor="new-comuna">Comuna:</label>
                            <input type="comuna" id="new-comuna" name="new-comuna" required />
                            <label htmlFor="new-telefono">Telefono:</label>
                            <input type="telefono" id="new-telefono" name="new-telefono" required />
                            <label htmlFor="new-email">Email:</label>
                            <input type="email" id="new-email" name="new-email" required />
                            <label htmlFor="new-nacimiento">Fecha de Nacimiento:</label>
                            <input type="date" id="new-nacimiento" name="new-nacimiento" required />
                            <label htmlFor="new-genero">Genero:</label>
                            <select id="new-genero" name="new-genero" value={gender} onChange={handleGenderChange} required>
                                {genderOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>




                            <button type="submit" className="register-button">Registrate</button>
                        </form>
                    </div>
                </div>
            )}

            {isCartOpen && (
                    <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeCart}>
                        &times;
                        </span>
                        <h2>Carrito de Compras</h2>
                        {cartItems.length === 0 ? (
                        <p>El carrito está vacío.</p>
                        ) : (
                        <ul className="cart-items">
                            {cartItems.map((item, index) => (
                            <li key={index} className="cart-item">
                                <span>{item.name}</span>
                                <span>${item.price.toLocaleString()}</span>
                            </li>
                            ))}
                        </ul>
                        )}
                        {cartItems.length > 0 && (
                        <div className="cart-total">
                            <h3>
                            Total: $
                            {cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()}
                            </h3>
                        </div>
                        )}
                    </div>
                </div>
                )}
        </>
    );
};

export default Header;

