'use client'
// pages/page.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import './page.css'

const Page = () => {
    const API_URL_dev = "http://127.0.0.1:5000/"
    const API_URL_prod= "https://samuelokasiamachinemax.pythonanywhere.com/"
    const API_URL_IN_USE = API_URL_prod

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL_IN_USE}loginn`, {
                username,
                password,
            });
            // Store authentication data
            localStorage.setItem('auth', JSON.stringify(response.data));
            // Redirect to the dashboard page
            router.push('./');
        } catch (error) {
            console.error('Authentication failed:', error);
            // Handle error, show message, etc.
        }
    };

    return (
        <div className='login'>
            <h3 className='title'>MM Tools</h3>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    className='username-input'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className='password-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className='button title--sub' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Page;
