import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/bejelentkezés');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        // Unauthorized or Forbidden
                        localStorage.removeItem('token');
                        navigate('/bejelentkezés');
                    } else {
                        throw new Error('Failed to fetch user data. Status: ' + response.status);
                    }
                } else {
                    const data: User = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
                localStorage.removeItem('token');
                navigate('/bejelentkezés');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/bejelentkezés');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Error loading user data.</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-info">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
