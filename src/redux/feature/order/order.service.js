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

export { getOrders };