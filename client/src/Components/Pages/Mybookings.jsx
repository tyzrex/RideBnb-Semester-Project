import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Main-Components/Navbar";
import axiosInstance from "../../Instance/instance";
import SearchItem from "../../Main-Components/Cards/SearchCards";
import MiniNav from "../MiniNav/MiniNav";

const Mybookings = () => {
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
    <div>
      <Navbar />
      <MiniNav />
      <div className="w-screen max-w-[1200px] flex justify-center items-center mx-auto mt-10">
        <div className="">
          {bookings.map((booking, index) => (
            <SearchItem
              key={index}
              vehicle_id={booking.vehicle_post_id}
              vehicle_name={booking.vehicle_name}
              vehicle_type={booking.vehicle_type}
              vehicle_price={booking.vehicle_price}
              vehicle_image={booking.vehicle_image}
              vehicle_location={booking.vehicle_location}
              vehicle_listing_type={booking.vehicle_listing_type}
              address={booking.address}
              vehicle_color={booking.vehicle_color}
              vehicle_brand={booking.vehicle_brand}
              posted_by={booking.customername}
              price_per_day={booking.price_per_day}
              vehicle_rating={booking.avg_rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mybookings;
