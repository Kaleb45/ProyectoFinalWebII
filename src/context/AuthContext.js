// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favouriteCount, setFavouriteCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const favQuery = query(collection(db, 'myFavourites'), where('idUser', '==', user.uid));
                const favSnapshot = await getDocs(favQuery);
                setFavouriteCount(favSnapshot.size);

                const cartQuery = query(collection(db, 'shoppingCart'), where('idUser', '==', user.uid));
                const cartSnapshot = await getDocs(cartQuery);
                setCartCount(cartSnapshot.size);
            } else {
                setFavouriteCount(0);
                setCartCount(0);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleFavourite = async (bookId) => {
        const favQuery = query(collection(db, 'myFavourites'), where('idUser', '==', user.uid), where('idBook', '==', bookId));
        const favSnapshot = await getDocs(favQuery);

        if (!favSnapshot.empty) {
            const favDocId = favSnapshot.docs[0].id;
            await deleteDoc(doc(db, 'myFavourites', favDocId));
            setFavouriteCount(prevCount => prevCount - 1);
            alert("Libro eliminado de favoritos");
        } else {
            await addDoc(collection(db, 'myFavourites'), { idBook: bookId, idUser: user.uid });
            setFavouriteCount(prevCount => prevCount + 1);
            alert("Libro añadido a favoritos");
        }
    };

    const toggleCart = async (bookId, price) => {
        const cartQuery = query(collection(db, 'shoppingCart'), where('idUser', '==', user.uid), where('idBook', '==', bookId));
        const cartSnapshot = await getDocs(cartQuery);

        if (!cartSnapshot.empty) {
            const cartDocId = cartSnapshot.docs[0].id;
            await deleteDoc(doc(db, 'shoppingCart', cartDocId));
            setCartCount(prevCount => prevCount - 1);
            alert("Libro eliminado del carrito");
        } else {
            await addDoc(collection(db, 'shoppingCart'), { idBook: bookId, idUser: user.uid, quantity: 1, totalPrice: price });
            setCartCount(prevCount => prevCount + 1);
            alert("Libro añadido al carrito");
        }
    };

    return (
        <AuthContext.Provider value={{ user, favouriteCount, setFavouriteCount, cartCount, setCartCount, toggleFavourite, toggleCart }}>
            {children}
        </AuthContext.Provider>
    );
};
