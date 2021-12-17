import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import data from "../model/data";
import AmountsView from "./AmountsView";
import CreateExpenseView from "./CreateExpenseView";
import Header from "./Header";

function Group(props) {
  const params = useParams();
  const group = data.groups.find((group) => group.id === +params.id);
  useEffect(() => {
    if (group && !props.expenses) {
      props.dispatch({ type: "set", expenses: group.expenses });
    }
  });
  return (
    <section>
      <Header groupPage={true} />
      {!group && <div>Error : group not found</div>}
      {group && props.expenses && (
        <div className="innerSection">
          <CreateExpenseView group={group} />
          <AmountsView group={group} />
        </div>
      )}
    </section>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Group);
