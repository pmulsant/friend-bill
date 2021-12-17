import { Alert, TextField } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import data from "../model/data";
import ComplexExpense from "./ComplexExpense";
import SimpleExpense from "./SimpleExpense";

export class ExpenseViewWrapper extends React.Component {
  subExpenses = [];

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      addButtonPressed: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.simpleExpense !== this.props.simpleExpense ||
      prevProps.complexExpense !== this.props.complexExpense
    ) {
      this.subExpenses = [];
      this.setState({
        name: "",
        addButtonPressed: false,
      });
    }
  }

  addExpense() {
    this.setState({ addButtonPressed: true });
    if (this.canCreateExpense()) {
      this.props.close();
      const expense = {
        author: data.user.pseudo,
        name: getName(this.props.group, this.state.name),
        subExpenses: this.subExpenses,
      };
      this.props.dispatch({
        type: "add",
        expense,
      });
    }
  }

  canCreateExpense() {
    console.log(this.subExpenses);
    if (this.subExpenses.length === 0) {
      return false;
    }
    let someonePaid = false;
    for (const subExpense of this.subExpenses) {
      if (subExpense.paid > 0) {
        someonePaid = true;
        break;
      }
    }
    return someonePaid;
  }

  render() {
    if (!this.props.simpleExpense && !this.props.complexExpense) {
      return null;
    }
    return (
      <div className="box">
        {this.createNameField()}
        {this.createExpenseView()}
        {this.createAddExpenseButton()}
        {this.createForbiddenComplexExpenseMessage()}
      </div>
    );
  }

  createNameField() {
    return (
      <div className="nameField">
        <TextField
          label="name"
          variant="standard"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
      </div>
    );
  }

  setSubExpenses = (subExpenses) => {
    this.subExpenses = subExpenses;
  };

  createExpenseView() {
    return this.props.simpleExpense ? (
      <SimpleExpense
        group={this.props.group}
        setSubExpenses={this.setSubExpenses}
        addButtonPressed={this.state.addButtonPressed}
      />
    ) : (
      <ComplexExpense
        group={this.props.group}
        setSubExpenses={this.setSubExpenses}
        addButtonPressed={this.state.addButtonPressed}
      />
    );
  }

  createAddExpenseButton() {
    return (
      <svg
        onClick={() => {
          this.addExpense();
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="addIcon h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  createForbiddenComplexExpenseMessage() {
    if (this.props.complexExpense)
      return (
        <div className="forbiddenMessageContainer">
          <Alert className="forbiddenAlert" severity="error">
            Premium mode required for creating complex expenses
          </Alert>
        </div>
      );
  }
}

export default connect((state) => state)(ExpenseViewWrapper);

function getName(group, name) {
  console.log("name:" + name);
  if (name === "") {
    name = "nameless";
  }
  const names = group.expenses.map((exp) => exp.name);
  if (!names.includes(name)) {
    return name;
  }
  let number = 1;
  let newName;
  while (names.includes((newName = `${name} (${number})`))) {
    number++;
  }
  return newName;
}
