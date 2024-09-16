import { createSlice } from "@reduxjs/toolkit";
import { getOrders, getMyOrder, getSingleOrder } from "./order.service";

const initialState = {
  isLoading: false,
  orders: [],
  myOrder: [],
  singleOrder: [],
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

    //getMyOrder
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

    //getSingleOrder
    .addCase(getSingleOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getSingleOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleOrder = action.payload;
    })
    .addCase(getSingleOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }

})

export default orderSlice.reducer;