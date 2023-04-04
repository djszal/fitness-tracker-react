import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stateError, setStateError] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="register">
        <h3 className="title">Register</h3>
        <form
          className="register"
          onSubmit={async (e) => {
            if (!username || !password) {
              e.preventDefault();
              const errorMessage = "Please enter valid username and password";
              setStateError(errorMessage);
            } else {
              try {
                e.preventDefault();
                const token = await registerUser(username, password);
                localStorage.setItem("token", token);
                props.setToken(token);
                navigate("/");
              } catch (error) {
                console.error(error);
              }
            }
          }}
        >
          <input
            value={username}
            type="text"
            placeholder="username"
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            value={password}
            type="password"
            placeholder="password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="button">Register</button>
          {stateError ? <h3>{stateError}</h3> : ""}
        </form>
      </div>
    </>
  );
};

export default Register;
