import React, { useState } from "react";
import Navbar from "../../Main-Components/Navbar";
import { toastError, toastSuccess } from "../Toast/Toast";
import axiosInstance from "../../Instance/instance";
import ListHero from "../../Main-Components/ListHero";
import Footer from "../../Main-Components/Footer";
import { ToastContainer } from "react-toastify";

const ListVehicle = () => {
  const [file, setFile] = useState({
    preview: "",
    data: "",
  });
  const [data, setData] = useState({
    vehicleName: "",
    vehicleBrand: "",
    vehicleColor: "",
    address: "",
    pricePerDay: "",
    vehicleMakeYear: "",
    vehicleType: "",
    vehicleDescription: "",
    vehiclefile: "",
    numberPlate: "",
    listingType: "",
    features: "",
  });
  console.log(data);
  const uploadfile = async () => {
    let formData = new FormData();
    formData.append("file", file.data);
    const response = await fetch("http://localhost:5000/upload/uploadImage", {
      method: "POST",
      body: formData,
    });
    console.log(response);
  };

  const handleVehicleType = (e) => {
    setData({
      ...data,
      vehicleType: e.target.value,
    });
  };

  const handleListingType = (e) => {
    setData({
      ...data,
      listingType: e.target.value,
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlefileChange = (e) => {
    setData({
      ...data,
      vehiclefile: e.target.files[0].name,
    });
    const image = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(image);
  };
  console.log(data);

  const handleSubmitfile = async (e) => {
    e.preventDefault();
    const file = await uploadfile();
    console.log(file);
  };

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
    if (!data.vehiclefile) {
      error.vehiclefile = "Vehicle file is required";
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
      const res = await axiosInstance.post("/post/listvehicle", data);
      uploadfile();
      console.log(res);
      toastSuccess("Vehicle Listed Successfully");
    } else {
      toastError("Fill all fields");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="mt-16">
        <ListHero />
      </div>

      <div className="flex justify-center items-center mt-20 mb-10">
        <h1 className="lg:text-5xl text-3xl font-bold text-gray-700">
          List Your Vehicle
        </h1>
      </div>

      <div>
        <section className="bg-white w-screen mb-20 max-w-[95%] lg:max-w-[1300px] p-6 mx-auto text-black rounded-md dark:bg-gray-800 mt-5">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Account settings
          </h1>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="" htmlFor="username">
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
                <label className="" htmlFor="emailAddress">
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
                <label className="" htmlFor="password">
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
                <label className="" htmlFor="price">
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
                <label className="" htmlFor="numberPlate">
                  Number Plate
                </label>
                <input
                  onChange={handleChange}
                  name="numberPlate"
                  id="numberPlate"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" htmlFor="address">
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
                <label className="" htmlFor="makeyear">
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
                <label className="" htmlFor="vehicleType">
                  Vehicle Type
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                  name="vehicleType"
                  onChange={handleVehicleType}
                >
                  <option>Select Vehicle Type</option>
                  <option>Car</option>
                  <option>Bike</option>
                </select>
              </div>

              <div>
                <label className="" htmlFor="listingType">
                  Listing Type
                </label>
                <select
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                  name="listingType"
                  onChange={handleListingType}
                >
                  <option>Select Listing Type</option>
                  <option>Rent</option>
                  <option>Sell</option>
                </select>
              </div>

              <div>
                <label className="" htmlFor="features">
                  Features
                </label>
                <textarea
                  onChange={handleChange}
                  name="features"
                  id="features"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="" htmlFor="description">
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
                <label className="">Vehicle Description</label>
                <div className="mt-1 flex justify-center px-6 py-8 border-2 border-gray-300 border-dashed rounded-md">
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
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center items-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-black rounded-md font-medium text-white p-2"
                      >
                        <span className="">Upload a file</span>
                        <input
                          onChange={handlefileChange}
                          id="file-upload"
                          name="file"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>

                    {file.preview ? (
                      <div className="w-[400px] h-[250px] overflow-auto mb-4">
                        <img src={file.preview} alt="" className=" mb-10" />
                      </div>
                    ) : (
                      <div>
                        <p className="pl-1">or drag and drop</p>
                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="px-4 py-3 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ListVehicle;
