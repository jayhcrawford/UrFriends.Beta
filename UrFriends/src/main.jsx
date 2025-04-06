import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./app/store.js";

import { BrowserRouter as Router } from "react-router";

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_k5tcpvEj8",
  client_id: "5c76hq5c4logshir8gvjksfdtk",
  redirect_uri: "http://localhost:3000/auth_reciever",
  response_type: "code",
  scope: "email openid phone",
};



ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
  <Provider store={store}>
    <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
    </React.StrictMode>
  </Provider>
  </Router>
);
