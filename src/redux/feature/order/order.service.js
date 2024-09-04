import api from "../../../utils/Api"
import { config } from "../../../utils/EndPoints"
import { createAsyncThunk } from "@reduxjs/toolkit";

const getOrders = createAsyncThunk("order/getOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.getOrders}`)
    return response.data;

  } catch (error) {
      return rejectWithValue(error.message);
  }
});

const getMyOrder = createAsyncThunk("order/getMyOrder", async (data, { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.myOrder}?page=${data.page}&limit=${data.limit}&search=${data.search}`);
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

export { getOrders, getMyOrder };