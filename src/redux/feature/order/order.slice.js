import { createSlice } from "@reduxjs/toolkit";
import { getOrders, getMyOrder, getSingleOrder, createOrder, uploadDoc } from "./order.service";

const initialState = {
  isLoading: false,
  orders: [],
  myOrder: [],
  singleOrder: [],
  orderSummary : {},
  CartData : {},
  error: null,
  success: false,
  loading: false
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.success = false;
      state.error = null;
      state.orderSummary = {};
    },
    setCurrentCreateOrder: (state, action) => {
      state.orderSummary = {
        ...state.orderSummary,
        ...action.payload
      }
    },
    setCartData: (state, action) => {
      state.CartData = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // uploadDoc
    .addCase(uploadDoc.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(uploadDoc.fulfilled, (state, action) => {
      state.error = null;
      state.orderSummary = {
        ...state.orderSummary,
        file: [
          ...(state.orderSummary.file || []), // Ensure state.orderSummary.file is an array
          ...action.payload.fileData
        ]
      };    
      state.loading = false;
      state.success = true;
    })
    .addCase(uploadDoc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
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

export const { clearOrderState, setCurrentCreateOrder,setCartData } = orderSlice.actions;
export default orderSlice.reducer;