import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;