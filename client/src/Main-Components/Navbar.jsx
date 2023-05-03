import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { AuthContext } from "../Context/AuthContext";
import { IoSettingsOutline } from "react-icons/io5";
import { FcAbout, FcHome, FcBookmark, FcAddImage } from "react-icons/fc";
import RideBnb from "../assets/ridebnbv2.png";
import("preline");

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="sticky top-0 bg-white z-10">
      <div
        id="navbar"
        className="transition-all duration-300 ease-in-out flex relative z-[20] justify-center items-center w-screen bg-[#fcfcfc] text-black py-6 border-b"
      >
        <div className="xl:max-w-[1200px] max-w-[90%] flex justify-center w-full items-center">
          <div className="flex justify-between items-center w-full">
            <div className="logo">
              <Link to="/">
                <h1 className="text-3xl">
                  <span className="font-semibold">Ride</span>
                  <span className="font-semibold">Bnb</span>
                </h1>
                {/* <img src={RideBnb} alt="logo" className="w-[200px]" /> */}
              </Link>
            </div>

            <div className="menu-items flex justify-center items-center gap-7 ">
              <div className="">
                <div className="hidden lg:flex justify-center items-center gap-8 cursor-pointer top-0 ">
                  <Link to="/">
                    <div className="flex items-center gap-2">
                      <div>
                        <FcHome className="text-xl" />
                      </div>
                      <div className="font-medium text-[#23262f]">Home</div>
                    </div>
                  </Link>

                  <Link to="/about">
                    <div className="flex items-center gap-2">
                      <div>
                        <FcAbout className="text-xl" />
                      </div>
                      <div className="font-medium text-[#23262f]">About</div>
                    </div>
                  </Link>

                  <Link to="/mybookings">
                    <div className="flex items-center gap-2">
                      <div>
                        <FcBookmark className="text-xl" />
                      </div>
                      <div className="font-medium text-[#23262f]">
                        My Bookings
                      </div>
                    </div>
                  </Link>

                  <Link to="/listvehicle">
                    <div className=" font-medium flex items-center gap-2 py-2 bg-white border-2 hover:text-white hover:bg-black hover:border-black transition-all duration-300 ease-in-out text-black px-4 rounded-full ">
                      <FcAddImage className="text-xl" />
                      <span>List Your Vehicle</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 ">
                {user ? (
                  <div className="flex justify-center items-center gap-2 ">
                    <div>
                      <div>
                        <div className="hs-dropdown [--placement:bottom-right]">
                          <button
                            id="hs-dropdown-with-header"
                            type="button"
                            className="hs-dropdown-toggle border-none inline-flex justify-center items-center gap-2 rounded-md  font-medium bg-white text-gray-700 align-middle"
                          >
                            <div className="relative inline-flex items-center p-2 justify-center w-12 h-12 overflow-hidden bg-black rounded-full dark:bg-gray-600">
                              <span className="font-medium text-white dark:text-gray-300">
                                {user.customername[0]}
                                {user.customername[1]}
                              </span>
                            </div>
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
                              <Link
                                to={`/editprofile/user_id=${user.customer_id}`}
                              >
                                <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                  <IoSettingsOutline className="text-[16px]" />
                                  Settings
                                </div>
                              </Link>
                              <button
                                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                  <div className="hidden lg:flex justify-center items-center gap-5">
                    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                      <button
                        id="hs-dropdown-custom-icon-trigger"
                        type="button"
                        className="hs-dropdown-toggle p-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                      </button>

                      <div
                        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                        aria-labelledby="hs-dropdown-custom-icon-trigger"
                      >
                        <Link to={`/register`}>
                          <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <IoSettingsOutline className="text-[16px]" />
                            Register
                          </div>
                        </Link>
                        <Link to="/login">
                          <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                            <svg
                              className="flex-none"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                            </svg>
                            Log In
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="dropdown-menu lg:hidden">
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
                  ? `absolute top-20 left-0 flex justify-start z-10  rounded-b-3xl py-5 bg-white h-screen w-screen opacity-100 transition-all ease-in-out duration-1000 `
                  : `bg-transparent opacity-100 absolute w-screen left-0 -top-[800px] transition-all duration-1000 ease-in-out`
              }
            >
              <ul className="flex flex-col  p-8 gap-4 cursor-pointer w-full">
                <div className="flex flex-col gap-4 border-b w-full border-b-gray-200">
                  <li className=" font-medium ">Home</li>
                  <li className=" font-medium mb-3">About</li>
                </div>
                <div className="flex flex-col gap-4 border-b w-full border-b-gray-200">
                  <li className=" font-medium ">Dashboard</li>
                  <li className=" font-medium mb-3">List Your Vehicle</li>
                </div>
                <div className="flex flex-col gap-4">
                  {user ? (
                    <li
                      className="flex flex-col justify-center items-center gap-4"
                      onClick={logoutUser}
                    >
                      Log out
                    </li>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Link to="/register">
                        <li className=" font-medium ">Register</li>
                      </Link>
                      <Link to="/login">
                        <li className="font-medium">Log in</li>
                      </Link>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
