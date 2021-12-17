import "../css/accountBar.css";

export default function AccountBar(props) {
  return (
    <div className="barContainer">
      <span className="helper"></span>
      <div className="bar">
        <div
          className="innerBar"
          style={{
            backgroundColor: props.value >= 0 ? "#8ce99a" : "#ffa8a8",
            width: `calc(${Math.abs(props.value)} * 100% / 2)`,
            left:
              props.value >= 0
                ? "50%"
                : `calc(50% + ${props.value} * 100% / 2)`,
          }}
        ></div>
      </div>
    </div>
  );
}
