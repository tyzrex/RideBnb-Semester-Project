import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Instance/instance";
import { Link } from "react-router-dom";

import { FcApproval, FcCancel } from "react-icons/fc";

function RequestsTable() {
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    try {
      const res = await axiosInstance.get("/booking/getOwnerVehicles");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      getRequests();
    }
    shouldFetch.current = false;
  }, []);

  console.log(requests);

  return (
    <>
      <div className="w-screen max-w-[90%] mx-auto xl:max-w-[1200px] mb-10 relative">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Requested Bookings
            </p>
            <div>
              <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded-full">
                <p className="text-sm font-medium leading-none text-white">
                  <Link to="/listvehicle">New Listing</Link>
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-4">Vehicle</th>
                <th className="font-normal text-left pl-20">Booked by</th>
                <th className="font-normal text-left pl-12">Booking Status</th>
                <th className="font-normal text-left pl-20">Total Price</th>
                <th className="font-normal text-left pl-20">Created On</th>
                <th className="font-normal text-left pl-8">Booking Dates</th>
                <th className="font-normal text-left pl-4">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {requests.map((listing) => (
                <tr
                  key={listing.booking_id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <img
                        src={`../../../Images/${listing.vehicle_image}`}
                        alt="car"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-contain object-center"
                      />
                      <div className="pl-4">
                        <p className="font-medium">{listing.vehicle_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-20">
                    <p className="text-sm font-medium leading-none text-gray-800">
                      {listing.customername}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{listing.booking_status}</p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">Rs. {listing.total_price}</p>
                  </td>
                  <td className="pl-20">
                    <p className="font-medium">
                      {listing.created_at.split("T")[0]}
                    </p>
                    <p className="text-xs leading-3 text-gray-600 mt-2">
                      {Math.floor(
                        (new Date() - new Date(listing.created_at)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago
                    </p>
                  </td>
                  <td className="pl-8">
                    <p className="font-medium">{listing.start_date}</p>
                    <p className="text-xs leading-3 text-gray-600 mt-2">
                      {listing.end_date}
                    </p>
                  </td>
                  <td className="px-8 2xl:px-0">
                    <div className="flex items-center gap-5">
                      <button className=" rounded-full text-white transform hover:text-white hover:bg-indigo-500 button-transition">
                        <FcApproval className="text-3xl" />
                      </button>{" "}
                      <button className=" rounded-full text-white transform hover:text-white hover:bg-indigo-500 button-transition">
                        <FcCancel className="text-3xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RequestsTable;
