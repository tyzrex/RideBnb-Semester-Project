import React from "react";

import MiniNav from "../MiniNav/MiniNav";
import PreviewCards from "../../Main-Components/Cards/PreviewCards";

const ExperimentList = () => {
  return (
    <div>
      <MiniNav />

      <div className="flex justify-between mx-auto w-screen xl:max-w-[1200px] max-w-[90%] gap-2">
        <div className="lg:w-[70%] w-full">
          <div>
            <h1 className="text-[24px] lg:text-[48px] font-semibold ">
              List Your Vehicle
            </h1>
            <div className="mt-10">
              <div>
                <div className="flex-col flex">
                  <label className="font-medium">Upload Photo</label>
                  <label className="text-sm text-gray-500">
                    Drag or choose your file to upload
                  </label>
                </div>
                <div className="mt-1 flex justify-center px-6 py-8 border-2 border-gray-300 border-dashed rounded-md max-w-3xl">
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
                          id="file-upload"
                          name="file"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] lg:block hidden">
          <div className="flex items-start">
            <h1>Preview</h1>
            <div>
              <PreviewCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentList;
