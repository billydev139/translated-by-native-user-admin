import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/Api";
import { config } from "../../../utils/EndPoints";

const getNotifications = createAsyncThunk("notifications/getNotifications", 
    async ({ from = "", to = "", read = null, page, limit  }, { rejectWithValue }) => {
        try {
        const response = await api.get(config.endPoints.getAllNotifications, { params: { from, to, read, page, limit } });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
} );

//  mark a notification as read specific notification
const markAsRead = createAsyncThunk("notifications/markAsRead", async (id, { rejectWithValue }) => {
    try {
        const response = await api.patch(`${config.endPoints.markAsRead}`, { notificationId : id });
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
} );

//  mark all notifications as read
const markAllAsRead = createAsyncThunk("notifications/markAllAsRead", async (_, { rejectWithValue }) => {
    try {
        const response = await api.patch(`${config.endPoints.markAllAsRead}`);
        return response.data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
} );

export { getNotifications, markAsRead, markAllAsRead };