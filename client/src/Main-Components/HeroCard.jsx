import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { RiCalendarEventFill, RiMotorbikeFill } from "react-icons/ri";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import axios from "axios";
import axiosInstance from "../Instance/instance";

const HeroCard = ({ onCarClick, onBikeClick }) => {
  const [vehicleChoice, setVehicleChoice] = useState("Car");

  const [datePicker, setDatePicker] = useState(false);
  const [data, setData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    vehicleType: "Car",
  });

  console.log(data);

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

  const searchVehicle = async () => {
    try {
      console.log(data);
      const response = await axiosInstance.post(
        "http://localhost:5000/search/searchVehicle",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center h-auto items-center w-screen">
      <div className="w-full flex h-auto flex-col justify-center items-center">
        <div className="md:w-[95%] xl:max-w-[1300px] w-[100%] relative ">
          <div className="bg-white xl:w-[30%] w-[100%] rounded-t-md flex justify-around h-[50px] items-center absolute -translate-y-[50px]">
            <div>
              <button
                onClick={handleCarClick}
                className="flex justify-center items-center gap-1"
              >
                <AiFillCar className="text-2xl" />
                <h1>Rent a car</h1>
              </button>
            </div>
            <div>
              <button
                onClick={handleBikeClick}
                className="flex justify-center items-center gap-1"
              >
                <RiMotorbikeFill className="text-2xl" />
                <h1>Rent a bike</h1>
              </button>
            </div>
          </div>

          <div className="bg-white p-10 lg:p-16 rounded-b-2xl lg:rounded-tr-md">
            <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 md:gap-5 ">
              <div>
                <label className="text-gray-500">Preferred Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border-2 border-gray-300 bg-white rounded-lg p-2 mb-4"
                  onChange={handleChange}
                  id="location"
                  name="location"
                />
              </div>

              <div>
                <label className="text-gray-500">Check In</label>
                <input
                  onClick={handleDatePicker}
                  type="text"
                  readOnly={true}
                  value={data.checkIn}
                  onChange={handleChange}
                  placeholder="Pick a date"
                  className="w-full border-2 text-gray-500 border-gray-300 bg-white rounded-lg p-2 mb-4 cursor-pointer"
                  name="checkIn"
                />
                {datePicker && (
                  <div className="absolute">
                    <DateRangePicker
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

              <div>
                <label className="text-gray-500">Check Out</label>
                <input
                  onClick={handleDatePicker}
                  type="text"
                  readOnly={true}
                  value={data.checkOut}
                  onChange={handleChange}
                  placeholder="Pick a date"
                  className="w-full border-2 text-gray-500 border-gray-300 bg-white rounded-lg p-2 mb-4 cursor-pointer"
                  id="checkOut"
                  name="checkOut"
                />
              </div>

              <div className="flex flex-col">
                <label className=" text-gray-500">Vehicle type</label>
                <select
                  id="hs-select-label"
                  onChange={handleChange}
                  className=" text-gray-500 border-2 border-gray-300 bg-white rounded-lg p-2 mb-4"
                  name="vehicleType"
                >
                  <option>{vehicleChoice}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:absolute md:right-[5%] flex items-center justify-center -translate-y-1/2">
            <button
              onClick={searchVehicle}
              className="bg-black px-10 py-4 text-white rounded-lg "
            >
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
