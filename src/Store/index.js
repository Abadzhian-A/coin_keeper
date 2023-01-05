import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import budgetReducer from './Slices/budgetSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    budget: budgetReducer,
},
});