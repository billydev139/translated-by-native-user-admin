import { createSlice } from '@reduxjs/toolkit';
import { getUsers, getUser } from './user.service';

const getInitialUserState = () => ({
  // accessToken: localStorage.getItem('accessToken') || '',
  users: [],
  singleUser: [],
  isLoading: false,
  // ProfileUpdateLoading: false,
  error: null,
  // message: '',
});

const userSlice = createSlice({
  name:"users",
  initialState: getInitialUserState(),
  reducers: {},

  extraReducers: (builder) => {
    builder
    //getUsers
    .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload?.content;
      })
     .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    //getUser
    .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser = action.payload;
      })
     .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


  }
})

export default userSlice.reducer;