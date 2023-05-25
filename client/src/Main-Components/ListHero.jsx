import React from "react";

const ListHero = () => {
  return (
    <div className="flex justify-center items-center w-screen">
      <div className="xl:max-w-[1200px] max-w-[90%] w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-4xl font-bold text-gray-800 sm:text-5xl text-center md:text-left lg:text-[3.5rem] lg:leading-tight dark:text-white">
              Share the Ride and Fun on{" "}
              <span className="text-gray-400">RideBnb</span>
            </h1>
            <p className="mt-3 text-lg text-black lg:text-left text-center">
              Got a car or bike sitting idle? List it and let others enjoy the
              ride while you earn extra cash.
            </p>

            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <button className="inline-flex justify-center items-center gap-x-3 text-center bg-black button-hover border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none px-4 py-3">
                View Listings
                <svg
                  className="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <a
                className="inline-flex justify-center items-center gap-x-3.5 text-sm lg:text-base text-center border hover:border-gray-300 shadow-sm font-medium rounded-md focus:outline-none py-3 px-4"
                href="#"
              >
                Contact sales team
              </a>
            </div>
          </div>

          <div className="relative ml-4 h-70 lg:mt-0 mt-8 md:h-96">
            <img
              className="w-full rounded-lg h-70 md:h-96 object-cover"
              src="https://images.pexels.com/photos/13781/pexels-photo-13781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image Description"
            />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHero;
