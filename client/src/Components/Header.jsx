import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Components/context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand" href="#"></NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  style={{ color: "white" }}
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Add Courses
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink
                  to="/PageNotFound"
                  className="nav-link"
                  href="#"
                  style={{ color: "white" }}
                >
                  Instructors
                </NavLink>
              </li>

              {!auth.user ? (
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{
                      color: "white",

                      marginRight: "70px",
                      border: "none",
                    }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        style={{ backgroundColor: "white", color: "black" }}
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      ></NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/"
                        className="nav-link"
                        style={{ color: "white" }}
                        onClick={handleLogout}
                      >
                        <button type="button" class="btn btn-primary">
                          Logout
                        </button>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
