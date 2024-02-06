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
import Login from "./components/Common/Login.jsx";
import Signup from "./components/Common/Signup.jsx";
import PostCreate from "./components/Posts/PostCreate.jsx";
import PostEdit from "./components/Posts/PostEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      { path: "/posts/:postid", element: <PostPage /> },
      {
        path: "/user",
        element: <Users />,
      },
      {
        path: "/user/:userid",
        element: <UserPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/posts/create",
        element: <PostCreate />,
      },
      {
        path: "/posts/:postid/edit",
        element: <PostEdit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
