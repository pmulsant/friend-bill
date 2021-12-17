import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import "../css/complexExpense.css";
import PriceInput from "./PriceInput";

export default class ComplexExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subExpenses: props.group.members.map((member) => ({
        member,
        consumed: 0,
        paid: 0,
      })),
    };
  }

  render() {
    const subExpenses = this.state.subExpenses;
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            {this.createTableHeader()}
            <TableBody>
              {subExpenses.map((subExpense, index) =>
                this.createLine(subExpenses, subExpense, index)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  createTableHeader() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>pseudo</TableCell>
          <TableCell align="right">consumed</TableCell>
          <TableCell align="right">paid</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  createLine(subExpenses, subExpense, index) {
    return (
      <TableRow
        key={subExpense.member}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {subExpense.member}
        </TableCell>
        <TableCell align="right">
          {this.createInput(subExpenses, index, true)}
        </TableCell>
        <TableCell align="right">
          {this.createInput(subExpenses, index, false)}
        </TableCell>
      </TableRow>
    );
  }

  createInput(subExpenses, index, consumed) {
    return (
      <PriceInput
        requestValidation={this.props.addButtonPressed}
        label="$"
        onPriceChange={(newPrice) => {
          const newSubExpenses = createNewSubExpenses(
            subExpenses,
            index,
            newPrice,
            consumed
          );
          this.props.setSubExpenses(newSubExpenses);
          this.setState({
            subExpenses: newSubExpenses,
          });
        }}
      />
    );
  }
}

function createNewSubExpenses(subExpenses, index, newValue, changeConsumed) {
  subExpenses = subExpenses.slice();
  const newSubExpenses = [];
  subExpenses.forEach((subExpense, theIndex) => {
    if (index === theIndex) {
      const consumed = changeConsumed ? newValue : subExpense.consumed;
      const paid = !changeConsumed ? newValue : subExpense.paid;
      newSubExpenses.push({
        member: subExpense.member,
        consumed,
        paid,
      });
      return;
    }
    newSubExpenses.push({
      member: subExpense.member,
      consumed: subExpense.consumed,
      paid: subExpense.paid,
    });
  });
  return newSubExpenses;
}
