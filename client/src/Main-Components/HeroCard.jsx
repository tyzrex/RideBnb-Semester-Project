import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { RiMotorbikeFill } from "react-icons/ri";

const HeroCard = ({ onCarClick, onBikeClick }) => {
  const [vehicleChoice, setVehicleChoice] = useState("Car");

  const handleBikeClick = () => {
    setVehicleChoice("Bike");
    onBikeClick();
  };

  const handleCarClick = () => {
    setVehicleChoice("Car");
    onCarClick();
  };

  return (
    <div className="flex justify-center h-auto items-center w-screen">
      <div className="w-full flex h-auto flex-col justify-center items-center">
        <div className="md:w-[95%] xl:max-w-[1300px] w-[100%] relative shadow-2xl">
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

          <div className="bg-white p-10 rounded-b-md lg:rounded-tr-md">
            <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 md:gap-5 ">
              <div>
                <label className="text-gray-500">Preferred Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border-2 border-gray-300 bg-white rounded-lg p-2 mb-4"
                />
              </div>

              <div>
                <label className="text-gray-500">Checkin Date</label>
                <input
                  type="date"
                  placeholder="Location"
                  className="w-full border-2 text-gray-500 border-gray-300 bg-white rounded-lg p-2 mb-4"
                />
              </div>

              <div>
                <label className="text-gray-500">Check out Date</label>
                <input
                  type="date"
                  className="w-full text-gray-500 border-2 border-gray-300 bg-white rounded-lg p-2 mb-4"
                />
              </div>

              <div className="flex flex-col">
                <label className=" text-gray-500">Vehicle type</label>
                <select
                  id="hs-select-label"
                  className=" text-gray-500 border-2 border-gray-300 bg-white rounded-lg p-2 mb-4"
                >
                  <option>{vehicleChoice}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:absolute md:right-[5%] flex items-center justify-center -translate-y-1/2">
            <button className="bg-black px-10 py-4 text-white rounded-lg ">
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
