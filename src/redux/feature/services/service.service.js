import api from "../../../utils/Api";
import { config } from "../../../utils/EndPoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Create a new service
export const createService = createAsyncThunk(
  "service/createService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.createService}`, data);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Retrieve all services
export const getServices = createAsyncThunk(
  "service/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getServices}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Retrieve a single service by ID
export const getServiceById = createAsyncThunk(
  "service/getServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getSingleService}/${id}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a service by ID
export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${config.endPoints.updateService}/${id}`, data);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a service by ID
export const deleteServiceById = createAsyncThunk(
  "service/deleteServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${config.endPoints.deleteSingleService}/${id}`);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete all services
export const deleteAllServices = createAsyncThunk(
  "service/deleteAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${config.endPoints.deleteServices}`);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);
