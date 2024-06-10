import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './ShoppingCartBox.css';

function ShoppingCartBox() {
    const { user } = useContext(AuthContext);
    const [cartBooks, setCartBooks] = useState([]);
    const [shippingZone, setShippingZone] = useState('México');
    const [shippingMethod, setShippingMethod] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchCartBooks = async () => {
            if (!user) return;

            const cartQuery = query(collection(db, 'shoppingCart'), where('idUser', '==', user.uid));
            const cartSnapshot = await getDocs(cartQuery);

            const cartBooksList = [];

            for (const docSnap of cartSnapshot.docs) {
                const cartBookData = docSnap.data();
                const bookRef = doc(db, 'books', cartBookData.idBook);
                const bookDoc = await getDoc(bookRef);

                if (bookDoc.exists()) {
                    const bookData = bookDoc.data();
                    const totalPrice = bookData.price * cartBookData.quantity; // Calcular el totalPrice
                    cartBooksList.push({ ...bookData, ...cartBookData, id: docSnap.id, totalPrice }); // Combinar datos de libro y datos del carrito
                }
            }

            setCartBooks(cartBooksList);
        };

        fetchCartBooks();
    }, [user, refresh]);

    const handleZoneChange = (e) => {
        setShippingZone(e.target.value);
    };

    const handleMethodChange = (e) => {
        setShippingMethod(e.target.value);
    };

    const handleUpdate = async (cartDocId, newQuantity, bookPrice) => {
        const totalPrice = bookPrice * newQuantity;
        const cartDocRef = doc(db, 'shoppingCart', cartDocId);
        await updateDoc(cartDocRef, { quantity: newQuantity, totalPrice }); // Actualizar cantidad y totalPrice
        setRefresh(!refresh);
    };

    const handleDelete = async (cartDocId) => {
        await deleteDoc(doc(db, 'shoppingCart', cartDocId));
        setRefresh(!refresh);
    };

    return (
        <div className="shopping-cart-box">
            <h2>Carrito de Compras</h2>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Artículo</th>
                        <th>Cantidad</th>
                        <th>P. Unidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cartBooks.map(book => (
                        <tr key={book.id}>
                            <td><img src={book.image} alt={book.title} className="book-image" /></td>
                            <td>
                                <input
                                    type="number"
                                    defaultValue={book.quantity}
                                    min={1}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value);
                                        handleUpdate(book.id, newQuantity, book.price);
                                    }}
                                />
                            </td>
                            <td>${book.price}</td>
                            <td>${book.totalPrice}</td>
                            <td>
                                <button
                                    className="update-button"
                                    onClick={() => handleUpdate(book.id, book.quantity, book.price)}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="select-container">
                <label htmlFor="shipping-zone">Zona de Envío:</label>
                <select id="shipping-zone" value={shippingZone} onChange={handleZoneChange}>
                    <option value="México">México</option>
                </select>
            </div>
            <div className="select-container">
                <label htmlFor="shipping-method">Forma de Envío:</label>
                <select id="shipping-method" value={shippingMethod} onChange={handleMethodChange}>
                    <option value="">Seleccionar forma de envío</option>
                    {/* Aquí puedes agregar más opciones de envío si lo deseas */}
                </select>
            </div>
        </div>
    );
}

export default ShoppingCartBox;
