import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthValid from '../auth/useAuthValid';

interface User {
  firstName: string;
  lastName: string;
}

interface ProfileChangeProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileChange: React.FC<ProfileChangeProps> = ({ isOpen, onClose }) => {
  useAuthValid();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ firstName: '', lastName: '' });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });

        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data: User = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchUserData();
  }, [navigate, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.firstName || !user.lastName) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(user)
      });

      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        navigate('/login');
        return;
      }

      if (response.status === 400) {
        setError('Incorrect data');
        return;
      }

      if (!response.ok) {
        throw new Error('Modification error');
      }

      const data: User = await response.json();
      setUser(data);
      setError('');
      onClose();
    } catch (err) {
      console.error('Modification error:', err);
      setError('Failed to modify');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1>Profile Change</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileChange;
