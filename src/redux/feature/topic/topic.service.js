import api from "../../../utils/Api";
import { config } from "../../../utils/EndPoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Retrieve all topics
const getTopics = createAsyncThunk(
  "topic/getTopics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getTopics}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);
export { getTopics };