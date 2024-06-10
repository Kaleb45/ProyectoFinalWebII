// src/firestore.js
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Función para obtener todos los libros
export const getBooks = async () => {
    const booksCollection = collection(db, 'books');
    const booksSnapshot = await getDocs(booksCollection);
    const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return booksList;
};

// Función para agregar un nuevo libro
export const addBook = async (book) => {
    const booksCollection = collection(db, 'books');
    const docRef = await addDoc(booksCollection, book);
    return docRef.id;
};

// Función para actualizar un libro
export const updateBook = async (id, updatedBook) => {
    const bookDoc = doc(db, 'books', id);
    await updateDoc(bookDoc, updatedBook);
};

// Función para eliminar un libro
export const deleteBook = async (id) => {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
};
