import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthValid = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error validating token:", err);
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
      }
    };

    validateToken();
  }, []);

  return isLoggedIn;
};

export default useAuthValid;