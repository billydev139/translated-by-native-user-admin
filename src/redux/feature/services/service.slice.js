import { createSlice } from "@reduxjs/toolkit";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteServiceById,
  deleteAllServices
} from "./service.service";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    service: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Create Service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.loading = false;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Retrieve All Services
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload.services;
        state.loading = false;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Retrieve Single Service by ID
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.service = action.payload;
        state.loading = false;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Service by ID
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(service => service.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Service by ID
      .addCase(deleteServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceById.fulfilled, (state, action) => {
        state.services = state.services.filter(service => service.id !== action.meta.arg);
        state.loading = false;
      })
      .addCase(deleteServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete All Services
      .addCase(deleteAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllServices.fulfilled, (state) => {
        state.services = [];
        state.loading = false;
      })
      .addCase(deleteAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
