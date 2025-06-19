import { useEffect } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 


//Catches the auth info from cognito and posts it to the backend

const AuthCallback = () => {
  // const navigate = useNavigate(); 

  useEffect(() => {
      const [searchParams] = useSearchParams();
      // const code = searchParams.get("code"); 

      console.log(searchParams)
  })


  return <div>Processing login...</div>; 
};

export default AuthCallback;