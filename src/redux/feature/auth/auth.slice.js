import { createSlice } from '@reduxjs/toolkit';
import { authLogin, logout, updateProfile, myProfile } from './auth.service';

const getInitialAuthState = () => ({
  accessToken: '',
  isLoading: false,
  ProfileUpdateLoading: false,
  error: null,
  message: '',
  user: {},
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),

  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        const { content } = action.payload;
        state.accessToken = content?.accessToken
        localStorage.setItem('accessToken', content?.accessToken);
        console.log(content?.customer)
        state.user = content?.customer;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {};
        state.accessToken = '';
        state.error = null;
        state.message = action.payload.data?.message;

        localStorage.clear();
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // My Profile
      .addCase(myProfile.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      }
      )
      .addCase(myProfile.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.role = action.payload.user?.role;
        localStorage.setItem('role', action.payload.user?.role);

      })
      .addCase(myProfile.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.ProfileUpdateLoading = true;
        state.error = null;
      }
      )
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.ProfileUpdateLoading = false;
        state.error = null;
      }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.ProfileUpdateLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
