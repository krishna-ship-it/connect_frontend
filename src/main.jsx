import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Profile from "./pages/Profile.jsx";
import Feed from "./pages/Feed.jsx";
import Signup from "./pages/Signup.jsx";
import Friends from "./pages/Friends.jsx";
import FriendSearchPage from "./pages/FriendSearchPage.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile/:user_id", element: <Profile /> },
      { path: "feed", element: <Feed /> },
      { path: "friends/:user_id", element: <Friends /> },
      { path: "people", element: <FriendSearchPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
