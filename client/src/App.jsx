import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './Components/Pages/Login'
import Register from './Components/Pages/Register'
import Home from './Components/Pages/Home'

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