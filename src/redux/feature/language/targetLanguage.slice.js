import { createSlice } from "@reduxjs/toolkit";
import { 
  getTargetLanguages, 
  getLanguages // New action for retrieving languages
} from "./targetLanguage.service";

const targetLanguageSlice = createSlice({
  name: "targetLanguage",
  initialState: {
    targetLanguages: [],  // Array for targetLanguage languages
    languages: [], // Array for languages
    targetLanguage: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Get All Target Languages
      .addCase(getTargetLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTargetLanguages.fulfilled, (state, action) => {
        state.targetLanguages = action.payload; // Assign to targetLanguages array
        state.loading = false;
      })
      .addCase(getTargetLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Languages
      .addCase(getLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.languages = action.payload.languages; // Assign to languages array
        state.loading = false;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default targetLanguageSlice.reducer;
