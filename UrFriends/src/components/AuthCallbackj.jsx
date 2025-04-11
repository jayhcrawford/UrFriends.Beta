import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

//Catches the auth info from cognito and posts it to the backend

const AuthCallback = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); 
    const code = urlParams.get("code"); 
    if (code) {
      fetch("https://localhost:3000/auth_reciever", {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }), 
      })
        .then((res) => {
          if (res.ok) navigate("/main"); 
          else throw new Error("Login failed"); 
        })
        .catch((err) => console.error(err)); 
    }
  }, [navigate]);

  return <div>Processing login...</div>; 
};

export default AuthCallback;