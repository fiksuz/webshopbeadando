import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuthValid = () => {
  const history = useHistory();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        history.push('/login');
        return;
      }

      try {
        const response = await fetch('/user', {
          headers: { Authorization: Bearer ${token} }
        });

        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          history.push('/login');
        }
      } catch (err) {
        console.error('Error validating token:', err);
        localStorage.removeItem('token');
        history.push('/login');
      }
    };

    validateToken();
  }, [history]);
};
export default useAuthValid;