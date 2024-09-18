import { createSlice } from "@reduxjs/toolkit";
import {
  createPlan,
  deleteAllPlans,
  deletePlanById,
  getPlanById,
  getPlans,
  updatePlan,
} from "./plan.service";

const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
    plan: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Create Plan
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
        state.loading = false;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Plans
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.plans = action.payload.plans;
        state.loading = false;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Plan by ID
      .addCase(getPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanById.fulfilled, (state, action) => {
        state.plan = action.payload;
        state.loading = false;
      })
      .addCase(getPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Plan
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(
          (plan) => plan.id === action.payload.id
        );
        if (index !== -1) {
          state.plans[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Plan by ID
      .addCase(deletePlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlanById.fulfilled, (state, action) => {
        state.plans = state.plans.filter(
          (plan) => plan.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deletePlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete All Plans
      .addCase(deleteAllPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllPlans.fulfilled, (state) => {
        state.plans = [];
        state.loading = false;
      })
      .addCase(deleteAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default planSlice.reducer;
