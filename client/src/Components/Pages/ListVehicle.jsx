import React, { useState, useRef, useCallback } from "react";
import Navbar from "../../Main-Components/Navbar";
import { toastError, toastSuccess } from "../Toast/Toast";
import axiosInstance from "../../Instance/instance";
import ListHero from "../../Main-Components/ListHero";
import Footer from "../../Main-Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import validation from "../../validation/ListValidation";

const ListVehicle = () => {
  const fileInputRef = useRef(null);

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

  const [postError, setPostError] = useState({
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

  const uploadfile = async () => {
    let formData = new FormData();
    formData.append("file", file.data);
    const response = await fetch("http://localhost:5000/upload/uploadImage", {
      method: "POST",
      body: formData,
    });
    console.log(response);
  };

  const validateData = useCallback(
    (name, value) => {
      return validation({ ...data, [name]: value });
    },
    [data]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setPostError((prevErrors) => ({
        ...prevErrors,
        [name]: validateData(name, value)[name],
      }));
    },
    [validateData]
  );

  const handleVehicleType = useCallback((e) => {
    setData((prevData) => ({
      ...prevData,
      vehicleType: e.target.value,
    }));
    setPostError((prevErrors) => ({
      ...prevErrors,
      vehicleType: "",
    }));
  }, []);

  const handleListingType = useCallback((e) => {
    setData((prevData) => ({
      ...prevData,
      listingType: e.target.value,
    }));
    setPostError((prevErrors) => ({
      ...prevErrors,
      listingType: "",
    }));
  }, []);

  const handlefileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      const name = file.name;
      setData((prevData) => ({
        ...prevData,
        vehiclefile: name,
      }));
      if (!file) {
        toastError("Please select a file");
      }
      setFile({
        preview: URL.createObjectURL(file),
        data: file,
      });
    },
    [validateData]
  );

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const error = validation(data);
    setPostError({
      vehicleName: error.vehicleName,
      vehicleBrand: error.vehicleBrand,
      vehicleColor: error.vehicleColor,
      address: error.address,
      pricePerDay: error.pricePerDay,
      vehicleMakeYear: error.vehicleMakeYear,
      vehicleType: error.vehicleType,
      vehicleDescription: error.vehicleDescription,
      numberPlate: error.numberPlate,
      listingType: error.listingType,
      features: error.features,
      vehiclefile: error.vehiclefile,
    });

    if (Object.keys(error).length === 0) {
      // const res = await axios.post("http://localhost:5000/post/listvehicle", data) ;
      try {
        const res = await axiosInstance.post("/post/listvehicle", data);
        uploadfile();
        console.log(res);
        toastSuccess("Vehicle Listed Successfully");
      } catch (error) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          const errorMessage = errors.map((error) => error.msg).join(" & ");
          toastError(errorMessage);
        }
      }
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
        <section className="bg-white w-screen mb-20 max-w-[95%] xl:max-w-[1300px] p-6 mx-auto text-black rounded-md dark:bg-gray-800 mt-5">
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
                {postError.vehicleName && (
                  <p className="text-red-500">{postError.vehicleName}</p>
                )}
              </div>

              <div>
                <label className="" htmlFor="Brand">
                  Vehicle Brand
                </label>
                <input
                  onChange={handleChange}
                  name="vehicleBrand"
                  id="vehicleBrand"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
                {postError.vehicleBrand && (
                  <p className="text-red-500">{postError.vehicleBrand}</p>
                )}
              </div>

              <div>
                <label className="" htmlFor="color">
                  Vehicle Color
                </label>
                <input
                  onChange={handleChange}
                  name="vehicleColor"
                  id="vehicleColor"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
                />
                {postError.vehicleColor && (
                  <p className="text-red-500">{postError.vehicleColor}</p>
                )}
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
                {postError.pricePerDay && (
                  <p className="text-red-500">{postError.pricePerDay}</p>
                )}
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
                {postError.numberPlate && (
                  <p className="text-red-500">{postError.numberPlate}</p>
                )}
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
                {postError.address && (
                  <p className="text-red-500">{postError.address}</p>
                )}
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
                {postError.vehicleMakeYear && (
                  <p className="text-red-500">{postError.vehicleMakeYear}</p>
                )}
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
                {postError.vehicleType && (
                  <p className="text-red-500">{postError.vehicleType}</p>
                )}
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
                {postError.listingType && (
                  <p className="text-red-500">{postError.listingType}</p>
                )}
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
                {postError.features && (
                  <p className="text-red-500">{postError.features}</p>
                )}
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
                {postError.vehicleDescription && (
                  <p className="text-red-500">{postError.vehicleDescription}</p>
                )}
              </div>
              <div>
                <label className="">Vehicle Image</label>
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
                {postError.vehiclefile && (
                  <p className="text-red-500">{postError.vehiclefile}</p>
                )}
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
