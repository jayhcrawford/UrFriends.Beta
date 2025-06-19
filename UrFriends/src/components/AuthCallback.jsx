import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

//Catches the auth info from cognito and posts it to the backend

const AuthCallback = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); 
    const code = urlParams.get("code"); 



    if (code) {

      navigate("/")



      // fetch("https://td236amhd1.execute-api.us-east-2.amazonaws.com/main/api", {
        // method: "POST",
        // credentials: "include",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ code }), 
      // })
        // .then((res) => {

          // console.log(res, "is the auth response")
          // if (res.ok) navigate("/"); 
          // else throw new Error("Login failed"); 
        // })
        // .catch((err) => console.error(err)); 
    }
  }, [navigate]);

  return <div>Processing login...</div>; 
};

export default AuthCallback;