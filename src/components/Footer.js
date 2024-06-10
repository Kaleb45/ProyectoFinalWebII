// src/components/Footer.js
import React from 'react';
import facebook from './images/facebook.png';
import twitter from './images/twitter.png';
import instagram from './images/instagram.png';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-block">
                <div className="footer-block-column">
                    <h4>Redes Sociales</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/LibreriasGonvill" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Logo" className="social-icon" />
                            </a>
                        <a href="https://twitter.com/GonvillLibros" target="_blank" rel="noopener noreferrer">
                            <img src={twitter} alt="Logo" className="social-icon" />
                            </a>
                        <a href="https://www.instagram.com/libreriasgonvill/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Logo" className="social-icon" />
                            </a>
                    </div>
                    <div className="auth-links">
                        <a href="#iniciar-sesion"><Link to="/account">Iniciar Sesión</Link></a>
                        <a href="#crear-cuenta"><Link to="/account">Crear cuenta</Link></a>
                    </div>
                </div>

                <div className="footer-block-column">
                    <h4><a href="#sobre-nosotros"><Link to="/sobre-nosotros">Sobre Nosotros</Link></a></h4>
                    <a href="#nuestras-librerias"><Link to="/bookstores">Nuestras Librerías</Link></a>
                </div>

                <div className="footer-block-column">
                    <h4><a href="#ayuda"><Link to="/ayuda">Ayuda</Link></a></h4>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
