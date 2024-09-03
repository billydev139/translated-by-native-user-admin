import { combineReducers } from '@reduxjs/toolkit';

import orderReducer from './feature/order/order.slice';
import authReducer from './feature/auth/auth.slice';
import userReducer from './feature/user/user.slice';
import loaderSlice from './feature/loader/loader.slice';

const rootReducer = combineReducers({
  order: orderReducer, // Add other reducers here if needed
  auth: authReducer,
  user: userReducer,
  loading : loaderSlice
})

export default rootReducer;
