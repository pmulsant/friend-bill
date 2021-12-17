//import { configureStore } from "@reduxjs/toolkit";
//import expensesSlice from "./expensesSlice";
import { createStore } from "redux";
import updateExpenses from "./expensesReducer";

/*export default configureStore({
  reducer: {
    expensesSlice,
  },
});*/

export default createStore(updateExpenses);
