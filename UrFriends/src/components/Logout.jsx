import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const Logout = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const removeUser = async() => {
      try {
        await auth.removeUser();
        navigate("/main")
      } catch (error) {
        console.log(error)
      }
    }

    removeUser();
  }, []);

  return <div></div>;
};

export default Logout;
