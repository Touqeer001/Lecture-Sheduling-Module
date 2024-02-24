import React from "react";

import axios from "axios";

import { toast } from "react-toastify";

import "./Login.css";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        alert("Signin Success...");

        navigate("/Home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="row registers">
        <div className="col-md-6">
          <img id="image" src="images\Login.jpg" alt="Login"></img>
        </div>

        <div className="col-md-4 registerBorder">
          <div className="registers">
            <h3 style={{ color: "white" }}>Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                />
              </div>

              <button type="submit" className="btn1 btn-primary">
                Login..
              </button>
            </form>

            <div className="signUpText">
              Dont Have an Account
              <Link
                to="/register"
                style={{
                  //textDecoration: "none",
                  color: "white",
                  fontWeight: "600",
                  marginLeft: "5px",
                }}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
