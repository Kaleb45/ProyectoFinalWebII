// src/components/Novedades.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../firestore';
import BookCard from './BookCard';
import './Homepage.css';

function Homepage() {
    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksList = await getBooks();
            setNovedades(booksList); // Obtener los primeros 4 libros
        };

        fetchBooks();
    }, []);

    return (
        <div className="novedades-container">
            <div className="novedades">
                <h2>Novedades</h2>
                <div className="novedades-books">
                    {novedades.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
