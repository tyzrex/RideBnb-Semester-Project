import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import Home from './Components/Pages/Home'
import ListVehicle from './Components/Pages/ListVehicle'
import ExploreAll from './Components/Pages/ExploreAll'
import {IsAuthenticated,RidirectRegister} from './PrivateRoute/IsAuthenticated'
import PostDetails from './Components/Pages/PostDetails'
import EditProfile from './Components/Pages/EditProfile'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Home />,
    },
    {
      path:"/login",
      element: <Login />,
    },

    {
      path:"/register",
      element: <RidirectRegister><Register/></RidirectRegister>
    },

    {
      path:"/listvehicle",
      element: <IsAuthenticated><ListVehicle/></IsAuthenticated>
    },
    {
      path: "explore",
      element: <ExploreAll />
    },
    {
      path: "explore/:id",
      element: <PostDetails />
    },
    {
      path: "editprofile/:id",
      element: <EditProfile />
    }
  ]
)

const App = () => {
  return (
    <div className='app'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App