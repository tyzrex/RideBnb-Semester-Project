import React from "react";
import { useState } from "react";

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

  const [error, setError] = useState({});
  const [subError, setSubError] = useState("");

  const validate = () => {
    let error = {};
    if (!data.name) {
      error.username = "Username is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    setError(error);
    return error;
  };

  return (
       <div>
      <section className="bg-main-bg">
        <div className="lg:grid min-h-screen lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-[30vh] lg:order-first lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Pattern"
              src="https://images.unsplash.com/photo-1615968656371-986c58d584f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-center text-2xl font-bold text-main-text sm:text-3xl md:text-4xl">
                Welcome <span className="text-custom-green">Back</span>
              </h1>

              <p className="mt-4 text-center leading-relaxed text-gray-400">
                Login to your account to continue.
              </p>

              <form action="#" className="mt-8 gap-6">
                <div className="flex flex-col gap-6 justify-center">
                  <div>
                    <div className="py-2">
                      <h1 className="text-main-accent">Username</h1>
                    </div>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="UserName"
                      name="name"
                      autoComplete="username"
                      className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-main-fg text-sm text-white shadow-sm"
                    />
                    {error.name && (
                      <p className="text-red-500">{error.name}</p>
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
                      className="mt-1 p-2 w-full rounded-md  border border-gray-300 bg-main-fg text-sm text-gray-700 shadow-sm"
                    />
                    {error.password && (
                      <p className="text-red-500">{error.password}</p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center">
                    {subError ? (
                      <h1 className="text-red-600">{subError}</h1>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className=" flex flex-col items-center gap-4">
                    <button className="inline-block bg-main-text hover:bg-white  hover:border-2 hover:border-gray-500 hover:text-black shrink-0 rounded-md border  px-12 py-3 text-sm font-medium text-white transition focus:outline focus:ring">
                      Login
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Don't have an account?
                      <a
                        href="/register"
                        className="text-gray-700 underline hover:text-teal-300"
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
        </div>
      </section>
    </div>  );
};

export default Login;
