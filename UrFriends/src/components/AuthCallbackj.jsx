import { useEffect } from "react"; // React hook for side effects
import { useNavigate } from "react-router-dom"; // React Router hook for navigation

const AuthCallback = () => {
  const navigate = useNavigate(); // Get navigation function

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Parse query string
    const code = urlParams.get("code"); // Extract the 'code' parameter from URL

    if (code) {
      // Send the code to backend to exchange for tokens
      fetch("https://localhost:3000/auth_reciever", {
        method: "POST",
        credentials: "omit", // Include cookies in the request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }), // Send the code in request body
      })
        .then((res) => {
          if (res.ok) navigate("/main"); // Navigate to dashboard on success
          else throw new Error("Login failed"); // Handle login error
        })
        .catch((err) => console.error(err)); // Log any errors
    }
  }, [navigate]);

  return <div>Processing login...</div>; // Show loading message while logging in
};

export default AuthCallback;