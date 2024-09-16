import { combineReducers } from '@reduxjs/toolkit';

import orderReducer from './feature/order/order.slice';
import authReducer from './feature/auth/auth.slice';
import loaderSlice from './feature/loader/loader.slice';
import notificationSlice from './feature/notification/notification.slice';
import modalSlice from './feature/modal/modal.slice';

const rootReducer = combineReducers({
  order: orderReducer, // Add other reducers here if needed
  auth: authReducer,
  notification: notificationSlice,
  loading : loaderSlice,
  modal: modalSlice
})

export default rootReducer;
