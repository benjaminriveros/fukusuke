
import React, {useContext, useState, useEffect} from 'react';
import './Header.css'; // Make sure to create a CSS file for styling
import Fukusuke from '../../assets/fukusuke.png';
import { CartContext } from "../../components/Carrito/Carrito.js";
import { validatePassword, validateRut, validatePhoneNumber } from '../../functions/LoginRules';
import { CiShoppingCart } from "react-icons/ci";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom"; // Importa useNavigate


async function enviarCodigo(correo) {
  try {
    // Enviar una solicitud POST al backend
    const response = await fetch('http://localhost:3000/enviar-correo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicamos que el cuerpo es JSON
      },
      body: JSON.stringify({ correoDestino: correo }) // Pasamos el correo como cuerpo de la solicitud
    });

    // Esperamos la respuesta del servidor
    const result = await response.json();

    if (response.ok) {
      console.log('Código enviado:', result.codigo);  // Mostrar el código generado
        return result.codigo
    } else {
      console.error('Error al enviar el correo:', result.error);  // Mostrar el error si no se envió
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);  // Manejo de errores de la solicitud
  }
}


const Header = () => {
    const navigate = useNavigate(); // Hook para navegar programáticamente
    const genderOptions = [
        { value: '', label: 'Seleccione un género' },
        { value: 'masculine', label: 'Masculino' },
        { value: 'feminine', label: 'Femenino' },
        { value: 'otro', label: 'Otro' },
    ];

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    // Estados para manejar los datos del formulario de registro
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
    // Estados para manejar errores y validación del formulario
    const [passwordError, setPasswordError] = useState('');
    const [rutError, setRutError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');
    // Login
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //Carrito
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

    {/* Función para enviar el código de confirmación */}
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isInvalidCode, setIsInvalidCode] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(null); // Este es el código que generará la función confirmarMail()

    // Función que abre la ventana emergente y genera el código
    const handleSendConfirmationCode = async () => {
        // Aquí generamos el código (este paso debe invocar a tu función confirmarMail)
        const code = await enviarCodigo(email); // Generar el código (ahora es asincrónico)
        setGeneratedCode(code); 
        setIsConfirmationModalOpen(true); // Abrimos la ventana emergente
    };
    
    // Función para manejar la verificación del código
    const handleConfirmCode = async () => {
        if (confirmationCode === generatedCode) {
        setIsConfirmationModalOpen(false);

        const data = {
            name: username,
            email: email,
            password: password,
            role: 'cliente',
        };
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
        // Si el código es incorrecto, mostramos un error
        setIsInvalidCode(true);
        }
    };
    
    // Función para cerrar la ventana emergente
    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false); // Cierra la ventana emergente
        setIsInvalidCode(false); // Limpiar posibles errores
    };

    //Login
    const handleLoginSubmit = async () => {
        confirmPurchase(navigate);
      
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
          //Aquí generamos el código (este paso debe invocar a tu función confirmarMail)
          const code = enviarCodigo(email); // Suponiendo que esta función genera un código de verificación
          setGeneratedCode(code); // Guardamos el código generado en el estado
          setIsConfirmationModalOpen(true); // Abrimos la ventana emergente
      
        } else {
          console.log('Formulario inválido');
        }
      };
      
      const goToHome = () => {
        navigate("/"); // Navega a la página de inicio
      };
      
      const handleConfirmPurchase = () => {
        confirmPurchase(); // Llama a la función sin parámetros
        navigate("/compra"); // Usa navigate para redirigir
      };

    return (
        <>
            <header className="header">
                <div className="logo-titulo">
                    <a href="#" className="logo"><img src={Fukusuke} alt="Logo" className="header-logo" /></a>
                    <h1 className="titulo"><a href='/'>Fukusuke</a></h1>
                </div>
                <div className="header-button">
                    <button className="menu-button" onClick={goToHome}>Inicio</button>
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
                            {/*--------------------------------------------------------------------*/}
                            <button type="button" onClick={handleSubmit} className="register-button">Enviar Código de Confirmación</button>


                            {!isFormValid && <p style={{ color: 'red' }}>Por favor complete todos los campos correctamente</p>}
                        </form>
                    </div>
                </div>
            )}

            {isConfirmationModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close-button" onClick={closeConfirmationModal} >&times;</span>
                  <h2>Ingrese el código enviado a su correo {email}</h2>

                  {/* Campo de entrada para el código */}
                  <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)} // Actualizar el código ingresado
                    placeholder="Código de confirmación"
                  />
                  
                  {/* Botón para confirmar el código */}
                  <button type="button" onClick={handleConfirmCode}>Confirmar Código</button>

                  {/* Mensaje de error si el código es incorrecto */}
                  {isInvalidCode && <p style={{ color: 'red' }}>El código es incorrecto, por favor intente nuevamente.</p>}
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
                                <button onClick={confirmPurchase} className="confirm-button">
                                    Confirmar Carrito
                                </button>
                                <button onClick={() => confirmPurchase(navigate)} className="cancel-button">
                                    Anular Carrito
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
