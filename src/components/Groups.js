import { useEffect } from "react";
import { connect } from "react-redux";
import "../css/groups.css";
import data from "../model/data";
import GroupLink from "./GroupLink";
import Header from "./Header";

function Groups(props) {
  useEffect(() => {
    props.dispatch({ type: "set", expenses: null });
  });
  return (
    <section>
      <Header groupPage={false} />
      <div className="groupsContainer">
        <div className="groupsList">
          <h3>Select a group</h3>
          <ul>
            {data.groups.map((group) => (
              <GroupLink key={group.id} group={group} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Groups);
