import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/profil');
        } catch (error) {
            setError('Failed to log in');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/bejelentkezés');
    };

    const token = localStorage.getItem('token');
    if (token) {
        return (
            <div className="login-container">
                <h2>Bejelentkezve</h2>
                <button onClick={handleLogout}>Kilépés</button>
            </div>
        );
    }

    return (
        <div className="login-container">
            <h2>Bejelentkezés</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Email cím:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Jelszó:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Bejelentkezés</button>
            </form>
        </div>
    );
};

export default Login;
