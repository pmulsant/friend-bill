import { useNavigate } from "react-router";
import data from "../model/data";
import logo from "../images/logo.PNG";
import "../css/header.css";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <header>
      <img
        className="logo"
        src={logo}
        alt="logo"
        onClick={() => navigate("/groups")}
      />
      <p className="helloP">Hi, {data.user.pseudo}</p>
      <div className="buttonsDiv">
        {props.groupPage && (
          <button className="headerButton" onClick={() => navigate("/groups")}>
            back to groups
          </button>
        )}
        <button
          className="headerButton logoutButton"
          onClick={() => navigate("/")}
        >
          logout
        </button>
      </div>
    </header>
  );
}
