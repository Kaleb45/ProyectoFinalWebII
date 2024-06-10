// src/components/Account.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import './Account.css';

function Account() {
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [user, setUser] = useState(null);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
            const user = userCredential.user;
            await addDoc(collection(db, 'users'), {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
            });
            setUser(user);
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registrando usuario');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            const user = userCredential.user;
            setUser(user);
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error iniciando sesión');
        }
    };

    return (
        <div className="account-container">
            <h2>Mi cuenta</h2>
            {!user && (
                <>
                    <div className="register-box">
                        <h3>Registrarse</h3>
                        <form onSubmit={handleRegisterSubmit}>
                            <label>
                                Nombre:
                                <input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} required />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange} required />
                            </label>
                            <label>
                                Contraseña:
                                <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} required />
                            </label>
                            <button type="submit">Registrarme</button>
                        </form>
                    </div>
                    <div className="login-box">
                        <h3>Iniciar Sesión</h3>
                        <form onSubmit={handleLoginSubmit}>
                            <label>
                                Email:
                                <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required />
                            </label>
                            <label>
                                Contraseña:
                                <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />
                            </label>
                            <button type="submit">Iniciar Sesión</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default Account;
