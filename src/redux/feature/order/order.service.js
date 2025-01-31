import Swal from "sweetalert2";
import api from "../../../utils/Api"
import { config } from "../../../utils/EndPoints"
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create a new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post(config.endPoints.createOrder, orderData);
      return response.data;
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response.data.message, icon: 'error' });
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadDoc = createAsyncThunk(
  "order/uploadDoc",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post(config.endPoints.uploadDoc, orderData);
      return response.data;
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response.data.message, icon: 'error' });
      return rejectWithValue(error.response.data);
    }
  }
);


export const getOrders = createAsyncThunk("order/getOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.getOrders}`)
    return response.data;

  } catch (error) {
      return rejectWithValue(error.message);
  }
});

export const getMyOrder = createAsyncThunk("order/getMyOrder", async ({page, search = "", limit}, { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.myOrder}?page=${page}&limit=${limit}&search=${search}`);
    return response.data;

  } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error('Error Response:', error.response);
        return rejectWithValue(error.response.data);

      } else if (error.request) {
        // No response received from the server
        console.error('No Response:', error.request);
        return rejectWithValue('No response from server');
        
      } else {
        // Something else caused the error
        console.error('Error Message:', error.message);
        return rejectWithValue(error.message);
      }
    }
})

export const getSingleOrder = createAsyncThunk('order/getSingleOrder', async ({id}, { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.getSingleOrder}/${id}`)
    return response?.data;


  } catch (error) {
      console.log('Error Message:', error.message);
      return rejectWithValue(error.message);
  }
})

