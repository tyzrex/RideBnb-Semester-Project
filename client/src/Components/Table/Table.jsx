import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axiosInstance from "../../Instance/instance";
import { Link } from "react-router-dom";

function Table() {
  const [show, setShow] = useState(null);

  const [listings, setListings] = useState([]);

  const getPosts = async () => {
    try {
      const res = await axiosInstance.get("/post/getpostsbyuser");
      setListings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      getPosts();
    }
    shouldFetch.current = false;
  }, []);

  console.log(listings);

  return (
    <>
      <div className="w-screen max-w-[90%] mx-auto xl:max-w-[1200px] mb-10 relative">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              My Listings
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
                <th className="font-normal text-left pl-20">Type</th>
                <th className="font-normal text-left pl-12">Brand</th>
                <th className="font-normal text-left pl-20">Price</th>
                <th className="font-normal text-left pl-20">Listed On</th>
                <th className="font-normal text-left pl-16">Average Rating</th>
                <th className="font-normal text-left pl-10">Actions</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {listings.map((listing, index) => (
                <tr
                  key={listing.vehicle_post_id}
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
                      {listing.vehicle_type}
                    </p>
                  </td>
                  <td className="pl-12">
                    <p className="font-medium">{listing.vehicle_brand}</p>
                    <p className="text-xs leading-3 text-gray-600 mt-2">
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
                    <p className="text-xs leading-3 text-gray-600 mt-2">
                      {Math.floor(
                        (new Date() - new Date(listing.created_at)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago
                    </p>
                  </td>
                  <td className="pl-16">
                    {listing.avg_rating === null
                      ? "❗"
                      : parseFloat(listing.avg_rating).toFixed(1)}{" "}
                    ⭐
                  </td>
                  <td className="px-7 2xl:px-0">
                    <div className="flex items-center gap-5">
                      <button className="bg-indigo-500 p-2 rounded-full text-white transform hover:text-white hover:bg-black button-transition">
                        Edit
                      </button>
                      <button className=" bg-red-500 p-2  text-white hover:text-white hover:bg-black button-transition rounded-full">
                        Delete
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

export default Table;
