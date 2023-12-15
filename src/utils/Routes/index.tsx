import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Layout from "../../components/Layout";
// import Dashboard from "../../pages/Dashboard";
import Users from "../../pages/Users";
import Stories from "../../pages/Stories";
import Posts from "../../pages/Posts";
import Categories from "../../pages/Categories";
import Channels from "../../pages/Channels";
import Admins from "../../pages/Admins";
import Settings from "../../pages/Settings";
import PrivateRoutes from "../PrivateRoutes";
import User from "../../pages/Users/User";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: "/users",
            element: <Users />
          },
          {
            path: '/user/:id',
            element: <User />
          },
          {
            path: "/stories",
            element: <Stories />,
          },
          {
            path: "/posts",
            element: <Posts />,
          },
          {
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "/channels",
            element: <Channels />,
          },
          {
            path: "/admins",
            element: <Admins />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
