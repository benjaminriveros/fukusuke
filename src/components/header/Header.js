
import React, {useContext, useState, useEffect} from 'react';
import './Header.css'; // Make sure to create a CSS file for styling
import Fukusuke from '../../assets/fukusuke.png';
import { CartContext } from "../../pages/Carrito/Carrito.jsx";
import { validatePassword, validateRut, validatePhoneNumber } from '../../functions/LoginRules';
import { CiShoppingCart } from "react-icons/ci";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { cartItems, increaseQuantity,decreaseQuantity,removeFromCart,confirmPurchase,cancelPurchase, } = useContext(CartContext); // Acceso al carrito
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    // Manejar la autenticación
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decodifica el token
                console.log('Token decodificado:', decoded); // Verifica el contenido del token
                setUsername(decoded.name || ''); // Asegúrate de manejar un campo "name" vacío
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token inválido:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);
    
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
    
    const navigate = useNavigate();
    const handleConfirmPurchase = () => {
        confirmPurchase();
        closeCart();
    };
    
    const handleHomeClick = () => {
        navigate('/');
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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            console.log('Inicio de sesión exitoso:', data);
            alert('Inicio de sesión exitoso');
            // Puedes guardar el token en localStorage o manejarlo según tu lógica
            localStorage.setItem('token', data.token);
            window.location.reload(); // Refrescar página
          } else {
            console.error('Error al iniciar sesión:', data);
            alert(`Error: ${data.message}`);
          }
        } catch (err) {
          console.error('Error:', err);
          alert('Error al procesar la solicitud.');
        }
      };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token
        setIsAuthenticated(false); // Cambiar el estado de autenticación
        setUsername(''); // Vaciar el nombre de usuario
        window.location.reload(); // Recargar la página
    };
    
    const handleSubmit = async (e) => {
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
          setPhoneError('Número de teléfono debe ser de 9 dígitos.');
          isValid = false;
        } else {
          setPhoneError('');
        }
      
        setIsFormValid(isValid);
      
        if (isValid) {
          const data = {
            name: username,
            email: email,
            password: password,
            role: 'cliente',
          };
      
          console.log('Data to be sent:', data); // Verificar estructura de los datos
      
          try {
            const response = await fetch('http://localhost:3000/api/users/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              console.log('Data submitted successfully');
              window.location.reload(); // Refrescar la página
            } else {
              const errorData = await response.json();
              console.error('Fallo al enviar datos:', errorData);
            }
          } catch (error) {
            console.error('Error:', error);
          }
      
          setRegisterSuccessMessage('Registro completo!');
          closeRegisterModal();
          openLoginModal();
        } else {
          console.log('Formulario inválido');
        }
      };

    return (
        <>
            <header className="header">
                <div className="logo-titulo">
                    <a href="#" className="logo"><img src={Fukusuke} alt="Logo" className="header-logo" /></a>
                    <h1 className="titulo"><a href='#'>Fukusuke</a></h1>
                </div>
                <div className="header-button">
                    <button className="menu-button" onClick={handleHomeClick}>Inicio</button>
                    <button className="menu-button">Menú</button>
                    <button className="menu-button" onClick={openCart}>
                        <span className="cart-count">({cartItems.length})</span>
                        <CiShoppingCart className="cart-icon" />
                    </button>
                    <div className="header-button">
                        {isAuthenticated ? (
                        <div>
                            <span>{username} </span>  
                            <button className="menu-button" onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </div>
                        ) : (
                            <button className="menu-button" onClick={openLoginModal}>
                                Iniciar sesión
                            </button>
                    )}
                    </div>
                </div>
            </header>

            {isLoginModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeLoginModal}>&times;</span>
                        <h2>Login</h2>
                        {registerSuccessMessage && <p style={{ color: 'green' }}>{registerSuccessMessage}</p>}
                        <form className="login-form" onSubmit={handleLoginSubmit}>
                        <label htmlFor="login-email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="login-email"
                            name="login-email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="login-password">Contraseña:</label>
                        <input
                            type="password"
                            id="login-password"
                            name="login-password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
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
                                <span> 
                                    ${item.price.toLocaleString()} x {item.quantity} = $
                                    {(item.price * item.quantity).toLocaleString()}
                                </span>
                                <div className="quantity-control">
                                    <button onClick={() => decreaseQuantity(item.name)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.name)}>+</button>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(item.name)}
                                >
                                ❌
                                </button>
                            </li>
                            ))}
                        </ul>
                        )}
                        {cartItems.length > 0 && (
                            <>
                            <div className="cart-total">
                                <h3>
                                    Total: $
                                    {cartItems
                                        .reduce((total, item) => total + item.price * item.quantity, 0)
                                        .toLocaleString()}
                                 </h3>
                            </div>
                            <div className="cart-actions">
                                <button onClick={handleConfirmPurchase} className="confirm-button">
                                    Ir a comprar
                                </button>
                                <button onClick={cancelPurchase} className="cancel-button">
                                    Anular compra
                                </button>
                            </div>
                        </>    
                        )}
                    </div>
                </div>
                )}
        </>
    );
};

export default Header;
