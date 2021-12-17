import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Groups from "./components/Groups";
import Group from "./components/Group";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/groups" element={<Groups />} />
        <Route exact path="/groups/:id" element={<Group />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
