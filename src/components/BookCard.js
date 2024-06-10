// src/components/BookCard.js
import React from 'react';
import './BookCard.css';

function BookCard({ book }) {
    return (
        <div className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            {book.editorial !== "N/A" && <p>{book.editorial}</p>}
            {book.price !== "N/A" && <p>${book.price}</p>}
            <div className="book-card-buttons">
                <button className="book-card-button">❤️</button>
                <button className="book-card-button">🛒</button>
            </div>
        </div>
    );
}

export default BookCard;
