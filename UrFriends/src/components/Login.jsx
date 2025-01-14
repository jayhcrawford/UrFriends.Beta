import React from "react";

const Login = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          padding: "4em",
          border: "2px solid black",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <form onSubmit={(event) => props.handleLogin(event)}>
          <input name="username" style={{ margin: "1em" }}></input>
          <br />
          <input name="password" style={{ margin: "1em" }} type="password"></input>
          <br />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
