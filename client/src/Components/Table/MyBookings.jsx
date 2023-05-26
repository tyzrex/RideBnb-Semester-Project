import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axiosInstance from "../../Instance/instance";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../Toast/Toast";

function Table() {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axiosInstance.get("/booking/getBookingById");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      getBookings();
      console.log(bookings);
      shouldFetch.current = false;
    }
  }, []);

  return (
    <>
      <div className="w-screen max-w-[90%] mx-auto xl:max-w-[1200px] mb-10 relative dark:bg-gray-900 rounded-2xl ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-xl dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 dark:text-white">
                My bookings
              </p>
              <p className="text-sm sm:text-base leading-normal text-gray-600  dark:text-gray-500">
                Number of Vehicle bookings: {bookings.length}
              </p>
            </div>
            <div>
              <button className="inline-flex sm:ml-3 items-start justify-start px-6 py-3 bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded-full">
                <p className="text-sm font-medium leading-none text-white">
                  <Link to="/explore">New Booking</Link>
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto dark:bg-gray-800 rounded-b-2xl">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800 dark:text-white">
                <th className="font-normal text-left pl-4">Vehicle</th>
                <th className="font-normal text-left pl-20">Type</th>
                <th className="font-normal text-left pl-12">Brand</th>
                <th className="font-normal text-left pl-20">Price</th>
                <th className="font-normal text-left pl-20">Listed On</th>
                <th className="font-normal text-left pl-24">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="lg:text-center py-8 text-red-500 font-semibold"
                  >
                    No Bookings Found
                  </td>
                </tr>
              ) : (
                ""
              )}
              {bookings.map((listing, index) => (
                <tr
                  key={listing.vehicle_post_id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <img
                        src={listing.vehicle_image}
                        alt="car"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-contain object-center"
                      />
                      <div className="pl-4">
                        <p className="font-medium">{listing.vehicle_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-20">
                    <p className="text-sm font-medium leading-none">
                      {listing.vehicle_type}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{listing.vehicle_brand}</p>
                    <p className="text-xs leading-3 text-gray-600 dark:text-gray-400 mt-2">
                      Model : {listing.vehicle_year}
                    </p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">Rs. {listing.price_per_day}</p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">
                      {listing.created_at.split("T")[0]}
                    </p>
                    <p className="text-xs leading-3 text-gray-600 dark:text-gray-400 mt-2">
                      {Math.floor(
                        (new Date() - new Date(listing.created_at)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago
                    </p>
                  </td>

                  <td className="px-8 2xl:px-0">
                    <div className="flex items-center gap-5">
                      <button className="bg-indigo-500 p-2 rounded-full text-white transform hover:text-white hover:bg-black button-transition">
                        <FaEdit />
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(listing.vehicle_post_id)}
                        className=" bg-red-500 p-2  text-white hover:text-white hover:bg-black button-transition rounded-full"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Table;
