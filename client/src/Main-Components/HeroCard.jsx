import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { RiCalendarEventFill, RiMotorbikeFill } from "react-icons/ri";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import axiosInstance, { axiosBase } from "../Instance/instance";
import { Link } from "react-router-dom";
import SearchItem from "./Cards/SearchCards";
import { TbLocation } from "react-icons/tb";
import { BsCalendarRange } from "react-icons/bs";
import { BsCardChecklist } from "react-icons/bs";
import { DateRange } from "react-date-range";
import { FcCalendar, FcList, FcPlanner } from "react-icons/fc";

const HeroCard = ({ onCarClick, onBikeClick }) => {
  const [vehicleChoice, setVehicleChoice] = useState("Car");
  const [datePicker, setDatePicker] = useState(false);
  const [data, setData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    vehicleType: "Car",
    listingType: "All",
  });

  const [searchData, setSearchData] = useState([]);

  const searchVehicle = async () => {
    try {
      const response = await axiosBase.get(
        `http://localhost:5000/search/searchVehicle`,
        { params: data }
      );
      setSearchData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDatePicker = () => {
    setDatePicker(!datePicker);
    handleDate();
  };

  const handleBikeClick = () => {
    setVehicleChoice("Bike");
    setData((prevData) => ({
      ...prevData,
      vehicleType: "Bike",
    }));
    onBikeClick();
  };

  const handleCarClick = () => {
    setVehicleChoice("Car");
    setData((prevData) => ({
      ...prevData,
      vehicleType: "Car",
    }));
    onCarClick();
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const convertDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = `0${newDate.getMonth() + 1}`.slice(-2);
    const day = newDate.getDate();
    return `${year}-${month}-${day}`;
  };
  const handleSelect = (ranges) => {
    selectionRange.startDate = ranges.selection.startDate;
    selectionRange.endDate = ranges.selection.endDate;
  };

  const handleDate = () => {
    setData((prevData) => ({
      ...prevData,
      checkIn: convertDate(selectionRange.startDate),
      checkOut: convertDate(selectionRange.endDate),
    }));
  };

  return (
    <div className="flex justify-center h-auto items-center w-screen">
      <div className="w-full flex h-auto flex-col justify-center items-center">
        <div className="w-[90%]  xl:max-w-[1200px]  xl:w-[100%] relative ">
          <div className="bg-white dark:glass p-8 md:p-10 lg:p-12 shadow-2xl rounded-3xl">
            <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5 ">
              <div>
                <div className="flex gap-3 items-center">
                  <TbLocation className="text-3xl text-yellow-500" />
                  <label className="text-gray-800 dark:text-accent-3 text-xl md:text-2xl font-bold">
                    {" "}
                    Location
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Preferred Location"
                    className="w-full border-none text-gray-500 bg-transparent rounded-lg p-2  placeholder:text-gray-400 text-xl md:text-2xl font-medium py focus:outline-none"
                    onChange={handleChange}
                    id="location"
                    name="location"
                  />
                </div>
              </div>

              <div>
                <div className="flex gap-3 items-center">
                  <FcCalendar className="text-3xl text-gray-500" />
                  <label className="text-gray-800 dark:text-accent-3 text-xl md:text-2xl font-bold">
                    {" "}
                    Check In
                  </label>
                </div>
                <input
                  onClick={handleDatePicker}
                  type="text"
                  readOnly={true}
                  value={data.checkIn}
                  onChange={handleChange}
                  placeholder="Pick a date"
                  className="w-full border-none text-gray-500 bg-transparent rounded-lg p-2  placeholder:text-gray-400 text-xl md:text-2xl font-medium py focus:outline-none"
                  name="checkIn"
                />
              </div>

              <div>
                <div className="flex gap-3 items-center">
                  <FcPlanner className="text-3xl text-gray-500" />
                  <label className="text-gray-800 dark:text-accent-3 text-xl md:text-2xl font-bold">
                    {" "}
                    Check Out
                  </label>
                </div>
                <input
                  onClick={handleDatePicker}
                  type="text"
                  readOnly={true}
                  value={data.checkOut}
                  onChange={handleChange}
                  placeholder="Pick a date"
                  className="w-full border-none text-gray-500 bg-transparent rounded-lg p-2  placeholder:text-gray-400 text-xl md:text-2xl font-medium py focus:outline-none"
                  id="checkOut"
                  name="checkOut"
                />
                {datePicker && (
                  <div className="absolute">
                    <DateRange
                      className=""
                      ranges={[selectionRange]}
                      rangeColors={["#000000"]}
                      onChange={handleSelect}
                      minDate={new Date()}
                      footerContent={
                        <div className="flex justify-center items-center">
                          <button
                            onClick={handleDatePicker}
                            className="bg-black text-white px-4 py-2 rounded-lg"
                          >
                            Close
                          </button>
                        </div>
                      }
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                  <FcList className="text-3xl text-gray-500" />
                  <label className="text-gray-800 dark:text-accent-3 text-xl md:text-2xl font-bold">
                    {" "}
                    Vehicle Type
                  </label>
                </div>
                <select
                  id="hs-select-label"
                  onChange={handleChange}
                  className="w-full border-none text-gray-500 bg-transparent rounded-lg p-1  placeholder:text-gray-400 text-xl md:text-2xl font-medium py focus:outline-none"
                  name="vehicleType"
                >
                  <option>{vehicleChoice}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:absolute md:right-[5%] flex items-center justify-center -translate-y-1/2">
            <Link
              to={`/search?location=${data.location}&vehicleType=${data.vehicleType}`}
              state={data}
              onClick={searchVehicle}
            >
              <button className="bg-accent-1 px-8 py-3 text-white text-xl font-bold rounded-3xl ">
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
