import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import MiniNav from "../MiniNav/MiniNav";
import Footer from "../../Main-Components/Footer";
import Table from "../Table/Table";
import RequestsTable from "../Table/RequestsTable";

const Profile = ({ socket }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="dark:bg-dark-main">
      <MiniNav />

      <div>
        <div className="flex max-w-[90%] w-screen xl:max-w-[1200px] items-center justify-center mx-auto py-8 shadow-xl dark:bg-gray-900 rounded-xl">
          {/* Card code block start */}
          <div className="bg-white dark:bg-gray-900 ">
            <div className="relative">
              <img
                className="h-56 shadow rounded-t w-full object-cover object-center"
                src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png"
                alt="profile"
              />
              <div className="inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded-full">
                <div className="w-full flex justify-center items-center relative bg-accent-1 text-white text-3xl h-full overflow-hidden object-cover rounded-full">
                  <h1 className="text-center">
                    {user?.customername[0].toUpperCase()}
                    {user?.customername[1].toUpperCase()}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-10 px-5 xl:px-10 pb-10">
              <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
                <div className="xl:pr-16 w-full xl:w-2/3">
                  <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                    <h2 className="mb-3 xl:mb-0 xl:mr-4 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">
                      {user?.customername}
                    </h2>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm xl:text-md leading-5">
                      Email: {user?.email}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm xl:text-md leading-5">
                      Phone: {user?.phone_number}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm xl:text-md leading-5">
                      Address: {user?.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm xl:text-md leading-5">
                      Customer ID: {user?.customer_id}
                    </p>
                  </div>
                </div>

                <div className="w-full mt-5 xl:w-2/3 flex xl:justify-end justify-center items-center gap-4">
                  <div className="flex items-center justify-center xl:justify-start mt-1">
                    <div className="rounded-full bg-gray-200 text-gray-900 font-bold text-sm px-6 py-2 flex justify-center items-center">
                      Go Back
                    </div>
                  </div>
                  <Link to={`/editprofile/${user?.customer_id}`}>
                    <button className="focus:outline-none  bg-accent-1 font-bold transition duration-150 ease-in-out hover:bg-indigo-600 rounded-full text-white px-3 md:px-6 py-2 text-sm">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Card code block end */}
        </div>
      </div>
      <div className="mt-10">
        <Table />
      </div>
      <RequestsTable socket={socket} />
      <Footer />
    </div>
  );
};
export default Profile;
