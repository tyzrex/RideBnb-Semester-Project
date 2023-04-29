import React, { useEffect, useRef, useState, useContext } from "react";
import Navbar from "../../Main-Components/Navbar";
import Footer from "../../Main-Components/Footer";
import axiosInstance from "../../Instance/instance";
import { toastError, toastSuccess } from "../Toast/Toast";
import { ToastContainer } from "react-toastify";

import { AuthContext } from "../../Context/AuthContext";

const EditProfile = () => {
  const { user, getUpdatedUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const fetchUserData = async () => {
    try {
      const user = await axiosInstance.get("/user/getUserInfo");
      console.log(user.data[0]);

      setUsername(user.data[0].customername);
      setEmail(user.data[0].email);
      setNewPassword(user.data[0].password);
      setPhone(user.data[0].phone_number);
      setAddress(user.data[0].address);
    } catch (err) {
      if (err.response.status === 401) {
        window.location.href = "/login";
      }
      console.log(err);
    }
  };

  const submitHandler = async () => {
    try {
      const response = await axiosInstance.put("/user/editProfile", {
        name: username,
        email: email,
        new_password: newPassword,
        address: address,
        phone: phone,
      });
      toastSuccess("Profile updated successfully");
      getUpdatedUser();
    } catch (error) {
      if (error.response.status === 422) {
        const errors = error.response.data.errors;
        const errorMessage = errors.map((error) => error.msg).join(" & ");
        toastError(errorMessage);
      }
      if (error.response.status === 403) {
        toastError("Username already exists");
      }
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler();
  };

  const cancelSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      if (user) {
        fetchUserData();
      } else {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-10">
        Edit Your Personal Information
      </h1>
      <div className="xl:max-w-[1200px] px-4 py-10 max-w-[90%] lg:py-14 mb-10 mx-auto w-screen">
        <div className="bg-white rounded-xl p-4 sm:p-7 dark:bg-slate-900">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Profile
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-400">
              Manage your name, password and account settings.
            </p>
          </div>

          <form>
            <div className="grid grid-cols-12 gap-4 sm:gap-6">
              <div className="col-span-3">
                <label
                  htmlFor="af-account-user-name"
                  className="inline-block text-md text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Username
                </label>
                <div className="hs-tooltip inline-block">
                  <button type="button" className="hs-tooltip-toggle ml-1">
                    <svg
                      className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                    role="tooltip"
                  >
                    Displayed on your public profile.
                  </span>
                </div>
              </div>

              <div className="col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-full-name"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-md relative focus:z-10"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-md text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Email
                </label>
              </div>

              <div className="col-span-9">
                <input
                  id="af-account-email"
                  type="email"
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-md rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-md text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  New Password
                </label>
              </div>

              <div className="col-span-9">
                <div className="space-y-2">
                  <input
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-account-phone"
                    className="inline-block text-md text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    Phone
                  </label>
                </div>
              </div>

              <div className="col-span-9">
                <div className="sm:flex">
                  <input
                    id="af-account-phone"
                    type="text"
                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-md relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="af-account-address"
                  className="inline-block text-md text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Address
                </label>
              </div>

              <div className="col-span-9">
                <input
                  id="af-account-address"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  rows="6"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                ></input>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-x-2">
              <button
                type="button"
                onClick={cancelSubmit}
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold button-hover bg-black text-white"
              >
                Save changes
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
