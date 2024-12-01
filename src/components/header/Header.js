import React, { useState } from 'react';
import './Header.css'; // Make sure to create a CSS file for styling
import Fukusuke from '../../assets/fukusuke.png';
import { validatePassword, validateRut, validatePhoneNumber } from '../../functions/LoginRules';

const Header = () => {
    const genderOptions = [
        { value: '', label: 'Seleccione un género' },
        { value: 'masculine', label: 'Masculino' },
        { value: 'feminine', label: 'Femenino' },
        { value: 'otro', label: 'Otro' },
    ];

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [gender, setGender] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rutError, setRutError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (!validatePassword(password)) {
            setPasswordError('Contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!validateRut(rut)) {
            setRutError('RUT debe ser en formato 12345678-9.');
            isValid = false;
        } else {
            setRutError('');
        }

        if (!validatePhoneNumber(telefono)) {
            setPhoneError('Numero de telefono debe ser de 9 digitos.');
            isValid = false;
        } else {
            setPhoneError('');
        }

        setIsFormValid(isValid);

        if (isValid) {
            // Access form values here
            console.log('Form submitted with values:', {
                username,
                rut,
                password,
                direccion,
                region,
                comuna,
                telefono,
                email,
                nacimiento,
                gender,
            });

            // Set success message and open login modal
            setRegisterSuccessMessage('Registro completo!');
            closeRegisterModal();
            openLoginModal();
        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-left">
                    <img src={Fukusuke} alt="Logo" className="header-logo" />
                    <h1 className="header-title">Fukusuke</h1>
                </div>
                <div className="header-button">
                    <button className="menu-button">Inicio</button>
                </div>
                <div className="header-button">
                    <button className="menu-button">Menu</button>
                </div>
                <div className="header-button">
                    <button className="menu-button">🛒 Carrito</button>
                </div>
                <div className="header-button">
                    <button className="menu-button" onClick={openLoginModal}>Registro/Login</button>
                </div>
            </header>

            {isLoginModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeLoginModal}>&times;</span>
                        <h2>Login</h2>
                        {registerSuccessMessage && <p style={{ color: 'green' }}>{registerSuccessMessage}</p>}
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
                        <form className="register-form" onSubmit={handleSubmit}>
                            {/* Nombre */}
                            <label htmlFor="new-username">Nombre:</label>
                            <input type="text" id="new-username" name="new-username" required onChange={(e) => setUsername(e.target.value)} />
                            {/* Rut */}
                            <label htmlFor="new-rut">Rut:</label>
                            <input type="rut" id="new-rut" name="new-rut" required onChange={(e) => setRut(e.target.value)} />
                            <p style={{ color: 'red' }}>{rutError}</p>
                            {/* Contraseña */}
                            <label htmlFor="new-password">Contraseña:</label>
                            <input type="password" id="new-password" name="new-password" required onChange={(e) => setPassword(e.target.value)} />
                            <p style={{ color: 'red' }}>{passwordError}</p>
                            {/* Dirección */}
                            <label htmlFor="new-direccion">Dirección:</label>
                            <input type="direccion" id="new-direccion" name="new-direccion" required onChange={(e) => setDireccion(e.target.value)} />
                            {/* Región */}
                            <label htmlFor="new-region">Región:</label>
                            <input type="region" id="new-region" name="new-region" required onChange={(e) => setRegion(e.target.value)} />
                            {/* Comuna */}
                            <label htmlFor="new-comuna">Comuna:</label>
                            <input type="comuna" id="new-comuna" name="new-comuna" required onChange={(e) => setComuna(e.target.value)} />
                            {/* Teléfono */}
                            <label htmlFor="new-telefono">Teléfono:</label>
                            <input type="phone" id="new-telefono" name="new-telefono" required onChange={(e) => setTelefono(e.target.value)} />
                            <p style={{ color: 'red' }}>{phoneError}</p>
                            {/* Correo */}
                            <label htmlFor="new-email">Correo:</label>
                            <input type="email" id="new-email" name="new-email" required onChange={(e) => setEmail(e.target.value)} />
                            {/* Fecha de nacimiento */}
                            <label htmlFor="new-nacimiento">Fecha de Nacimiento:</label>
                            <input type="date" id="new-nacimiento" name="new-nacimiento" required onChange={(e) => setNacimiento(e.target.value)} />
                            {/* Género */}
                            <label htmlFor="new-genero">Género:</label>
                            <select id="new-genero" name="new-genero" value={gender} onChange={handleGenderChange} required>
                                {genderOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button type="submit" className="register-button">Registrate</button>
                            {!isFormValid && <p style={{ color: 'red' }}>Porfavor complete todos los campos correctamente</p>}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;