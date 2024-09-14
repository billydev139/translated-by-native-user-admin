import { createSlice } from "@reduxjs/toolkit";
import { getNotifications, markAllAsRead, markAsRead } from "./notification.service";

const initialState = {
    isLoading: false,
    notifications: [],
    error: null
    }

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getNotifications.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getNotifications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload;
        })
        .addCase(getNotifications.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(markAsRead.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(markAsRead.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        .addCase(markAsRead.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(markAllAsRead.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(markAllAsRead.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        .addCase(markAllAsRead.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
})

export default notificationSlice.reducer;