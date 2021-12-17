const initialState = { expenses: null };

export default function updateExpenses(state = initialState, action) {
  switch (action.type) {
    case "set":
      return { expenses: action.expenses };
    case "add":
      const expenses = state.expenses.slice();
      expenses.push(action.expense);
      return { expenses };
    case "remove":
      return {
        expenses: state.expenses.filter((exp) => exp === action.expense),
      };
    default:
      return state;
  }
}
