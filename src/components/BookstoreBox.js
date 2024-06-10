import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './BookstoreBox.css';

function BookstoreBox() {
    const [bookstores, setBookstores] = useState([]);

    useEffect(() => {
        const fetchBookstores = async () => {
            const bookstoresSnapshot = await getDocs(collection(db, 'bookstores'));
            const bookstoresList = bookstoresSnapshot.docs.map(doc => doc.data());
            setBookstores(bookstoresList);
        };

        fetchBookstores();
    }, []);

    return (
        <div className="bookstore-box-container">
            {bookstores.map((store, index) => (
                <div key={index} className="bookstore-box">
                    <div className="bookstore-image">
                        <img src={store.image} alt={store.name} />
                        <a href={store.urlDirection} target="_blank" rel="noopener noreferrer" className="direction-icon">
                            📍
                        </a>
                    </div>
                    <div className="bookstore-info">
                        <h3>{store.name}</h3>
                        <p>{store.direction}</p>
                        <p>{store.schedule}</p>
                        <p>{store.phone}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookstoreBox;
