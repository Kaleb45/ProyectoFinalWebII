// src/components/Menu.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

function Menu() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSubjectClick = (subject) => {
        navigate(`/libros?subject=${subject}`);
        setShowDropdown(false);  // Cerrar el dropdown después de hacer clic
    };

    return (
        <div className='menu-container'>
            <div className='menu'>
                <nav>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link className="menu-link" to="/">Inicio</Link>
                        </li>
                        <li className="menu-item" onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                            <span className="menu-link">Libros</span>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-column">
                                        <ul>
                                            <li><span><Link className="menu-link-span" to="/novedades">Novedades</Link></span></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown-column">
                                        <ul>
                                            <li><span onClick={() => handleSubjectClick('Libros para Todos')}>Libros para Todos</span></li>
                                            <li><span onClick={() => handleSubjectClick('Literatura')}>Literatura</span></li>
                                            <li><span onClick={() => handleSubjectClick('Arte')}>Arte</span></li>
                                            <li><span onClick={() => handleSubjectClick('Auto-ayuda')}>Auto-ayuda</span></li>
                                            <li><span onClick={() => handleSubjectClick('Diccionario')}>Diccionario</span></li>
                                            <li><span onClick={() => handleSubjectClick('Interés General')}>Interés General</span></li>
                                            <li><span onClick={() => handleSubjectClick('Escolares')}>Escolares</span></li>
                                            <li><span onClick={() => handleSubjectClick('Arquitectura')}>Arquitectura</span></li>
                                            <li><span onClick={() => handleSubjectClick('Economía')}>Economía</span></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown-column">
                                        <ul>
                                            <li><span onClick={() => handleSubjectClick('Derecho')}>Derecho</span></li>
                                            <li><span onClick={() => handleSubjectClick('Salud')}>Salud</span></li>
                                            <li><span onClick={() => handleSubjectClick('Medio Ambiente')}>Medio Ambiente</span></li>
                                            <li><span onClick={() => handleSubjectClick('Infantiles')}>Infantiles</span></li>
                                            <li><span onClick={() => handleSubjectClick('Juveniles')}>Juveniles</span></li>
                                            <li><span onClick={() => handleSubjectClick('Entretenimiento')}>Entretenimiento</span></li>
                                            <li><span onClick={() => handleSubjectClick('Otros idiomas')}>Otros idiomas</span></li>
                                            <li><span onClick={() => handleSubjectClick('Humanidades')}>Humanidades</span></li>
                                            <li><span onClick={() => handleSubjectClick('Ingenierías')}>Ingenierías</span></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="/ebooks">Ebooks</Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="/impresion-bajo-demanda">Bajo demanda</Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="/ayuda">Ayuda</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Menu;
