import { useState } from "react";
import { connect } from "react-redux";
import "../css/expense.css";
import ExpenseViewWrapper from "./ExpenseViewWrapper";

function CreateExpenseView(props) {
  const group = props.group;
  const [simpleExpense, setSimpleExpense] = useState(false);
  const [complexExpense, setComplexExpense] = useState(false);
  return (
    <section>
      <div className="expenseButtonsContainer">
        <button
          className={`expenseButton expenseButtonLeft ${
            simpleExpense ? "expenseButtonSelected" : ""
          }`}
          onClick={() => {
            setComplexExpense(false);
            setSimpleExpense(!simpleExpense);
          }}
        >
          simple expense
        </button>
        <button
          onClick={() => {
            setSimpleExpense(false);
            setComplexExpense(!complexExpense);
          }}
          className={`expenseButton expenseButtonRight ${
            complexExpense ? "expenseButtonSelected" : ""
          }`}
        >
          complex expense
        </button>
      </div>
      <ExpenseViewWrapper
        simpleExpense={simpleExpense}
        complexExpense={complexExpense}
        close={() => {
          setSimpleExpense(false);
          setComplexExpense(false);
        }}
        group={group}
      />
    </section>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(CreateExpenseView);
