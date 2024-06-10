// src/components/Ebooks.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../firestore';
import BookCard from './BookCard';
import './Ebooks.css';

function Ebooks() {
    const [ebooks, setEbooks] = useState([]);

    useEffect(() => {
        const fetchEbooks = async () => {
            const booksList = await getBooks();
            const ebooksList = booksList.filter(book => book.bookType === "Ebook");
            setEbooks(ebooksList);
        };

        fetchEbooks();
    }, []);

    return (
        <div className="ebooks">
            <h2>Ebooks</h2>
            <div className="ebooks-grid">
                {ebooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default Ebooks;
