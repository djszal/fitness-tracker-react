import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [stateError, setStateError] = useState("");
  const navigate = useNavigate();
  console.log("stateError", stateError);

  //     setLoginErrors([errorMessage])
  //     return;
  //   }

  return (
    <>
      <div className="login">
        <h3 className="title">Login</h3>
        <form
          className="login-form"
          onSubmit={async (e) => {
            if (!usernameLogin || !passwordLogin) {
              e.preventDefault();
              const errorMessage = "Please enter valid username and password";
              console.log(errorMessage);
              setStateError(errorMessage);
            } else if (passwordLogin.length < 8) {
              const passwordLengthInvalid =
                "Your password needs to be at least 8 characters";
              setStateError(passwordLengthInvalid);
            } else {
              try {
                e.preventDefault();
                const response = await loginUser(usernameLogin, passwordLogin);
                //   console.log("USERNAME ", response);
                localStorage.setItem("token", response.token);
                navigate("/");
              } catch (error) {
                console.error(error);
              }
            }
          }}
        >
          <input
            value={usernameLogin}
            type="text"
            placeholder="username"
            minLength={3}
            onChange={(e) => setUsernameLogin(e.target.value)}
          ></input>
          <input
            value={passwordLogin}
            type="password"
            placeholder="password"
            minLength={8}
            onChange={(e) => setPasswordLogin(e.target.value)}
          ></input>
          <button type="submit">Login</button>
          <Link to="/register">Don't have an account? Register Here</Link>
          {stateError ? <h3>{stateError}</h3> : ""};
        </form>
      </div>
    </>
  );
};

export default Login;
