// This slice will handle opening and closing the modal, 
// as well as tracking which component to render.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  componentName: null,
  componentProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {

    openModal: (state, action) => {
      state.isOpen = true;
      state.componentName = action.payload.componentName;
      state.componentProps = action.payload.componentProps || {};
    },
    
    closeModal: (state) => {
      state.isOpen = false;
      state.componentName = null;
      state.componentProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;