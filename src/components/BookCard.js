// src/components/BookCard.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './BookCard.css';

function BookCard({ book }) {
    const { user, toggleFavourite, toggleCart } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToFavourites = async () => {
        if (!user) {
            navigate('/account');
            return;
        }

        try {
            await toggleFavourite(book.id);
        } catch (error) {
            console.error("Error al manejar favoritos:", error);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/account');
            return;
        }

        try {
            await toggleCart(book.id, book.price);
        } catch (error) {
            console.error("Error al manejar carrito de compra:", error);
        }
    };

    return (
        <div className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            {book.editorial !== "N/A" && <p>{book.editorial}</p>}
            {book.price !== "N/A" && <p>${book.price}</p>}
            <div className="book-card-buttons">
                <button className="book-card-button" onClick={handleAddToFavourites}>❤️</button>
                <button className="book-card-button" onClick={handleAddToCart}>🛒</button>
            </div>
        </div>
    );
}

export default BookCard;
