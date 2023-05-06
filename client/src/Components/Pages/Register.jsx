import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import regimage from "../../assets/reg.svg";
import Animate from "react-smooth";
import { useNavigate } from "react-router-dom";
import validate from "../../validation/RegisterValidation";
import { toastError, toastSuccess } from "../Toast/Toast";
import Carsvg from "../../assets/carsvg.png";

const Register = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  //   setErrors(validate({ ...data, [e.target.name]: e.target.value }));
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    const errors = validate({ ...data, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errors[name] }));
  };

  const notify = () => {
    toastSuccess("Register Success");
  };
  //handle submit for button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(data);
    setErrors({
      name: error.name,
      email: error.email,
      password: error.password,
      address: error.address,
      phone: error.phone,
    });
    console.log(error);
    if (Object.keys(error).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/register",
          data
        );
        console.log(res);
        setLoading(false);
        setTimeout(() => {
          notify();
        }, 1000);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } catch (error) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          const errorMessage = errors.map((error) => error.msg).join(" & ");
          toastError(errorMessage);
        } else {
          toastError(error);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <section className="bg-main-bg">
          <div className="lg:grid min-h-screen lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-[60vh] lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <Animate to="1" from="0" attributeName="opacity">
                <img
                  alt="Pattern"
                  src={regimage}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </Animate>
            </aside>

            <Animate to="1" from="0" attributeName="opacity">
              <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
                <div className="max-w-xl lg:max-w-3xl">
                  <a className="block text-main-accent" href="/">
                    <span className="sr-only">Home</span>
                    <img
                      className="h-12 w-auto"
                      src={Carsvg}
                      alt="Workflow"
                    />{" "}
                  </a>

                  <h1 className="mt-6 text-2xl font-bold text-main-text sm:text-3xl md:text-4xl">
                    Welcome to Ride
                    <span className="text-indigo-500">Bnb</span>
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-500">
                    So what are you waiting for? Register and unleash your
                    creativity.
                  </p>

                  <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="py-2">
                        <h1 className="text-main-text">Username</h1>
                      </div>

                      <input
                        onChange={handleChange}
                        type="text"
                        id="Username"
                        name="name"
                        className="mt-1 p-3 w-full rounded-full border text-black border-gray-300 bg-main-md text-sm shadow-sm"
                        aria-required="true"
                      />

                      {errors.name && (
                        <p className="text-red-500 text-xs italic">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <div className="py-2">
                        <h1 className="text-main-text">Email</h1>
                      </div>

                      <input
                        onChange={handleChange}
                        type="email"
                        id="Email"
                        className="mt-1 p-3 w-full rounded-full border border-gray-300 bg-main-fg text-md text-black shadow-sm"
                        name="email"
                      />

                      {errors.email && (
                        <p className="text-red-500 text-xs italic">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="py-2">
                        <h1 className="text-main-text">Password</h1>
                      </div>

                      <input
                        onChange={handleChange}
                        type="password"
                        id="Password"
                        name="password"
                        autoComplete="on"
                        className="mt-1 p-3 w-full rounded-full border border-gray-300 bg-main-fg text-md text-black shadow-sm"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs italic">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="py-2">
                        <h1 className="text-main-text">Address</h1>
                      </div>

                      <input
                        onChange={handleChange}
                        type="address"
                        id="Address"
                        name="address"
                        autoComplete="on"
                        className="mt-1 p-3 w-full rounded-full border border-gray-300 bg-main-fg text-md text-black shadow-sm"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs italic">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="py-2">
                        <h1 className="text-main-text">Phone No</h1>
                      </div>

                      <input
                        onChange={handleChange}
                        type="phone"
                        id="Phone"
                        name="phone"
                        autoComplete="on"
                        className="mt-1 p-3 w-full rounded-full border border-gray-300 bg-main-fg text-md text-black shadow-sm"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs italic">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      {loading ? (
                        <button
                          onClick={handleSubmit}
                          className="inline-block bg-indigo-500 hover:bg-black shrink-0 rounded-full border border-none bg-custom-green px-8 py-3 text-md font-semibold text-white transition hover:text-white focus:outline-none focus:ring"
                        >
                          Create an account
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent text-white font-semibold bg-black"
                          >
                            <span
                              class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                              role="status"
                              aria-label="loading"
                            ></span>
                            <span>Creating Account</span>
                          </button>
                        </>
                      )}
                      <ToastContainer />
                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account?
                        <a
                          href="/login"
                          className="text-gray-500 underline hover:text-gray-700"
                        >
                          Log in
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </main>
            </Animate>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
