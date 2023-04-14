import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Line } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import { AuthContext } from "../Context/AuthContext";
import("preline");

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };
 
  const {user,logoutUser} = useContext(AuthContext);
  console.log(user)
  return (
    <div id="navbar" className="transition-all duration-300 ease-in-out flex relative z-[20] justify-center items-center w-screen bg-white text-black py-5">
      <div className="lg:max-w-[1300px] max-w-[95%] flex justify-center w-full items-center">
        <div className="flex justify-between items-center w-full">
          <div className="logo p-[1rem]">
            <Link to="/">
              <h1 className="text-xl">
                Ride<span className="font-bold">Bnb</span>
              </h1>
            </Link>
          </div>
          <div className="menu-items">
            <ul className="lg:flex gap-4 cursor-pointer hidden">
              <li className="li-style ">Dashboard</li>
              <li className="li-style ">Booking Schedule</li>
              <li className="li-style ">Account Settings</li>
              <li className="li-style ">Manage Booking</li>
            </ul>
          </div>

          <div className="buttons flex justify-center items-center gap-6">
            <div className="sm:flex hidden gap-4 ">
            {user?(
                            <button className='p-4 text-black hover-underline-animation'>{user.customername}</button>
                        ):(
                            <></>
                        )}
                        {user? <button onClick={logoutUser} className='bg-custom-green hover:bg-emerald-500 p-4 rounded-full ease-in-out duration-500 hover:text-white'>Logout</button> : (<>
                          <Link to="/register">
                <button className="p-[1rem] hover-underline-animation ">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="p-[1rem] bg-main-accent text-white rounded-md border-2 border-black hover:text-black hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300 ">
                  Log In
                </button>
              </Link></>) }
             
            </div>

            <div className="dropdown-menu lg:hidden">
            <div onClick={handleNav}>
                        {!nav ? <AiOutlineClose size={28} /> : <RiMenu4Line size={28} />}
                    </div>
            </div>

            <div className={!nav ? `absolute top-24 left-0 flex justify-center items-center py-5 bg-white w-screen opacity-100 transition-all ease-in-out duration-1000 ` : `bg-transparent opacity-0 absolute w-screen left-0 -top-[800px] transition-all duration-1000 ease-in-out`}>
              
              <ul className="flex flex-col justify-center items-center gap-4 cursor-pointer">
                <li className="li-style ">Dashboard</li>
                <li className="li-style ">Booking Schedule</li>
                <li className="li-style ">Account Settings</li>
                <li className="li-style ">Manage Booking</li>
                <li>
                  <Link to="/register">
                    <button className="p-[1rem] hover-underline-animation ">
                      Register
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <button className="p-[1rem] bg-main-accent text-white rounded-md border-2 border-black hover:text-black hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300 ">
                      Log In
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
