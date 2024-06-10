import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../firestore'; // Asume que tienes una función getBookById en tu archivo firestore.js
import './BookDetailsPage.css';

function BookDetailsPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const fetchedBook = await getBookById(id);
            setBook(fetchedBook);
        };

        fetchBook();
    }, [id]);

    return (
        <div className="book-details">
            {book ? (
                <div>
                    <h2>{book.title}</h2>
                    <img src={book.image} alt={book.title} />
                    <p>Autor: {book.author || 'N/A'}</p>
                    <p>Editorial: {book.editorial || 'N/A'}</p>
                    <p>ISBN: {book.isbn || 'N/A'}</p>
                    <p>Tipo de libro: {book.bookType || 'N/A'}</p>
                    <p>Encuadernación: {book.binding || 'N/A'}</p>
                    <p>Páginas: {book.pages || 'N/A'}</p>
                    <p>Precio: {book.price !== "N/A" ? `$${book.price}` : 'N/A'}</p>
                    <p id='sinopsis'>Sinopsis: {book.synopsis || 'N/A'}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default BookDetailsPage;
