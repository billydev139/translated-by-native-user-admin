import { createSlice } from "@reduxjs/toolkit";
import {
  getTopics,
} from "./topic.service";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: [],
    topic: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // Get All Topics
      .addCase(getTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        state.topics = action.payload.document;
        state.loading = false;
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topicSlice.reducer;
