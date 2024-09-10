import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    // Check if the token is truthy (not null, undefined, or an empty string)
    if (token) {
      // Save token in local storage
      localStorage.setItem('accessToken', token);

      // Redirect to the main application page
      navigate('/order');
    } else {
      // If the token is not truthy, redirect to the login page
      console.error('No token found, redirecting to login.');
      navigate('/');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
