import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooks } from '../firestore';
import BookCard from './BookCard';
import './SearchResultsPage.css';

function SearchResultsPage() {
    const { term } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const booksList = await getBooks();
            const filteredBooks = booksList.filter(book =>
                book.title.toLowerCase().includes(term.toLowerCase()) ||
                book.author.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(filteredBooks);
        };

        fetchSearchResults();
    }, [term]);

    return (
        <div className="search-container">
            <div className="search-results">
                <h2>Resultados de la búsqueda para "{term}":</h2>
                <div className="search-books">
                    {searchResults.length > 0 ? (
                        searchResults.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchResultsPage;
