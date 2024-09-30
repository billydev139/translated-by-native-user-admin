import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import api from '../../../utils/Api';
import { config } from '../../../utils/EndPoints';

const authRegister = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.authRegister}`, data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: response?.data?.message,
          icon: 'success',
          timer: 2000,
        });
      }
      return response.data
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
        timer: 2000,
      });
      return rejectWithValue(error.message);
    }
  }
);

 const authLogin = createAsyncThunk(
  'auth/authLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.authLogin}`, data);

      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: response?.data?.message,
          icon: 'success',
          timer: 2000,
        });
      }
      console.log(response.data)
      return response?.data
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
        timer: 2000,
      });
      return rejectWithValue(error.message);
    }
  }
);

const logout = createAsyncThunk('auth/logout', async (_ , { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.authLogout}`);
    if (response.status === 200) {
      Swal.fire({
        title: 'Success',
        text: response?.data?.message,
        icon: 'success',
        timer: 2000,
      });
    }

    return response.data;

  } catch (error) {
      return rejectWithValue(error.message);
  }
});

// Change Password
const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.changePassword}`, data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: response?.data?.message,
          icon: 'success',
          timer: 2000,
        });
      }
      return response.data;
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
        timer: 2000,
      });
      return rejectWithValue(error.message);
    }
  }
);

// My Profile
const myProfile = createAsyncThunk(
  'auth/myProfile',
  async (_ , { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.myProfile}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Profile 
const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${config.endPoints.updateProfile}`, data);
      if(response)
      {
        // Success message
        Swal.fire({
        title: 'Success',
        text: 'Profile updated successfully!',
        icon: 'success',
        timer: 2000,
      });
      }

      return response.data;

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
        timer: 2000,
      });
      
      return rejectWithValue(error.message);
    }
  }
);

// Send Verification Email Link
const sendPasswordResetEmail = createAsyncThunk(
  'auth/sendPasswordResetEmail',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.sendPasswordResetEmail}`, data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: response?.data?.message,
          icon: 'success',
          timer: 2000,
        });
      }
      return response.data;
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
        timer: 2000,
      });
      return rejectWithValue(error.message);
    }
  }
);

// Reset Password
const resetUserPassword = createAsyncThunk(
  'auth/resetUserPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.resetUserPassword}`, data);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          text: response?.data?.message,
          icon: 'success',
          timer: 2000,
        });
      }
      return response.data;
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
        timer: 2000,
      });
      return rejectWithValue(error.message);
    }
  }
);

export { authRegister, authLogin, logout, changePassword, myProfile, updateProfile, sendPasswordResetEmail, resetUserPassword };
