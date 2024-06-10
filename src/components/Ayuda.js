// src/components/Ayuda.js
import React from 'react';
import './Ayuda.css';

function Ayuda() {
    return (
        <div className="ayuda-container">
            <h2>Ayuda</h2>
            <div className="ayuda-section">
                <h3>Atención al Cliente</h3>
                <p>Si tiene alguna duda, pregunta de su pedido o nuestro sitio web, favor de enviarnos un correo electrónico a la siguiente dirección: pedidosweb@gonvill.com.mx</p>
                <p>O favor de contactarnos en:</p>
                <p>LIBRERIAS GONVILL, S.A. DE C.V. </p>
                <p>Dirección: 8 de Julio #825</p>
                <p>Colonia: Moderna</p>
                <p>Ciudad: Guadalajara, Jalisco C.P.: 44190 </p>
                <p>País: México</p>
                <p>Teléfono: (33) 3837-2300 (veinte líneas) y 01-800-GONVILL (4668455)</p>
            </div>
            <div className="ayuda-section">
                <h3>Área de Usuario</h3>
                <p>
                    En el área de usuario, puedes gestionar tu perfil, ver el historial de compras,
                    guardar libros en tu lista de deseos, y mucho más. Asegúrate de iniciar sesión para acceder a
                    todas las funcionalidades.
                </p>
            </div>
            <div className="ayuda-section">
                <h3>Proceso de Compra</h3>
                <p>
                    Nuestro proceso de compra es sencillo y seguro. Añade los libros que desees al carrito,
                    procede a la caja, y sigue las instrucciones para completar tu compra. Aceptamos múltiples
                    métodos de pago y garantizamos la seguridad de tus datos.
                </p>
            </div>
        </div>
    );
}

export default Ayuda;
