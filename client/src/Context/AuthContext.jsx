import { createContext, useEffect, useState,setState } from "react";
import axios from "axios"; 
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");

    const loginUser = async (data,loginError,setLoginError) => {
        
        try {
            const response = await axios.post("http://localhost:5000/auth/login", data)
            setUser(response.data);
            <Navigate to= "/"/>
        }
        catch (err) {
            setLoginError(err.response.data)
            console.log(err)
        }
    }

    const logoutUser = async (data) => {
        await axios.post('http://localhost:5000/auth/logout')
        setUser("")
        window.location.replace('/')
        localStorage.removeItem("user")
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}