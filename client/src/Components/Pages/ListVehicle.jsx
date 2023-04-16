import React, { useState } from "react";
import Navbar from "../../Main-Components/Navbar";
import { toastError } from "../Toast/Toast";
import axiosInstance from "../../Instance/instance";


const ListVehicle = () => {
  const [data, setData] = useState({
    vehicleName: "",
    vehicleBrand: "",
    vehicleColor: "",
    address: "",
    pricePerDay: "",
    vehicleMakeYear: "",
    vehicleType: "",
    vehicleDescription: "",
    vehicleImage: "",
  });

  const handleVehicleType = (e) => {
    setData({
        ...data,
        vehicleType: e.target.value,
    });
    };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.files[0],
        });
    };
    console.log(data);

  const [postError, setPostError] = useState({});

  const validate = () => {
    let error = {};
    if (!data.vehicleName) {
      error.vehicleName = "Vehicle Name is required";
    }
    if (!data.vehicleBrand) {
      error.vehicleBrand = "Vehicle Brand is required";
    }
    if (!data.vehicleColor) {
      error.vehicleColor = "Vehicle Color is required";
    }
    //check if price is a number
    if (!data.pricePerDay) {
      error.pricePerDay = "Price is required";
    }
    if (!data.vehicleMakeYear) {
      error.vehicleMakeYear = "Vehicle Make Year is required";
    }
    if (!data.vehicleType) {
      error.vehicleType = "Vehicle Type is required";
    }
    if (!data.vehicleDescription) {
      error.vehicleDescription = "Vehicle Description is required";
    }
    if (!data.vehicleImage) {
      error.vehicleImage = "Vehicle Image is required";
    }
    setPostError(error);
    return error;
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const error = validate();
    console.log(error);
    if (Object.keys(error).length === 0) {
        // const res = await axios.post("http://localhost:5000/post/listvehicle", data) ;
        const res = await axiosInstance.post("/post/listvehicle", data) ;
        console.log(res);

    } else {
        toastError("Fill all fields");
    }
    };


  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-3xl font-bold">List Your Vehicle</h1>
      </div>

      <div>
        <section className="w-screen max-w-[95%] lg:max-w-[1300px] p-6 mx-auto text-black rounded-md shadow-md dark:bg-gray-800 mt-5">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Account settings
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="" for="username">
                  Vehicle Name
                </label>
                <input
                  onChange={handleChange}
                  name="vehicleName"
                  id="vehicleName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" for="emailAddress">
                  Vehicle Brand
                </label>
                <input
                  onChange={handleChange}
                    name="vehicleBrand"
                  id="vehicleBrand"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" for="password">
                  Vehicle Color
                </label>
                <input
                  onChange={handleChange}
                    name="vehicleColor"
                  id="vehicleColor"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" for="price">
                  Price Per Day
                </label>
                <input
                  onChange={handleChange}
                    name="pricePerDay"
                  id="pricePerDay"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" for="address">
                  Address
                </label>
                <input
                  onChange={handleChange}
                    name="address"
                  id="address"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" for="makeyear">
                  Vehicle Make Year
                </label>
                <input
                  onChange={handleChange}
                    name="vehicleMakeYear"
                  id="vehicleMakeYear"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" for="type">
                  Vehicle Type
                </label>
                <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" name="vehicleType" onChange={handleVehicleType}>
                  <option>Car</option>
                  <option>Bike</option>
                </select>
              </div>

              <div>
                <label className="" for="description">
                  Vehicle description
                </label>
                <textarea
                  id="vehicleDescription"
                  type="textarea"
                    onChange={handleChange}
                    name="vehicleDescription"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center items-center">
                      <label
                        for="file-upload"
                        className="relative cursor-pointer bg-black rounded-md font-medium text-white p-2"
                      >
                        <span className="">Upload a file</span>
                        <input
                          onChange={handleImageChange}
                          id="file-upload"
                          name="vehicleImage"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={handleSubmit} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ListVehicle;
