import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <h3 className="home-title">Fitness Trac.kr</h3>
      <div className="search-bar">
        <input
          value={"Search"}
          type="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search THINGSSSS
        </button>
      </div>
      <Link to={"/login"} className="home-links">
        Login
      </Link>
      <Link to={"/register"} className="home-links">
        Register
      </Link>
    </>
  );
};

export default Home;
