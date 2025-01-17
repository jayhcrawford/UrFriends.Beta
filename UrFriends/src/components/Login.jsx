import React from "react";

const Login = (props) => {
  return (
    <div className="login-container">
      <div className="login-div">
        <form onSubmit={(event) => props.handleLogin(event)}>
          <input name="username" style={{ margin: "1em" }}></input>
          <br />
          <input
            name="password"
            style={{ margin: "1em" }}
            type="password"
          ></input>
          <br />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
