import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import api from "../../../utils/Api";
import { config } from "../../../utils/EndPoints";

// Create a new plan
export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.endPoints.createPlan}`, data);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Retrieve all plans
export const getPlans = createAsyncThunk(
  "plan/getPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getPlans}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Retrieve a plan by ID
export const getPlanById = createAsyncThunk(
  "plan/getPlanById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.endPoints.getPlanById}/${id}`);
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a plan by ID
export const updatePlan = createAsyncThunk(
  "plan/updatePlan",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${config.endPoints.updatePlan}/${id}`, data);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a plan by ID
export const deletePlanById = createAsyncThunk(
  "plan/deletePlanById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${config.endPoints.deleteSinglePlan}/${id}`);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete all plans
export const deleteAllPlans = createAsyncThunk(
  "plan/deleteAllPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${config.endPoints.deletePlans}`);

      // Display success message from API
      Swal.fire("Success", response.data.message, "success");
      return response.data;
    } catch (error) {
      Swal.fire("Error", error.response.data.message || "An error occurred", "error");
      return rejectWithValue(error.response.data);
    }
  }
);
