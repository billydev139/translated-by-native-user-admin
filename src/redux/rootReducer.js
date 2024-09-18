import { combineReducers } from '@reduxjs/toolkit';

import orderReducer from './feature/order/order.slice';
import authReducer from './feature/auth/auth.slice';
import loaderSlice from './feature/loader/loader.slice';
import notificationSlice from './feature/notification/notification.slice';
import modalSlice from './feature/modal/modal.slice';
import targetLanguageReducer from './feature/language/targetLanguage.slice';
import topicReducer from './feature/topic/topic.slice';
import planSlice from './feature/plans/plan.slice';
import serviceSlice from './feature/services/service.slice';

const rootReducer = combineReducers({
  order: orderReducer, // Add other reducers here if needed
  auth: authReducer,
  notification: notificationSlice,
  loading : loaderSlice,
  modal: modalSlice,
  targetLanguage: targetLanguageReducer, // Add the target language reducer
  topic : topicReducer, // Add the topic reducer
  plan : planSlice, // Add the plan reducer
  service : serviceSlice,
})

export default rootReducer;
