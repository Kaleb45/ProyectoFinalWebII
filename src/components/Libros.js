// src/components/Libros.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBooks } from '../firestore';
import BookCard from './BookCard';
import './Libros.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Libros() {
    const [libros, setLibros] = useState([]);
    const query = useQuery();
    const subject = query.get('subject');

    useEffect(() => {
        const fetchLibros = async () => {
            const librosList = await getBooks();
            const filteredLibros = librosList.filter(libro => libro.subject === subject);
            setLibros(filteredLibros);
        };

        fetchLibros();
    }, [subject]);

    return (
        <div className="libros">
            <h2>{subject}</h2>
            <div className="libros-grid">
                {libros.map(libro => (
                    <BookCard key={libro.id} book={libro} />
                ))}
            </div>
        </div>
    );
}

export default Libros;
