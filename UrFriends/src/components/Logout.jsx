import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { app_route } from "../main";

const Logout = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const removeUser = async() => {
      try {
        await auth.removeUser();
        window.location.href = app_route;
      } catch (error) {
        console.log(error)
      }
    }

    removeUser();
  }, []);

  return <div></div>;
};

export default Logout;
