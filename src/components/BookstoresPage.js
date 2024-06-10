import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import CollapsibleBookstoreBox from './CollapsibleBookstoreBox';
import './BookstoresPage.css';

function BookstoresPage() {
    const [bookstores, setBookstores] = useState([]);
    const [newBookstore, setNewBookstore] = useState({
        image: '',
        urlDirection: '',
        name: '',
        direction: '',
        schedule: '',
        phone: '',
        place: ''
    });

    useEffect(() => {
        const fetchBookstores = async () => {
            const bookstoreCollection = collection(db, 'bookstores');
            const bookstoreSnapshot = await getDocs(bookstoreCollection);
            const bookstoreList = bookstoreSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookstores(bookstoreList);
        };

        fetchBookstores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBookstore(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'bookstores'), newBookstore);
            setBookstores([...bookstores, { id: docRef.id, ...newBookstore }]);
            setNewBookstore({
                image: '',
                urlDirection: '',
                name: '',
                direction: '',
                schedule: '',
                phone: '',
                place: ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const groupedBookstores = bookstores.reduce((acc, bookstore) => {
        if (!acc[bookstore.place]) {
            acc[bookstore.place] = [];
        }
        acc[bookstore.place].push(bookstore);
        return acc;
    }, {});

    return (
        <div className="bookstores-page">
            <h2>Nuestras Librerías</h2>
            {Object.keys(groupedBookstores).map(place => (
                <CollapsibleBookstoreBox key={place} place={place} bookstores={groupedBookstores[place]} />
            ))}

            <div className="add-bookstore-form">
                <h3>Añadir Nueva Librería</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="image"
                        placeholder="Imagen URL"
                        value={newBookstore.image}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="urlDirection"
                        placeholder="URL Dirección"
                        value={newBookstore.urlDirection}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={newBookstore.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="direction"
                        placeholder="Dirección"
                        value={newBookstore.direction}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="schedule"
                        placeholder="Horario"
                        value={newBookstore.schedule}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        value={newBookstore.phone}
                        onChange={handleChange}
                        required
                    />
                    <select name="place" value={newBookstore.place} onChange={handleChange} required>
                        <option value="">Seleccionar lugar</option>
                        <option value="GUADALAJARA, JAL.">GUADALAJARA, JAL.</option>
                        <option value="PUERTO VALLARTA, JAL.">PUERTO VALLARTA, JAL.</option>
                        <option value="CHIHUAHUA, CHIH.">CHIHUAHUA, CHIH.</option>
                        <option value="MAZATLÁN, SIN.">MAZATLÁN, SIN.</option>
                        <option value="CULIACÁN, SIN.">CULIACÁN, SIN.</option>
                        <option value="CDMX / OFICINA (NOTA: VENTA EXCLUSIVA MAYOREO).">CDMX / OFICINA (NOTA: VENTA EXCLUSIVA MAYOREO).</option>
                        <option value="MONTERREY, N.L.">MONTERREY, N.L.</option>
                        <option value="LEÓN, GTO.">LEÓN, GTO.</option>
                        <option value="SAN LUIS POTOSÍ, S.L.P.">SAN LUIS POTOSÍ, S.L.P.</option>
                        <option value="TORREÓN, COAH.">TORREÓN, COAH.</option>
                        <option value="QUERÉTARO, QRO.">QUERÉTARO, QRO.</option>
                        <option value="AGUASCALIENTES, AGS.">AGUASCALIENTES, AGS.</option>
                    </select>
                    <button type="submit">Añadir Librería</button>
                </form>
            </div>
        </div>
    );
}

export default BookstoresPage;
