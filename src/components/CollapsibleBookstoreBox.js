import React, { useState } from 'react';
import './CollapsibleBookstoreBox.css';

function CollapsibleBookstoreBox({ place, bookstores }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="collapsible-bookstore-box">
            <div className="place-header" onClick={toggleOpen}>
                {place}
            </div>
            {isOpen && (
                <div className="bookstore-details">
                    {bookstores.map((bookstore) => (
                        <div key={bookstore.id} className="bookstore-item">
                            <div className="bookstore-image">
                                <img src={bookstore.image} alt={bookstore.name} />
                                <a href={bookstore.urlDirection} target="_blank" rel="noopener noreferrer">
                                    <button className="direction-button">🡺</button>
                                </a>
                            </div>
                            <div className="bookstore-info">
                                <p><strong>Nombre:</strong> {bookstore.name}</p>
                                <p><strong>Dirección:</strong> {bookstore.direction}</p>
                                <p><strong>Horario:</strong> {bookstore.schedule}</p>
                                <p><strong>Teléfono:</strong> {bookstore.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollapsibleBookstoreBox;
