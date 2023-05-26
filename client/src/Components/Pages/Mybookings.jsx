import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Instance/instance";
import SearchItem from "../../Main-Components/Cards/SearchCards";
import MiniNav from "../MiniNav/MiniNav";
import Footer from "../../Main-Components/Footer";
import Table from "../../Components/Table/MyBookings";

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
    <div className="dark:bg-dark-secondary">
      <div className="min-h-[52vh]">
        <MiniNav />
        <div className="w-screen max-w-[1200px] flex justify-center items-center mx-auto mt-10">
          <Table />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mybookings;
