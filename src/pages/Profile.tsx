import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
    <div>
      {user ? (
        <div>
          <p>Last Name: {user.lastName}</p>
          <p>First Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <NavLink to="/update">Profile Update</NavLink>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

export default App;
