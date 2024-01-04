import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "login", element: <Login /> }],
  },
]);
import { Provider } from "react-redux";
import store from "./store/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
