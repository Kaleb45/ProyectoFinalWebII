// src/components/AddBookForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import './AddBookForm.css';

function AddBookForm() {
    const [bookData, setBookData] = useState({
        author: "",
        binding: "",
        bookType: "",
        date: "",
        editorial: "",
        image: "",
        isbn: "",
        itemCode: "",
        pages: "",
        price: "",
        subject: "",
        synopsis: "",
        title: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const booksCollection = collection(db, 'books');

            // Convertir la fecha a un objeto Timestamp
            const timestamp = Timestamp.fromDate(new Date(bookData.date));

            // Crear un objeto de datos con la fecha convertida
            const bookDataWithTimestamp = {
                ...bookData,
                date: timestamp
            };

            // Agregar el libro a Firestore
            await addDoc(booksCollection, bookDataWithTimestamp);
            alert("Libro agregado correctamente");
        } catch (error) {
            console.error("Error al agregar el libro:", error);
            alert("Error al agregar el libro");
        }
    };

    return (
        <div className="add-book-form">
            <h2>Añadir Libro</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Título: 
                    <br/>
                    <input type="text" name="title" value={bookData.title} onChange={handleChange} required />
                </label>
                <label>
                    Autor: 
                    <br/>
                    <input type="text" name="author" value={bookData.author} onChange={handleChange} required />
                </label>
                <label>
                    Editorial: 
                    <br/>
                    <input type="text" name="editorial" value={bookData.editorial} onChange={handleChange} required />
                </label>
                <label>
                    ISBN: 
                    <br/>
                    <input type="text" name="isbn" value={bookData.isbn} onChange={handleChange} required />
                </label>
                <label>
                    Código del artículo: 
                    <br/>
                    <input type="text" name="itemCode" value={bookData.itemCode} onChange={handleChange} required />
                </label>
                <label>
                    Tipo de Libro: 
                    <br/>
                    <select name="bookType" value={bookData.bookType} onChange={handleChange} required>
                        <option value="">Seleccionar tipo de libro</option>
                        <option value="Papel">Papel</option>
                        <option value="Ebook">Ebook</option>
                        <option value="Bajo Demanda de Impresión">Bajo Demanda de Impresión</option>
                    </select>
                </label>
                <label>
                    Encuadernación: 
                    <br/>
                    <input type="text" name="binding" value={bookData.binding} onChange={handleChange} required />
                </label>
                <label>
                    Páginas: 
                    <br/>
                    <input type="text" name="pages" value={bookData.pages} onChange={handleChange} required />
                </label>
                <label>
                    Precio: 
                    <br/>
                    <input type="text" name="price" value={bookData.price} onChange={handleChange} required />
                </label>
                <label>
                    Imagen: 
                    <br/>
                    <input type="text" name="image" value={bookData.image} onChange={handleChange} required />
                </label>
                <label>
                    Tema: 
                    <br/>
                    <select name="subject" value={bookData.subject} onChange={handleChange} required>
                        <option value="">Seleccionar tema</option>
                        <option value="Libros para Todos">Libros para Todos</option>
                        <option value="Literatura">Literatura</option>
                        <option value="Arte">Arte</option>
                        <option value="Auto-ayuda">Auto-ayuda</option>
                        <option value="Diccionario">Diccionario</option>
                        <option value="Interés General">Interés General</option>
                        <option value="Escolares">Escolares</option>
                        <option value="Arquitectura">Arquitectura</option>
                        <option value="Economía">Economía</option>
                        <option value="Derecho">Derecho</option>
                        <option value="Salud">Salud</option>
                        <option value="Medio Ambiente">Medio Ambiente</option>
                        <option value="Infantiles">Infantiles</option>
                        <option value="Juveniles">Juveniles</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Otros idiomas">Otros idiomas</option>
                        <option value="Humanidades">Humanidades</option>
                        <option value="Ingenierias">Ingenierias</option>
                    </select>
                </label>
                <label>
                    Sinopsis: 
                    <br/>
                    <textarea name="synopsis" value={bookData.synopsis} onChange={handleChange} required />
                </label>
                <label>
                    Fecha: 
                    <br/>
                    <input type="datetime-local" name="date" value={bookData.date} onChange={handleChange} required />
                </label>
                <button type="submit">Agregar Libro</button>
            </form>
        </div>
    );
}

export default AddBookForm;
