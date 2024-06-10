// src/components/Favourites.js
import React, { useEffect, useState, useContext } from 'react';
import { getBooks } from '../firestore';
import { AuthContext } from '../context/AuthContext';
import BookCard from './BookCard';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Favourites.css';

function Favourites() {
    const { user } = useContext(AuthContext);
    const [favouriteBooks, setFavouriteBooks] = useState([]);

    useEffect(() => {
        const fetchFavouriteBooks = async () => {
            if (!user) return;
            
            // Fetch favourite book IDs from Firestore
            const favQuery = query(collection(db, 'myFavourites'), where('idUser', '==', user.uid));
            const favSnapshot = await getDocs(favQuery);

            const favBookIds = favSnapshot.docs.map(doc => doc.data().idBook);

            // Fetch book details for each favourite book ID
            const booksList = await getBooks();
            const favBooksList = booksList.filter(book => favBookIds.includes(book.id));

            setFavouriteBooks(favBooksList);
        };

        fetchFavouriteBooks();
    }, [user]);

    return (
        <div className="favourites">
            <h2>Mis Favoritos</h2>
            <div className="favourites-grid">
                {favouriteBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default Favourites;
