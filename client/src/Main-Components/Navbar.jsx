import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenu4Line, RiMessengerLine } from "react-icons/ri";
import {
  AiOutlineClose,
  AiOutlineProfile,
  AiFillMessage,
} from "react-icons/ai";
import {
  Bars3Icon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { AuthContext } from "../Context/AuthContext";
import { IoSettingsOutline } from "react-icons/io5";
import Notification from "../Components/Notification/Notification";
import Theme from "../hooks/theme";
import { motion, AnimatePresence } from "framer-motion";
import("preline");

const Navbar = ({ socket }) => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(true);
  };

  const closeNav = () => {
    setNav(false);
  };

  const path = useLocation().pathname;

  useEffect(() => {
    closeNav();
  }, [path]);

  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  const navItem = {
    exit: {
      x: -90,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="bg-white dark:bg-dark-secondary border-b border-b-gray-800 z-50 ">
      <div
        id="navbar"
        className=" flex relative z-[20] justify-center items-center w-screen text-black py-6  "
      >
        <div className="xl:max-w-[1200px] max-w-[90%] flex justify-center w-full items-center">
          <div className="flex justify-between items-center w-full">
            <div className="logo flex justify-center items-center gap-4">
              <Link to="/">
                <h1 className="text-3xl font-bold text-accent-1 dark:text-accent-1">
                  <span className="text-accent-2 dark:text-accent-3">Ride</span>
                  Bnb
                </h1>
                {/* <img src={RideBnb} alt="logo" className="w-[200px]" /> */}
              </Link>
            </div>

            <div className="menu-items flex justify-center items-center gap-7 ">
              <div className="">
                <div className="hidden lg:flex justify-center items-center gap-8 cursor-pointer top-0 ">
                  <Link to="/">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-lg text-gray-700 dark:text-accent-3 ">
                        Home
                      </div>
                    </div>
                  </Link>

                  <Link to="/about">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-lg text-gray-700 dark:text-accent-3">
                        About
                      </div>
                    </div>
                  </Link>

                  <Link to="/mybookings">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-700 dark:text-accent-3 text-lg">
                        My Bookings
                      </div>
                    </div>
                  </Link>

                  <Link to="/listvehicle">
                    <div className=" text-sm font-bold flex items-center gap-2 py-4 bg-accent-1 dark:text-accent-1 dark:bg-gray-900 hover:text-white hover:bg-black hover:border-black transition-all duration-300 ease-in-out text-white px-4 rounded-xl ">
                      <span>List Your Vehicle</span>
                    </div>
                  </Link>

                  <div className="  ">
                    <Theme />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 ">
                {user ? (
                  <div className="flex justify-center items-center gap-2 ">
                    <div>
                      <div className="flex justify-center items-center gap-4 ">
                        <Link to="/messenger">
                          <div className="p-[10px] rounded-full bg-accent-1 text-white hidden md:block">
                            <AiFillMessage className="text-3xl" />
                          </div>
                        </Link>

                        <div className="w-full h-full">
                          <Notification socket={socket} />
                        </div>
                        <div className="hs-dropdown [--placement:bottom-right]">
                          <button
                            id="hs-dropdown-with-header"
                            type="button"
                            className="hs-dropdown-toggle border-none inline-flex justify-center items-center gap-2 rounded-md  font-medium text-gray-700 align-middle"
                          >
                            <div className="relative inline-flex items-center p-2 justify-center w-12 h-12 overflow-hidden bg-accent-1 rounded-full dark:bg-gray-600">
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
                              <Link to={`/profile`}>
                                <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                  <AiOutlineProfile className="text-[16px]" />
                                  Profile
                                </div>
                              </Link>

                              <Link to={`/messenger`}>
                                <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                  <RiMessengerLine className="text-[16px]" />
                                  Messenger
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
                        className="hs-dropdown-toggle p-[14px] inline-flex justify-center items-center gap-2  rounded-md font-medium bg-white border-2 dark:border-0 text-gray-700 align-middle hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <svg
                          className="w-4 h-4 text-black dark:text-accent-3"
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

              <button
                onClick={handleNav}
                className="navbar-burger lg:hidden flex items-center dark:text-accent-3"
              >
                <Bars3Icon className="h-10 w-10" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {nav && (
          <motion.div
            variants={item}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            transition={{ duration: 0.4 }}
            exit="exit"
            className={`relative z-50 w-screen`}
          >
            <div className="fixed top-0 left-0 bottom-0 bg-light-main dark:bg-dark-main w-screen  overflow-y-auto ">
              <nav className="max-w-[90%] flex flex-col h-full py-4 mx-auto w-full">
                <div className="flex items-center mb-8">
                  <div className="mr-auto leading-none">
                    <h1 className="text-3xl font-bold text-accent-1 dark:text-accent-3">
                      <span className="text-accent-2">Ride</span>Bnb
                    </h1>
                  </div>
                  <button className="navbar-close" onClick={closeNav}>
                    <XMarkIcon className="w-12 h-12 text-accent-1" />
                  </button>
                </div>
                <div>
                  <ul>
                    <li className="mb-1">
                      <motion.div
                        variants={navItem}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        exit="exit"
                        className="mobile-nav-links"
                      >
                        Home
                      </motion.div>
                    </li>
                    <li className="mb-1">
                      <motion.div
                        variants={navItem}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        exit="exit"
                        className="mobile-nav-links"
                      >
                        About Us
                      </motion.div>
                    </li>
                    <li className="mb-1">
                      <motion.div
                        variants={navItem}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        exit="exit"
                        className="mobile-nav-links"
                      >
                        My Bookings
                      </motion.div>
                    </li>
                    <li className="mb-1">
                      <Link to="/explore">
                        <motion.div
                          variants={navItem}
                          initial={{ x: -80, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.35 }}
                          exit="exit"
                          className="mobile-nav-links"
                        >
                          Explore
                        </motion.div>
                      </Link>
                    </li>

                    <li className="mb-1">
                      <motion.div
                        variants={navItem}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        exit="exit"
                        className="flex items-center"
                      >
                        <h1 className="mobile-nav-links">Theme</h1>
                        <Theme />
                      </motion.div>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <div className="pt-6">
                    <Link to="/login">
                      <motion.div
                        variants={navItem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        exit="exit"
                        className="block px-4 py-4 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                      >
                        Sign in
                      </motion.div>
                    </Link>
                    <Link to="/register">
                      <motion.div
                        variants={navItem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        exit="exit"
                        className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-accent-1 hover:bg-blue-700  rounded-xl"
                      >
                        Sign Up
                      </motion.div>
                    </Link>
                  </div>
                  <p className="my-4 text-xs text-center text-gray-700 dark:text-accent-3">
                    <span>Copyright © 2021</span>
                  </p>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
