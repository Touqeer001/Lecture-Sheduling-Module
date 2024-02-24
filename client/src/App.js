import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Admin/Home";
import IndividualCourses from "./Components/Admin/IndividualCourses";
import PrivateRoute from "./Components/Routes/Private.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

       
          <Route  path="home" element={<Home />}></Route>

        <Route
          path="/individualcourse"
          element={<IndividualCourses />}
        />

       
       
       
      </Routes>

    </>
  );
}

export default App;
