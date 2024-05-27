import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../components/css/Profile.css';

interface UserData {
  lastName: string;
  firstName: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (response.status === 401) {
        setUser(null);
        return;
      }

      const userData: UserData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    setUser(null); // A felhasználói állapot törlése
    localStorage.removeItem("accessToken");
    
    window.location.reload(); // Az oldal újratöltése
  };
  
  

  return (
    <div className="background">
    <div className="container">
      <h3 className="login-title">Adatok</h3>
      {user ? (
        <div className="user-info">
          <p>Last Name: {user.lastName}</p>
          <p>First Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <div className="button-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <NavLink className="link" to="/update">Profile Update</NavLink>
          </div>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  </div>
  
  );
}

export default App;
