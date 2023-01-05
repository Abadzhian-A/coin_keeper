import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomes: [],
  costs: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    getIncomes(state, action) {
      state.incomes = action.payload;
    },
    getCosts(state, action) {
      state.costs = action.payload;
    },
  },
});

export const { getIncomes, getCosts } = budgetSlice.actions;

export default budgetSlice.reducer;