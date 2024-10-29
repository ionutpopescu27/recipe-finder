import React, { useState } from 'react';
import {FIREBASE_AUTH, FIREBASE_DB} from '../context/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const RegisterScreen: React.FC = () => {
    const [username, setUsername] = useState('');   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            await setDoc(doc(FIREBASE_DB, 'users', user.uid),{
                username: username,
                email: email,
                createdAt: new Date()   
            })

            alert("Account created successfully!");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 border rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="name"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-3 w-full p-2 border rounded-xl"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3 w-full p-2 border rounded-xl"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-3 w-full p-2 border rounded-xl"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 border rounded-xl">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterScreen;
