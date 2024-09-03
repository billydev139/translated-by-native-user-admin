import { setLoading } from "../feature/loader/loader.slice";

// src/redux/middleware/loading.middleware.js
export const loadingMiddleware = (store) => (next) => (action) => {
  if (!action || !action.type) {
    // Safeguard in case the action is undefined or malformed
    return next(action);
  }
  const { dispatch } = store;
  if (action.type.endsWith('/pending')) {
    dispatch(setLoading({ key: action.type.replace('/pending', ''), value: true }));
  } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
    dispatch(setLoading({ key: action.type.replace(/\/(fulfilled|rejected)$/, ''), value: false }));
  }
  return next(action);
};