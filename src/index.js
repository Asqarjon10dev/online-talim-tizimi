import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// redux va RTK Query uchun
import { Provider } from "react-redux";
import { store } from "./context/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
