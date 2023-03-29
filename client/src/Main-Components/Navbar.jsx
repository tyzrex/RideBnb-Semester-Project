import React from 'react'
import { Link } from 'react-router-dom'
import {RiMenu4Line} from 'react-icons/ri'

const Navbar = () => {
  
  return (
    <div className='flex justify-center items-center bg-white text-black h-[10vh]'>
      <div className='lg:w-[1300px] max-w-[90%] flex justify-center items-center'>
      <div className='flex justify-between w-full '>
        <div className='logo p-[1rem]'>
          <Link to='/'>
          <h1 className='text-xl'>
            Ride<span className='font-bold'>Bnb</span>
          </h1>
          </Link>
        </div>
        <div className='menu-items'>
          <ul className='md:flex gap-4 cursor-pointer hidden'>
            <li className='li-style '>
              Dashboard
            </li>
            <li className='li-style '>
              Booking Schedule
            </li>
            <li className='li-style '>
              Account Settings
            </li>
            <li className='li-style '>
              Manage Booking
            </li>
          </ul>
        </div>
        <div className='buttons hidden md:block'>
          <div className='flex gap-4'>
            <Link to='/register'>
              <button className='p-[1rem] hover-underline-animation '>
                Register
              </button>
            </Link>
            <Link to='/login'>
            <button className='p-[1rem] bg-main-accent text-white rounded-md border-2 border-black hover:text-black hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300 '>
              Log In
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar