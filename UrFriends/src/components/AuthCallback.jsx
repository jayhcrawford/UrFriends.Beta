import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//Catches the auth info from cognito and posts it to the backend

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    console.log(code, "is code");
    console.log(state, "is state");
    navigate("/");



    console.log("code at home is", code, state)

    // const urlParams = new URLSearchParams(window.location.search);
    // const code = urlParams.get("code");
    // if (code) {
    //   fetch("https://td236amhd1.execute-api.us-east-2.amazonaws.com/main/api", {
    //     method: "POST",
    //     credentials: "omit",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ code }),
    //   })
    //     .then((res) => {
    //       console.log(res, "is the auth response");
    //       if (res.ok) navigate("/main");
    //       else throw new Error("Login failed");
    //     })
    //     .catch((err) => console.error(err));
    // }
  }, [searchParams]);

  return <div>Processing login...</div>;
};

export default AuthCallback;
