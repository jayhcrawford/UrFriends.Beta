import React from 'react'
import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client';
// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_cdWTb8gOo",
  client_id: "71o0k11nso8pf5n79b5ekksbis",
  redirect_uri: "https://localhost:5173",
  response_type: "code",
  scope: "email openid phone",
};

const root = createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
