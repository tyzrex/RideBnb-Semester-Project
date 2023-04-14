import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import Home from './Components/Pages/Home'
import ListVehicle from './Components/Pages/ListVehicle'

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
      element: <Register />,
    },

    {
      path:"/listvehicle",
      element: <ListVehicle />,
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