import { connect } from "react-redux";
import "../css/expense.css";
import AccountBar from "./AccountBar";

function AmountsView(props) {
  const group = props.group;
  const expenses = props.expenses;
  group.expenses = expenses;
  const maxAccount = Math.max(
    ...group.members.map((member) => Math.abs(getMemberAccount(group, member)))
  );
  const accountGridElements = [];
  group.members.forEach((member) => {
    accountGridElements.push(<div key={member}>{member}</div>);
    accountGridElements.push(
      <div key={`${member}Bar`}>
        <AccountBar value={getMemberAccount(group, member) / maxAccount} />
      </div>
    );
    accountGridElements.push(
      <div key={`${member}Amount`} className="accountAmount">
        {Math.round(getMemberAccount(group, member) * 100) / 100}$
      </div>
    );
  });
  return (
    <section className="box">
      <h2>Accounts</h2>
      <div className="accountGrid">{accountGridElements}</div>
      {/* <table>
        <thead>
          <tr>
            <th>author</th>
            <th>name</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.name}>
              <td>{expense.author}</td>
              <td>{expense.name}</td>
              <td>{getTotal(expense)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </section>
  );
}

/*function getTotal(expense) {
  return expense.subExpenses.reduce(
    (prev, subExpense) => prev + subExpense.paid,
    0
  );
}*/

function getMemberAccount(group, member) {
  let account = 0;
  group.expenses.forEach((expense) => {
    expense.subExpenses.forEach((subExpense) => {
      if (member === subExpense.member) {
        account += subExpense.paid - subExpense.consumed;
      }
    });
  });
  return account;
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AmountsView);
