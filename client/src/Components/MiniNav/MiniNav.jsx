import React from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const MiniNav = () => {
  const pagelocation = window.location.pathname;
  return (
    <div className="py-10 mx-auto max-w-[90%] xl:max-w-[1200px] w-screen ">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <button className="border-[2px] font-semibold  border-gray-300 dark:border-gray-700 rounded-full py-[10px] px-4 text-black hover:border-black text-sm hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
              <Link
                to="/"
                className="flex justify-center items-center gap-2 dark:text-accent-3"
              >
                <AiOutlineLeft />
                <span>Go Home</span>
              </Link>
            </button>
          </div>
          <div>
            <ol
              className="flex items-center whitespace-nowrap min-w-0"
              aria-label="Breadcrumb"
            >
              <li className="text-sm">
                <Link
                  className="flex items-center text-gray-500 hover:text-blue-600"
                  to={"/"}
                >
                  Home
                  <AiOutlineRight className="flex-shrink-0 mx-3 h-2.5 w-2.5 text-gray-600 dark:text-gray-600" />
                </Link>
              </li>
              <li className="text-sm">
                <Link
                  className="flex items-center text-accent-1 hover:text-red-500"
                  to={`${pagelocation}`}
                >
                  {pagelocation[1].toUpperCase() + pagelocation.slice(2)}
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniNav;
