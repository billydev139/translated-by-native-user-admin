import api from "../../../utils/Api";
import { config } from "../../../utils/EndPoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Retrieve all target languages
export const getTargetLanguages = createAsyncThunk(
  "targetLanguage/getTargetLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getTargetLanguages}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);
// Retrieve all target languages
export const getLanguages = createAsyncThunk(
  "targetLanguage/getLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getLanguages}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);


