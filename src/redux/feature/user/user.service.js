
import api from "../../../utils/Api"
import { config } from "../../../utils/EndPoints"
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${config.endPoints.getUsers}`)
    return response.data;

  } catch (error) {
     return rejectWithValue(error.message);
  }
});

const getUser = createAsyncThunk(
  'user/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getUser}?id=${id}`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 

export { getUsers, getUser };