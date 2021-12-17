import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import "../css/simpleExpense.css";
import PriceInput from "./PriceInput";

export default class SimpleExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payer: {
        value: "",
        changed: false,
      },
      expenseMembers: {
        value: [],
        changed: false,
      },
      total: {
        value: 0,
        changed: false,
      },
    };
  }

  render() {
    const members = this.props.group.members;
    return (
      <div>
        {this.createPayerField(members)}
        <div id="simpleExpenseBill">
          {this.createExpenseMembersField(members)}
          {this.createTotalField(members)}
        </div>
      </div>
    );
  }

  createPayerField(members) {
    const canSetError = this.state.payer.changed || this.props.addButtonPressed;
    const hasError = canSetError && !this.state.payer.value;
    return (
      <FormControl fullWidth error={hasError}>
        <InputLabel id="payerLabel">Biller*</InputLabel>
        <Select
          labelId="payerLabel"
          label="Payer"
          defaultValue=""
          value={this.state.payer.value}
          onChange={(e) => {
            this.updateSubExpenses(
              e.target.value,
              this.state.expenseMembers.value,
              this.state.total.value
            );
            this.setState({ payer: { value: e.target.value, changed: true } });
          }}
        >
          {members.map((member) => {
            return (
              <MenuItem key={member} value={member}>
                {member}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  createExpenseMembersField(members) {
    const canSetError =
      this.state.expenseMembers.changed || this.props.addButtonPressed;
    const hasError = canSetError && !this.state.expenseMembers.value.length;
    return (
      <FormControl
        id="simpleExpenseMembers"
        required
        error={hasError}
        component="fieldset"
        variant="standard"
      >
        <FormLabel component="legend">Participants</FormLabel>
        <FormGroup>
          {members.map((member) => (
            <FormControlLabel
              key={member}
              control={
                <Checkbox
                  onChange={(e) => {
                    const newExpenseMembers =
                      this.state.expenseMembers.value.slice();
                    const checked = e.target.checked;
                    const member = e.target.name;
                    const memberIndex = newExpenseMembers.indexOf(member);
                    if (checked) {
                      if (memberIndex === -1) newExpenseMembers.push(member);
                    } else {
                      if (~memberIndex)
                        newExpenseMembers.splice(memberIndex, 1);
                    }
                    this.updateSubExpenses(
                      this.state.payer.value,
                      newExpenseMembers,
                      this.state.total.value
                    );
                    this.setState({
                      expenseMembers: {
                        value: newExpenseMembers,
                        changed: true,
                      },
                    });
                  }}
                  name={member}
                />
              }
              label={member}
            />
          ))}
        </FormGroup>
        {hasError && (
          <FormHelperText>at least one member required</FormHelperText>
        )}
      </FormControl>
    );
  }

  createTotalField() {
    return (
      <div>
        <PriceInput
          requestValidation={this.props.addButtonPressed}
          label="total ($)"
          onPriceChange={(newPrice) => {
            this.updateSubExpenses(
              this.state.payer.value,
              this.state.expenseMembers.value,
              newPrice
            );
            this.setState({ total: { value: newPrice, changed: true } });
          }}
        />
      </div>
    );
  }

  updateSubExpenses(payer, expenseMembers, total) {
    const subExpenses = [];
    if (expenseMembers.length === 0 || !payer) {
      return subExpenses;
    }
    expenseMembers.forEach((member) => {
      subExpenses.push({
        member,
        consumed: total / expenseMembers.length,
        paid: payer === member ? total : 0,
      });
    });
    if (!expenseMembers.includes(payer)) {
      subExpenses.push({
        member: payer,
        consumed: 0,
        paid: total,
      });
    }
    this.props.setSubExpenses(subExpenses);
  }
}
