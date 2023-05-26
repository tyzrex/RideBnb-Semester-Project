import React, { useContext, useState, useEffect, useRef } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import io from "socket.io-client";
import { AuthContext } from "./Context/AuthContext";
import Profile from "./Components/Pages/Profile";
import { toastSuccess } from "./Components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import Navbar from "./Main-Components/Navbar";
import ShowNavbar from "./Main-Components/ShowNavbar/ShowNavbar";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const shouldFetch = useRef(true);

  const socket = useRef(null);
  useEffect(() => {
    if (shouldFetch.current) {
      if (user) {
        socket.current = io("https://ridebnb-backend.onrender.com", {
          transports: ["websocket"],
        });
      }
    }

    shouldFetch.current = false;
  }, []);

  const emitNewUser = useRef(true);
  useEffect(() => {
    if (emitNewUser.current) {
      if (user) {
        socket.current.emit("newUser", user);
        toastSuccess(`Welcome to RideBnb ${user.customername}`);
      }
    }
    emitNewUser.current = false;
  }, []);

  // const { isAuthenticated, User } = useSelector((state) => state.user);
  // console.log(isAuthenticated);
  // console.log(User);

  return (
    <div className="app">
      {/* <RouterProvider router={router} /> */}
      <ShowNavbar>
        <Navbar socket={socket} />
      </ShowNavbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RidirectRegister>
              <Login />
            </RidirectRegister>
          }
        />
        <Route
          path="/register"
          element={
            <RidirectRegister>
              <Register />
            </RidirectRegister>
          }
        />
        <Route
          path="/listvehicle"
          element={
            <IsAuthenticated>
              <ListVehicle />
            </IsAuthenticated>
          }
        />
        <Route path="/explore" element={<ExploreAll />} />
        <Route path="/explore/:id" element={<PostDetails socket={socket} />} />
        <Route
          path="/editprofile/:id"
          element={
            <IsAuthenticated>
              <EditProfile />
            </IsAuthenticated>
          }
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<List />} />
        <Route path="/search/:location/:vehicleType" element={<List />} />
        <Route path="/myBookings" element={<Mybookings />} />
        <Route path="/experimentList" element={<ExperimentList />} />
        <Route
          path="/messenger"
          element={
            <IsAuthenticated>
              <Messenger socket={socket} />
            </IsAuthenticated>
          }
        />
        <Route
          path="/profile"
          element={
            <IsAuthenticated>
              <Profile socket={socket} />
            </IsAuthenticated>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
