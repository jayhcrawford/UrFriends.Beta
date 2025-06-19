import { useEffect } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom"; 


//Catches the auth info from cognito and posts it to the backend

const AuthCallback = () => {
  // const navigate = useNavigate(); 
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code"); 

  useEffect(() => {
      

      console.log(searchParams)
  }, [searchParams])


  return <div>Processing login...</div>; 
};

export default AuthCallback;