import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  const logout = () => {
    localStorage.clear();
    props.setToken("");
  };

  return (
    <>
      <div className="header">
        <h3 className="app-title">Fitness Trac.kr</h3>
        <div className="navbar">
          <Link to={"/"} className="nav-links">
            Home
          </Link>
          <Link to={"/public_routines"} className="nav-links">
            Routines
          </Link>
          {props.token ? (
            <Link to={"/my-routines"} className="nav-links">
              My Routines
            </Link>
          ) : (
            ""
          )}

          <Link to={"/activities"} className="nav-links">
            Activities
          </Link>
          {!props.token ? (
            <Link to={"/login"} className="nav-links">
              Login
            </Link>
          ) : (
            <Link to={"/login"} className="nav-links" onClick={logout}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
