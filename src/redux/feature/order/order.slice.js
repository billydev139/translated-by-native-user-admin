import { createSlice } from "@reduxjs/toolkit";
import { getOrders, getMyOrder } from "./order.service";

const initialState = {
  isLoading: false,
  orders: [],
  myOrder: [],
  error: null
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //getOrders -> get all orders
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

    //getMyOrder -> get a single order
    .addCase(getMyOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getMyOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myOrder = action.payload;
    })
    .addCase(getMyOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }

})

export default orderSlice.reducer;