import React, { useState, useEffect } from "react";

interface UserData {
  lastName: string;
  firstName: string;
  email: string;
}

function App() {
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
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      
    }
  };

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
          
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

export default App;
