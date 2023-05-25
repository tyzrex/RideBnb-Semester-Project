import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export const IsAuthenticated = ({children}) => {

    const {user} = useContext(AuthContext)

  return (
    <div>
        {user?children:<Navigate to="/login"/>}
    </div>
  )
}

export const RidirectRegister = ({children}) => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            {!user?children:<Navigate to="/"/>}
        </div>
    )
} 
