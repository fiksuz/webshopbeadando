import React, { useState, useEffect } from "react";
import ProfileChange from "./DataChange";

interface UserData {
    lastName: string;
    firstName: string;
    email: string;
}

function App() {
    const [user, setUser] = useState<UserData | null>(null);
    const [isProfileChangeOpen, setProfileChangeOpen] = useState(false);

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
                localStorage.removeItem('accessToken');
                // Optional: Redirect to login page
                return;
            }

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

    const handleProfileChangeOpen = () => {
        setProfileChangeOpen(true);
    };

    const handleProfileChangeClose = () => {
        setProfileChangeOpen(false);
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Last Name: {user.lastName}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleProfileChangeOpen}>Adatok módosítása</button>
                </div>
            ) : (
                <p>Please log in</p>
            )}
            <ProfileChange isOpen={isProfileChangeOpen} onClose={handleProfileChangeClose} />
        </div>
    );
}

export default App;
