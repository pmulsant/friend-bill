import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import "../css/header.css";

export default function Login(props) {
  const navigate = useNavigate();
  return (
    <section className="loginSection">
      <span className="helper"></span>
      <div className="formContainer">
        <h1>Check your expenses</h1>
        <div className="fieldContainer">
          <TextField
            label="pseudo"
            variant="standard"
            disabled
            value="John"
            // onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="fieldContainer">
          <TextField
            label="password"
            type="password"
            variant="standard"
            disabled
            value="123456"
            // onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <button className="headerButton" onClick={() => navigate("/groups")}>
          connect
        </button>
      </div>
    </section>
  );
}
