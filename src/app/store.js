import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import catalogReducer from '../features/catalog/catalogSlice';
import categoryReducer from '../features/category/categorySlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    catalog: catalogReducer,
    category: categoryReducer,
  },
});
