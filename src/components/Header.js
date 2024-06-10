// src/components/Header.js
import React from 'react';
import logo from './images/logo.png';
import './Header.css'; // Importamos el archivo de estilos CSS

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header-center">
                <input type="text" placeholder="Buscar libros..." className="search-bar" />
            </div>
            <div className="header-right">
                <button className="icon-button">❤️</button>
                <button className="icon-button">🛒</button>
                <div className="dropdown">
                    <button className="icon-button">👤</button>
                    <div className="dropdown-content">
                        <button>Iniciar Sesión</button>
                        <button>Crear Cuenta</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
