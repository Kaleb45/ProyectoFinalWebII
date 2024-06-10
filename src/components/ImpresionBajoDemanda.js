// src/components/ImpresionBajoDemanda.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../firestore';
import BookCard from './BookCard';
import './ImpresionBajoDemanda.css';

function ImpresionBajoDemanda() {
    const [librosImpresion, setLibrosImpresion] = useState([]);

    useEffect(() => {
        const fetchLibrosImpresion = async () => {
            const librosList = await getBooks();
            const librosImpresionList = librosList.filter(libro => libro.bookType === "Bajo Demanda de Impresión");
            setLibrosImpresion(librosImpresionList);
        };

        fetchLibrosImpresion();
    }, []);

    return (
        <div className="impresion-bajo-demanda">
            <h2>Libros Bajo Demanda de Impresión</h2>
            <div className="libros-grid">
                {librosImpresion.map(libro => (
                    <BookCard key={libro.id} book={libro} />
                ))}
            </div>
        </div>
    );
}

export default ImpresionBajoDemanda;
