import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../Context/AuthContext";
import UserPng from "../assets/user.png";
import("preline");

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div
      id="navbar"
      className="transition-all duration-300 ease-in-out flex relative z-[20] justify-center items-center w-screen bg-white text-black py-6"
    >
      <div className="xl:max-w-[1300px] max-w-[95%] flex justify-center w-full items-center">
        <div className="flex  justify-between items-center w-full">
          <div className="logo">
            <Link to="/">
              <h1 className="text-3xl">
                Ride<span className="font-bold text-gray-500">Bnb</span>
              </h1>
            </Link>
          </div>
          <div className="menu-items flex justify-center items-center">
            <div className="lg:flex justify-center items-center gap-8 px-4 cursor-pointer hidden ">
              <Link to="/">
                <div className=" font-medium ">Home</div>
              </Link>
              <div className=" font-medium ">About</div>
              <div className=" font-medium  ">Booking Schedule</div>
              <Link to={`/editprofile`}>
                <div className=" font-medium  ">Settings</div>
              </Link>
              <Link to="/listvehicle">
                <div className=" font-medium bg-black button-hover text-white py-2 px-4 rounded-3xl">
                  List Your Vehicle
                </div>
              </Link>
            </div>
            <div className="flex justify-center ml-4 items-center gap-4 ">
              {user ? (
                <div className="flex justify-center pt-1 items-center gap-2 ">
                  <div>
                    <div>
                      <div className="hs-dropdown relative  [--placement:bottom-right]  inline-flex">
                        <button
                          id="hs-dropdown-with-header"
                          type="button"
                          className="hs-dropdown-toggle border-none inline-flex justify-center items-center gap-2 rounded-md  font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        >
                          <img src={UserPng} alt="user" className="w-10 h-10" />
                          <svg
                            className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>

                        <div
                          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden  min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 "
                          aria-labelledby="hs-dropdown-with-header"
                        >
                          <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700 ">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Signed in as
                            </p>
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-300">
                              <h1>{user.customername}</h1>
                              <h1>{user.email}</h1>
                            </div>
                          </div>
                          <div className="mt-2 py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              href="#"
                            >
                              <svg
                                className="flex-none"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                              </svg>
                              Bookings
                            </a>
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              href="#"
                            >
                              <svg
                                className="flex-none"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                              </svg>
                              My Listings
                            </a>
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              href="#"
                            >
                              <svg
                                className="flex-none"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                              </svg>
                              Settings
                            </a>
                            <button
                              className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              onClick={logoutUser}
                            >
                              <svg
                                className="flex-none"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden"></div>
              )}
              {user ? (
                <div className="hidden"></div>
              ) : (
                <div className="hidden sm:block">
                  <Link to="/register">
                    <button className="p-[1rem] font-medium hover-underline-animation ">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="p-[1rem] font-medium bg-main-accent text-white rounded-md border-2 border-black hover:text-black hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300 ">
                      Log In
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="dropdown-menu ml-5 pb-2 lg:hidden">
              <div onClick={handleNav}>
                {!nav ? (
                  <AiOutlineClose size={28} />
                ) : (
                  <RiMenu4Line size={28} />
                )}
              </div>
            </div>
          </div>

          <div
            className={
              !nav
                ? `absolute top-24 left-0 flex justify-center items-center py-5 bg-white w-screen opacity-100 transition-all ease-in-out duration-1000 `
                : `bg-transparent opacity-0 absolute w-screen left-0 -top-[800px] transition-all duration-1000 ease-in-out`
            }
          >
            <ul className="flex flex-col justify-center items-center gap-4 cursor-pointer">
              <li className=" font-medium ">Dashboard</li>
              <li className=" font-medium ">Booking Schedule</li>
              <li className=" font-medium ">Account Settings</li>
              <li className=" font-medium ">List vehicle</li>
              <li className="flex flex-col justify-center items-center gap-4">
                {user ? (
                  <button
                    onClick={logoutUser}
                    className="bg-custom-green button-hover bg-black text-white p-4 rounded-xl"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <Link to="/register">
                      <button className="p-[1rem] hover-underline-animation ">
                        Register
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="p-[1rem] bg-main-accent text-white rounded-md border-2 border-black hover:text-black hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300 ">
                        Log In
                      </button>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
