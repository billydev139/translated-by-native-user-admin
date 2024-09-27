import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { myProfile } from '../../redux/feature/auth/auth.service';

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
      navigate('/orders');
    } else {
      // If the token is not truthy, redirect to the login page
      console.error('No token found, redirecting to login.');
      navigate('/');
    }
  }, [navigate]);
    const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(myProfile());
    // other side effects
    //...
  }, []);
  return <div>Loading...</div>;
};

export default Callback;
