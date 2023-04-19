import React from "react";
import {AiFillCar} from "react-icons/ai";
import {FaMotorcycle} from "react-icons/fa";
import {BiMap} from "react-icons/bi";

const ExploreHero = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14 pb-2 mx-auto">
        <div className="mx-auto max-w-2xl mb-8 lg:mb-14 text-center">
          <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold dark:text-gray-200">
            Your Ride is Waiting
          </h2>
          <p className="mt-3 text-gray-800 dark:text-gray-200">
            Find your perfect ride for any adventure. Browse now.
          </p>
        </div>

        <div className="mx-auto max-w-3xl grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-6 sm:col-span-4 text-center">
            <AiFillCar className="mx-auto h-auto w-7 md:w-9 text-gray-800 dark:text-gray-200"/>
            <div className="mt-2 sm:mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Cars
              </h3>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4 text-center">
          <FaMotorcycle className="mx-auto h-auto w-7 md:w-9 text-gray-800 dark:text-gray-200"/>
            <div className="mt-2 sm:mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Motorcycles
              </h3>
            </div>
          </div>

          <div className="col-span-6 col-start-4 sm:col-span-4 text-center">
          <BiMap className="mx-auto h-auto w-7 md:w-9 text-gray-800 dark:text-gray-200"/>
            <div className="mt-2 sm:mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Destination
              </h3>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ExploreHero;
