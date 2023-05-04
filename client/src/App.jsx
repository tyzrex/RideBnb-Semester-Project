import React, { useContext, useEffect, useRef } from "react";
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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },

//   {
//     path: "/register",
//     element: (
//       <RidirectRegister>
//         <Register />
//       </RidirectRegister>
//     ),
//   },

//   {
//     path: "/listvehicle",
//     element: (
//       <IsAuthenticated>
//         <ListVehicle />
//       </IsAuthenticated>
//     ),
//   },
//   {
//     path: "/explore",
//     element: <ExploreAll />,
//   },
//   {
//     path: "/explore/:id",
//     element: <PostDetails socket={socket} />,
//   },
//   {
//     path: "/editprofile/:id",
//     element: (
//       <IsAuthenticated>
//         <EditProfile />
//       </IsAuthenticated>
//     ),
//   },
//   {
//     path: "*",
//     element: <ErrorPage />,
//   },

//   {
//     path: "/about",
//     element: <About />,
//   },
//   {
//     path: "/search",
//     element: <List />,
//   },

//   {
//     path: "/search/:location/:vehicleType",
//     element: <List />,
//   },
//   {
//     path: "/myBookings",
//     element: <Mybookings />,
//   },
//   {
//     path: "/experimentList",
//     element: <ExperimentList />,
//   },
//   {
//     path: "/messenger",
//     element: (
//       <IsAuthenticated>
//         <Messenger />
//       </IsAuthenticated>
//     ),
//   },
// ]);

const App = () => {
  const user = useContext(AuthContext);
  const shouldFetch = useRef(true);

  const socket = useRef(null);
  useEffect(() => {
    if (shouldFetch.current) {
      socket.current = io("http://localhost:3000", {
        transports: ["websocket"],
      });
    }
    shouldFetch.current = false;
  }, []);

  const emitNewUser = useRef(true);
  useEffect(() => {
    if (emitNewUser.current) {
      socket.current.emit("newUser", user);
    }
    emitNewUser.current = false;
  }, []);

  return (
    <div className="app">
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/login" element={<Login />} />
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
              <Messenger />
            </IsAuthenticated>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
