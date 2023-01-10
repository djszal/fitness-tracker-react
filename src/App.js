import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { fetchMe } from "./api/auth";

const App = () => {
  const [userData, setUserData] = useState({});
  //   console.log(userData);
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(token);

  useEffect(() => {
    if (token) {
      const getMe = async () => {
        const data = await fetchMe(token);
        setUserData(data);
      };
      getMe();
    }
  }, []);
  return (
    <>
      <Header />

      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
