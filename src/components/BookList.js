// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { getBooks } from '../firestore';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksList = await getBooks();
            setBooks(booksList);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Lista de Libros</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
