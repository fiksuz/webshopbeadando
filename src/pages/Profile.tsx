import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileChange from "./DataChange";

// Felhasználó adatainak típusa
interface UserData {
  lastName: string;
  firstName: string;
  email: string;
}

function App() {
  // Felhasználó állapota
  const [user, setUser] = useState<UserData | null>(null);

  // Profil szerkesztés ablak állapota
  const [isProfileChangeOpen, setProfileChangeOpen] = useState(false);

  // Felhasználó adatainak lekérése
  useEffect(() => {
    fetchUser();
  }, []);

  // Felhasználó adatainak lekérése a szerverről
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        // Opcionális: Átirányítás a bejelentkező oldalra
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Kijelentkezés kezelése
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("accessToken");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Last Name: {user.lastName}</p>
          <p>First Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <NavLink to="/update">Adatok módosítása</NavLink>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

export default App;
