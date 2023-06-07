import React from "react";
import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../Toast/Toast";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import cardBg from "../../assets/login.svg";
import Animate from "react-smooth";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const { user, loginUser } = useContext(AuthContext);

  const [loginError, setLoginError] = useState({});
  const [subError, setSubError] = useState({});

  const validate = () => {
    let error = {};
    if (!data.name) {
      error.name = "Username is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    setLoginError(error);
    return error;
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const error = validate();
    if (Object.keys(error).length === 0) {
      loginUser(data, subError, setSubError);
    } else {
      toastError("Fill all fields");
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-dark-main">
        <div className="lg:grid min-h-screen lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-[60vh] lg:order-first lg:col-span-5 lg:h-full xl:col-span-6">
            <Animate to="1" from="0" attributeName="opacity">
              <img
                alt="Pattern"
                src={cardBg}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </Animate>
          </aside>

          <Animate to="1" from="0" attributeName="opacity">
            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <h1 className="mt-6 text-center dark:text-white text-2xl font-bold sm:text-3xl md:text-4xl text-black">
                  Welcome <span className="text-accent-1">Back</span>
                </h1>

                <p className="mt-4 text-center leading-relaxed text-gray-400">
                  Login to your account to continue.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 gap-6">
                  <div className="flex flex-col gap-6 justify-center">
                    <div>
                      <div className="py-2">
                        <h1 className="text-main-accent">Username</h1>
                      </div>
                      <input
                        onChange={handleChange}
                        type="text"
                        id="username"
                        name="name"
                        autoComplete="username"
                        placeholder="Username"
                        className="mt-1 p-3 w-full rounded-full border border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 text-black text-md shadow-sm"
                      />
                      {loginError.name && (
                        <p className="text-red-500">{loginError.name}</p>
                      )}
                    </div>

                    <div>
                      <div className="py-2">
                        <h1 className="text-main-accent">Password</h1>
                      </div>
                      <input
                        onChange={handleChange}
                        type="password"
                        id="Password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="********"
                        className="mt-1 p-3 w-full rounded-full  border border-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 text-md text-gray-700 shadow-sm"
                      />
                      {loginError.password && (
                        <p className="text-red-500">{loginError.password}</p>
                      )}
                    </div>

                    <div className=" flex flex-col items-center gap-4">
                      <button
                        type="submit"
                        className="inline-block bg-accent-1 hover:bg-white hover:text-black shrink-0 rounded-full px-12 py-3 text-lg font-semibold text-white transition"
                      >
                        Login
                      </button>
                      <ToastContainer />
                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Don't have an account?
                        <a
                          href="/register"
                          className="text-gray-700 underline hover:text-indigo-300"
                        >
                          Sign Up
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </main>
          </Animate>
        </div>
      </section>
    </div>
  );
};

export default Login;
