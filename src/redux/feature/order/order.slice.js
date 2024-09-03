import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./order.service";

const initialState = {
  isLoading: false,
  orders: [],
  error: null
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }

})

export default orderSlice.reducer;