import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import "./Login.css";


const Login = () => {
    const [usernameLogin, setUsernameLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    return(
        <>
        <div className="login">
            <h3 className="title">Login</h3>
            <form className="login">
                <input value={usernameLogin} type="text" placeholder="username" minLength={3} onChange={(e) => setUsernameLogin(e.target.value)}></input> 
                <input value={passwordLogin} type="password" placeholder="password" minLength={3} onChange={(e) => setPasswordLogin(e.target.value)}></input>
                <button type="submit">Login</button>
                <Link to="/register">Don't have an account? Register Here</Link>
            </form>
        </div>
    </>
    )
    
}

export default Login;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const navigate = useNavigate();

  //   if (!usernameLogin || !passwordLogin || passwordLogin.length < 8) {
  //     const errorMessage = "Either no input or password too short";
  //     console.log(errorMessage);
  //     // setLoginErrors([errorMessage])
  //     return;
  //   }

  return (
    <>
      <div className="login">
        <h3 className="title">Login</h3>
        <form
          className="login-form"
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              console.log("USERNAME ", username);
              const token = await loginUser(username, password);
              localStorage.setItem("token", token);
              navigate("/");
            } catch (error) {
              console.error(error);
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
        </form>
      </div>
    </>
  );
};

export default Login;
