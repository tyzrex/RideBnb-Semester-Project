import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Home from "./Components/Pages/Home";
import ListVehicle from "./Components/Pages/ListVehicle";
import ExploreAll from "./Components/Pages/ExploreAll";
import List from "./Components/Pages/List";
import {
  IsAuthenticated,
  RidirectRegister,
} from "./PrivateRoute/IsAuthenticated";
import ExperimentList from "./Components/Pages/experimentList";
import PostDetails from "./Components/Pages/PostDetails";
import EditProfile from "./Components/Pages/EditProfile";
import ErrorPage from "./error/404";
import About from "./Components/Pages/About";
import Mybookings from "./Components/Pages/Mybookings";
import Messenger from "./Components/Messenger/Messenger";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: (
      <RidirectRegister>
        <Register />
      </RidirectRegister>
    ),
  },

  {
    path: "/listvehicle",
    element: (
      <IsAuthenticated>
        <ListVehicle />
      </IsAuthenticated>
    ),
  },
  {
    path: "/explore",
    element: <ExploreAll />,
  },
  {
    path: "/explore/:id",
    element: <PostDetails />,
  },
  {
    path: "/editprofile/:id",
    element: (
      <IsAuthenticated>
        <EditProfile />
      </IsAuthenticated>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/search",
    element: <List />,
  },

  {
    path: "/search/:location/:vehicleType",
    element: <List />,
  },
  {
    path: "/myBookings",
    element: <Mybookings />,
  },
  {
    path: "/experimentList",
    element: <ExperimentList />,
  },
  {
    path: "/messenger",
    element: <Messenger />,
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
