import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Home.css";

const Home = (props) => {
  const [search, setSearch] = useState("");
  const [searchedRoutine, setSearchedRoutine] = useState([]);

  const { activities, routines } = props;

  const handleSearch = (e) => {
    routines.map((routine) => {
      e.preventDefault();
      routine.name.includes(search) ? setSearchedRoutine(routine) : "";
    });
    // routines.filter((routine) => {
    //   e.preventDefault();
    //   if (routine.name.includes(search)) {
    //     setSearchedRoutine(routine);
    //   }
    // });
  };

  return (
    <>
      <h2 className="app-title">Fitness Trac.kr</h2>
      <div className="search-bar">
        <form>
          <input
            type="search"
            name="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="button"
            onClick={(e) => {
              handleSearch(e);
            }}
          >
            Search for Routine
          </button>
        </form>
      </div>
      <div className="home-links-box">
        <Link to={"/login"} className="home-links">
          Login
        </Link>
        <Link to={"/register"} className="home-links">
          Register
        </Link>
      </div>

      {Object.keys(searchedRoutine).length ? (
        <div className="routine-block">
          <div className="single-routine">
            <h2>Routine</h2>
            <h3 className="routine-name">
              Routine Name: {searchedRoutine.name}
            </h3>
            <p className="routine-creator-name">
              Username: {searchedRoutine.creatorName}
            </p>
            <p className="routine-goal">Routine Goal: {searchedRoutine.goal}</p>
            {searchedRoutine.activities.map((activity, index) => (
              <div className="single-activity" key={index}>
                <h2>Activity</h2>
                <p className="activity-name">Name: {activity.name}</p>
                <p className="activity-description">
                  Description: {activity.description}
                </p>
                <p className="activity-duration">
                  Duration: {activity.duration}
                </p>
                <p className="activity-count">Count: {activity.count}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
