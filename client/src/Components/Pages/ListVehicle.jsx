import React, { useState, useRef, useCallback, useContext } from "react";
import Navbar from "../../Main-Components/Navbar";
import { toastError, toastSuccess } from "../Toast/Toast";
import axiosInstance from "../../Instance/instance";
import ListHero from "../../Main-Components/ListHero";
import Footer from "../../Main-Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import validation from "../../validation/ListValidation";
import MiniNav from "../MiniNav/MiniNav";
import PreviewCards from "../../Main-Components/Cards/PreviewCards";
import { AuthContext } from "../../Context/AuthContext";

const ListVehicle = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState({
    preview: "",
    data: "",
  });

  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    vehicleName: "",
    vehicleBrand: "",
    vehicleColor: "",
    address: "",
    pricePerDay: "",
    vehicleMakeYear: "",
    vehicleType: "",
    vehicleDescription: "",
    numberPlate: "",
    listingType: "",
    features: "",
    vehiclefile: "",
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
    numberPlate: "",
    listingType: "",
    features: "",
    vehiclefile: "",
  });

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

  const handlefileChange = useCallback((e) => {
    const file = e.target.files[0];
    const name = file.name;
    if (!file) {
      toastError("Please select a file");
    }

    setFile({
      preview: URL.createObjectURL(file),
      data: file,
    });
  });

  const handleSubmit = async (e) => {
    setLoading(true);
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
        if (file.data === "") {
          toastError("Please select a file");
          setPostError((prevErrors) => ({
            ...prevErrors,
            vehiclefile: "Please select a file",
          }));
          return;
        }

        const formData = new FormData();
        formData.append("file", file.data);

        const response = await axiosInstance.post(
          "/cloudinary/uploadImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data.url);

        data.vehiclefile = response.data.url;

        console.log(data);

        const res = await axiosInstance.post(
          "/post/listvehicle",
          data,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(res);
        toastSuccess("Vehicle Listed Successfully");
        setLoading(false);
      } catch (error) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;
          const errorMessage = errors.map((error) => error.msg).join(" & ");
          toastError(errorMessage);
        }
      }
    } else {
      setLoading(false);
      toastError("Fill all fields");
    }
  };

  return (
    <div className="dark:bg-gradient-to-r from-gray-900 via-gray-700 to-dark-main">
      <div className="dark:dark-glass-messenger">
        <MiniNav />

        <div className="flex justify-between mx-auto w-screen xl:max-w-[1200px] max-w-[90%] gap-2 ">
          <div className="lg:w-[60%] w-full">
            <section className="  mb-20 mx-auto w-full text-black rounded-md  ">
              <h1 className="text-[24px] md:text-[48px] font-semibold dark:text-accent-3">
                List Your <span className="text-accent-1">Vehicle</span>
              </h1>
              <form>
                <div className="grid grid-cols-1 gap-6 mt-4 ">
                  <div className="mt-5">
                    <label className="font-medium">Upload Photo</label>
                    <label className="block text-sm text-gray-500">
                      Drag or choose your file to upload
                    </label>
                    <div className="mt-5 flex justify-center px-6 py-8 border-2 border-gray-400 dark:border-gray-600 border-dashed rounded-2xl">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 dark:text-accent-3"
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
                            className="relative cursor-pointer bg-accent-2 rounded-md font-medium text-white p-2"
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
                          // <div className="w-[400px] h-[250px] overflow-auto mb-4">
                          //   <img src={file.preview} alt="" className=" mb-10" />
                          // </div>
                          <></>
                        ) : (
                          <div className="dark:text-accent-3">
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

                  <div>
                    <h1 className="text-[16px] lg:text-[24px] font-semibold ">
                      Vehicle Details
                    </h1>
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="username"
                    >
                      VEHICLE NAME
                    </label>
                    <input
                      onChange={handleChange}
                      name="vehicleName"
                      id="vehicleName"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Toyota Corolla"
                    />
                    {postError.vehicleName && (
                      <p className="text-red-500">{postError.vehicleName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="Brand"
                    >
                      BRAND
                    </label>
                    <input
                      onChange={handleChange}
                      name="vehicleBrand"
                      id="vehicleBrand"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Toyota Corolla"
                    />
                    {postError.vehicleBrand && (
                      <p className="text-red-500">{postError.vehicleBrand}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="color"
                    >
                      COLOR
                    </label>
                    <input
                      onChange={handleChange}
                      name="vehicleColor"
                      id="vehicleColor"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Toyota Corolla"
                    />
                    {postError.vehicleColor && (
                      <p className="text-red-500">{postError.vehicleColor}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="price"
                    >
                      PRICE
                    </label>
                    <input
                      onChange={handleChange}
                      name="pricePerDay"
                      id="pricePerDay"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. 9000"
                    />
                    {postError.pricePerDay && (
                      <p className="text-red-500">{postError.pricePerDay}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="numberPlate"
                    >
                      NUMBER PLATE
                    </label>
                    <input
                      onChange={handleChange}
                      name="numberPlate"
                      id="numberPlate"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Ga 1 Jha"
                    />
                    {postError.numberPlate && (
                      <p className="text-red-500">{postError.numberPlate}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="address"
                    >
                      ADDRESS
                    </label>
                    <input
                      onChange={handleChange}
                      name="address"
                      id="address"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Kathmandu"
                    />
                    {postError.address && (
                      <p className="text-red-500">{postError.address}</p>
                    )}
                  </div>

                  <div className="flex flex-col justify-start gap-5 lg:flex-row w-full">
                    <div>
                      <label
                        className="text-gray-400 font-semibold text-sm"
                        htmlFor="makeyear"
                      >
                        Vehicle Make Year
                      </label>
                      <input
                        onChange={handleChange}
                        name="vehicleMakeYear"
                        id="vehicleMakeYear"
                        type="text"
                        className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                        placeholder="e.g. 2019"
                      />
                      {postError.vehicleMakeYear && (
                        <p className="text-red-500">
                          {postError.vehicleMakeYear}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="text-gray-400 font-semibold text-sm"
                        htmlFor="vehicleType"
                      >
                        Vehicle Type
                      </label>
                      <select
                        className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                        name="vehicleType"
                        onChange={handleVehicleType}
                      >
                        <option>Vehicle Type</option>
                        <option>Car</option>
                        <option>Bike</option>
                      </select>
                      {postError.vehicleType && (
                        <p className="text-red-500">{postError.vehicleType}</p>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-gray-400 font-semibold text-sm"
                        htmlFor="listingType"
                      >
                        Listing Type
                      </label>
                      <select
                        className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                        name="listingType"
                        onChange={handleListingType}
                      >
                        <option>Listing Type</option>
                        <option>Rent</option>
                        <option>Sell</option>
                      </select>
                      {postError.listingType && (
                        <p className="text-red-500">{postError.listingType}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="description"
                    >
                      Vehicle description
                    </label>
                    <textarea
                      id="vehicleDescription"
                      type="textarea"
                      onChange={handleChange}
                      name="vehicleDescription"
                      className="block w-full px-4 h-[130px] py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Toyota Corolla"
                    ></textarea>
                    {postError.vehicleDescription && (
                      <p className="text-red-500">
                        {postError.vehicleDescription}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor="features"
                    >
                      Features
                    </label>
                    <textarea
                      onChange={handleChange}
                      name="features"
                      id="features"
                      type="text"
                      className="block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-900 rounded-[12px] "
                      placeholder="e.g. Toyota Corolla"
                    />
                    {postError.features && (
                      <p className="text-red-500">{postError.features}</p>
                    )}
                  </div>
                </div>
                <ToastContainer />

                <div className="flex justify-start mt-6">
                  {loading ? (
                    <>
                      <button
                        type="button"
                        class="py-3 px-4 inline-flex justify-center
                      items-center gap-2 rounded-md border border-transparent
                      text-white font-semibold bg-indigo-500"
                      >
                        <span
                          class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                          role="status"
                          aria-label="loading"
                        ></span>
                        <span>Creating Post</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-3 leading-5 text-white transition-colors duration-200 transform bg-accent-1 rounded-full font-bold hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </section>
          </div>

          <div className="max-w-[40%] hidden lg:block ">
            <div className="grid w-full sticky top-10">
              <h1 className="text-[24px] mb-10 font-semibold text-gray-800 dark:text-accent-1">
                Preview
              </h1>
              <PreviewCards
                vehicleName={data.vehicleName}
                postedBy={user.customername}
                vehicleImage={file.preview}
                price={data.pricePerDay}
                buttonText={data.listingType}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListVehicle;
