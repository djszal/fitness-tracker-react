import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Routines from "./components/Routines";
import MyRoutines from "./components/MyRoutines";
import Activities from "./components/Activities";
import { fetchMe } from "./api/auth";
import { getRoutines, getActivities, getRoutinesByUser } from "./api/api";

const App = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userRoutines, setUserRoutines] = useState([]);

  useEffect(() => {
    getRoutines(setRoutines);
    setToken(localStorage.getItem("token"));
    getActivities(setActivities);
    if (token) {
      const getMe = async () => {
        const data = await fetchMe(token);
        setUserData(data);
      };
      getMe();
    }
    if (userData.username) {
      const usersRoutines = async () => {
        const routineData = await getRoutinesByUser(token, userData.username);
        setUserRoutines(routineData);
      };
      usersRoutines();
    }
  }, [token, userData.username]);

  return (
    <>
      <Header setToken={setToken} token={token} />

      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/login"
            element={<Login setToken={setToken} />}
          ></Route>
          <Route
            exact
            path="/register"
            element={<Register setToken={setToken} />}
          ></Route>
          <Route
            exact
            path="/my-routines"
            element={
              <MyRoutines
                token={token}
                setRoutines={setRoutines}
                routines={routines}
                userData={userData}
                userRoutines={userRoutines}
                activities={activities}
                setUserRoutines={setUserRoutines}
              />
            }
          ></Route>
          <Route
            exact
            path="/public_routines"
            element={<Routines routines={routines} />}
          ></Route>
          <Route
            exact
            path="/activities"
            element={
              <Activities
                activities={activities}
                setActivities={setActivities}
                token={token}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
