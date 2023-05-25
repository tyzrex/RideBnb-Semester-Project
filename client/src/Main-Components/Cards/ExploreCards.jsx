import React from "react";
import { Link } from "react-router-dom";

const ExploreCards = (props) => {
  return (
    <div>
      <div className="!z-5 hover:scale-105 transition-all duration-300 hover:shadow-xl shadow-lg relative flex flex-col rounded-[20px] max-w-[300px] xs:w-[400px] xs:max-w-[400px] sm:max-w-[600px] sm:w-[600px] lg:max-w-[500px] lg:w-[500px] xl:w-[300px] xl:max-w-[290px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 3xl:p-![18px] undefined">
        <div className="h-full w-full">
          <div className="relative w-full">
            <img
              src={props.vehicleImage}
              className="mb-2 h-[250px] object-cover rounded-t-xl transition-transform duration-500 ease-in-out"
              alt=""
            />
          </div>
          <div className="m-5 mt-10 flex items-center justify-between px-1 md:items-start border-b pb-2">
            <div className="mb-2">
              <p className="text-indigo-500 text-2xl font-bold text-navy-700">
                Rs. {props?.vehiclePrice}{" "}
                <span className="text-sm font-medium text-gray-600">
                  {props?.buttonText === "Book" ? "/day" : ""}
                </span>
              </p>

              <p className="mt-1 text-2xl font-bold text-black md:mt-2">
                {props.vehicleName}
              </p>

              <p className="mt-1 text-md font-medium text-gray-600 md:mt-2">
                <span className="">{props.vehicleLocation}</span>
              </p>
            </div>

            <button className="border-2 flex items-center justify-center rounded-full -mt-1 text-indigo-500 bg-white p-2 text-brand-500 hover:cursor-pointer">
              <div className="flex hover:text-red-600 h-full w-full items-center justify-center rounded-full text-2xl hover:bg-gray-50">
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
          <div className="flex m-5 items-center justify-between md:items-center lg:justify-between ">
            <Link to={`/explore/${props.postId}`}>
              <button className="p-2 bg-indigo-500 font-semibold text-white px-5 rounded-xl hover:text-black hover:border hover:border-gray-500 hover:bg-white transition-all ease-in-out duration-300">
                Book
              </button>
            </Link>

            <div className="flex">
              <div className="flex flex-row-reverse items-center md:mt-2 lg:mt-0">
                <h1>
                  4.5
                  {/* {props.vehicleRating === null
                    ? "❗"
                    : parseFloat(props.vehicleRating).toFixed(1)}{" "} */}
                  ⭐
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCards;
