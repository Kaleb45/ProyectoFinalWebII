// David Kaleb Real Haro 20300663 8D1

// src/components/Novedades.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../firestore';
import BookCard from './BookCard';
import AddBookForm from './AddBookForm';
import './Homepage.css';

function Homepage() {
    const [novedades, setNovedades] = useState([]);
    const [librosParaTodos, setLibrosParaTodos] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksList = await getBooks();
            setNovedades(booksList.slice(0, 4)); // Obtener los primeros 4 libros
            const librosParaTodosList = booksList.filter(book => book.subject === "Libros para Todos");
            setLibrosParaTodos(librosParaTodosList.slice(0, 4)); // Obtener los primeros 4 libros de "Libros para Todos"
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
            <div className="libros-para-todos">
                <h2>Libros para Todos</h2>
                <div className="libros-para-todos-books">
                    {librosParaTodos.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
            <AddBookForm />
        </div>
    );
}

export default Homepage;
