import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./app/store.js";

import { Route, BrowserRouter as Router, Routes } from "react-router";

import { AuthProvider } from "react-oidc-context";
import AuthCallback from "./components/AuthCallback.jsx";
import Logout from "./components/Logout.jsx";

export const app_route = "https://staging.d3q7upo85md648.amplifyapp.com"

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_k5tcpvEj8",
  client_id: "5c76hq5c4logshir8gvjksfdtk",
  redirect_uri: app_route + "/auth_reciever/",
  response_type: "code",
  scope: "email openid phone",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/auth_reciever" element={<AuthCallback />} />
          </Routes>
        </AuthProvider>
      </React.StrictMode>
    </Provider>
  </Router>
);
