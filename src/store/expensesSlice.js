import { createSlice } from "@reduxjs/toolkit";

export const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpense: (state, action) => {
      state.expenses = action.expenses;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.expense);
    },
    removeExpense: (state, action) => {
      const expenseIndex = state.expenses.indexOf(action.expense);
      if (~expenseIndex) {
        state.expenses.splice(expenseIndex, 1);
      }
    },
  },
});

export const { setExpenses, addExpense, removeExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
