import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Información de contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: contacto@fukusuke.com</p>
          <p>Teléfono: +56 9 1234 5678</p>
          <p>Dirección: Santiago, Chile</p>
        </div>

        {/* Otras cuentas */}
        <div className="footer-section">
          <h4>Cuentas</h4>
          <ul>
            <li>
              <a href="/">Administrador</a>
            </li>
            <li>
              <a href="/">Dueño</a>
            </li>
            <li>
              <a href="/">Contacto</a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fukusuke. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
