import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Save token in local storage or context
      localStorage.setItem('accessToken', token);

      // Redirect to the main application page
      navigate('/order');
    } else {
      // Handle the case where there is no token
      console.error('No token found');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
