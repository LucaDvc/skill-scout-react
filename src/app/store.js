import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import catalogReducer from '../features/catalog/catalogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
  },
});
