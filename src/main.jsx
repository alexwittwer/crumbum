import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/Common/ErrorPage.jsx";
import App from "./components/App.jsx";
import Posts from "./components/Posts/Posts.jsx";
import PostPage from "./components/Posts/PostPage.jsx";
import Users from "./components/Users/Users.jsx";
import UserPage from "./components/Users/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
        children: [{ path: "/posts/:postid", element: <PostPage /> }],
      },
      {
        path: "/users",
        element: <Users />,
        children: [
          {
            path: "/users/:userid",
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
