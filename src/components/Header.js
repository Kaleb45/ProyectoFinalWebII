// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Header.css';

function Header() {
    const { user, favouriteCount, cartCount } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleCartClick = () => {
        if (user) {
            navigate('/shopping-cart');
        } else {
            navigate('/account');
        }
    };

    const handleFavouritesClick = () => {
        if (user) {
            navigate('/favourites');
        } else {
            navigate('/account');
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header-center">
                <input type="text" placeholder="Buscar libros..." className="search-bar" />
            </div>
            <div className="header-right">
                <button className="icon-button" onClick={handleFavouritesClick}>❤️ {favouriteCount}</button>
                <button className="icon-button" onClick={handleCartClick}>🛒 {cartCount}</button>
                <div className="dropdown">
                    <button className="icon-button">👤</button>
                    <div className="dropdown-content">
                        {!user ? (
                            <>
                                <Link to="/account"><button>Iniciar Sesión</button></Link>
                                <Link to="/account"><button>Crear cuenta</button></Link>
                            </>
                        ) : (
                            <button onClick={handleSignOut}>Cerrar Sesión</button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
