import { createContext, useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Components/Toast/Toast";
import axiosInstance from "../Instance/instance";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  const loginUser = async (data, subError, setSubError) => {
    try {
      // const response = await axios.post("http://localhost:5000/auth/login", data);
      const response = await axiosInstance.post("/auth/login", data);
      setUser(response.data);
      toastSuccess(`Welcome ${response.data.customername}!`);
      // setTimeout(() => {
      //   window.location.replace("/");
      // }, 2000);
    } catch (err) {
      if (err.response.status === 422) {
        toastError("Invalid credentials");
        setSubError(err.response.data);
      } else {
        toastError("Something went wrong");
      }
    }
  };

  const logoutUser = async (data) => {
    // await axios.post('http://localhost:5000/auth/logout')
    await axiosInstance.post("/auth/logout");
    setUser("");
    window.location.replace("/");
    localStorage.removeItem("user");
  };

  const getUpdatedUser = async () => {
    try {
      const res = await axiosInstance.get("/user/getUser");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/user/getUser");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, getUpdatedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
