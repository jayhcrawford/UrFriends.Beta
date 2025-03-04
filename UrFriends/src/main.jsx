import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./app/store.js";

import { BrowserRouter as Router } from "react-router";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  </Router>
);
