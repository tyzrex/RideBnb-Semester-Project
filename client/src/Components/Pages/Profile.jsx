import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../../Main-Components/Navbar";
import MiniNav from "../MiniNav/MiniNav";
import Footer from "../../Main-Components/Footer";
import Table from "../Table/Table";
const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <MiniNav />

      <div>
        <div className="flex max-w-[90%] w-screen xl:max-w-[1200px] items-center justify-center mx-auto py-8 shadow-xl">
          {/* Card code block start */}
          <div className="bg-white dark:bg-gray-800 ">
            <div className="relative">
              <img
                className="h-56 shadow rounded-t w-full object-cover object-center"
                src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png"
                alt="profile"
              />
              <div className="inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded-full">
                <img
                  className="w-full h-full overflow-hidden object-cover rounded-full"
                  src="https://image.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg"
                  alt="profile"
                />
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
                <div className="xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center xl:w-2/3">
                  <div className="mr-6 xl:mr-10">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      Number of Vehicles
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-center text-sm xl:text-xl leading-5">
                      X
                    </p>
                  </div>
                </div>
                <div className="w-full xl:w-2/3 flex xl:justify-end justify-center items-center gap-4">
                  <div className="flex items-center justify-center xl:justify-start mt-1">
                    <div className="rounded-full bg-gray-200 text-gray-600 dark:text-gray-400 text-sm px-6 py-2 flex justify-center items-center">
                      Go Back
                    </div>
                  </div>
                  <Link to={`/editprofile/${user?.customer_id}`}>
                    <button className="focus:outline-none  bg-indigo-500 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded-full text-white px-3 md:px-6 py-2 text-sm">
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
      <Table />
      <Footer />
    </div>
  );
};
export default Profile;
