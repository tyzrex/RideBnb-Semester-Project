import React from "react";
import { Link } from "react-router-dom";

const ExploreCards = (props) => {
  return (
    <div>
      <div className="!z-5 hover:scale-105 transition-all duration-300 hover:shadow-xl shadow-lg relative flex flex-col rounded-[20px] max-w-[300px] xs:w-[400px] xs:max-w-[400px] sm:max-w-[600px] sm:w-[600px] lg:max-w-[500px] lg:w-[500px] xl:w-[300px] xl:max-w-[290px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 3xl:p-![18px] undefined">
        <div className="h-full w-full">
          <div className="relative w-full">
            <img
              src={`../../../Images/${props.vehicleImage}`}
              className="mb-2 h-[250px] object-cover w-full rounded-t-xl transition-transform duration-500 ease-in-out"
              alt=""
            />
            <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
              <div className="flex hover:text-red-600 h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
          <div className="m-5 flex items-center justify-between px-1 md:items-start">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700">
                {props?.vehicleName}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                Posted by :{" "}
                <span className="font-bold text-[#ff5a5f]">
                  {props.postedBy}
                </span>
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                Location :{" "}
                <span className="font-bold">{props.vehicleLocation}</span>
              </p>
            </div>
            <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
              <h1>
                {props.vehicleRating === null
                  ? "No Rating"
                  : parseFloat(props.vehicleRating).toFixed(1)}{" "}
                ⭐
              </h1>
            </div>
          </div>
          <div className="flex m-5 items-center justify-between md:items-center lg:justify-between ">
            <div className="flex">
              <p className="!mb-0 text-sm font-bold text-brand-500">
                Rs {props.vehiclePrice} per day
              </p>
            </div>
            <Link to={`/explore/${props.postId}`}>
              <button className="p-2 bg-main-accent text-white px-5 rounded-xl border-2 border-black hover:text-black hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300">
                {props.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCards;
