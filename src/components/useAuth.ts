import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Frissítettük a tokent
    console.log('Token:', token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log('Is Logged In:', isLoggedIn);
  }, []);

  return isLoggedIn;
};

export default useAuth;