import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <div className="h-[85vh] flex justify-center items-center">
        <body className="flex h-full">
          <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
            <header className="mb-auto flex justify-center z-50 w-full py-4">
              <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
                <a
                  className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
                  href="#"
                  aria-label="Brand"
                >
                  RideBnb
                </a>
              </nav>
            </header>

            <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
              <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
                404
              </h1>
              <h1 className="block text-2xl font-bold text-white"></h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Oops, something went wrong.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Sorry, we couldn't find your page.
              </p>
              <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                <a
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-black button-hover text-white px-6 py-3 rounded-md text-base font-medium"
                  href="/"
                >
                  Back to HomePage
                </a>
              </div>
            </div>

            <footer className="mt-auto text-center py-5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-gray-500">
                  © RideBnb All Rights Reserved. 2023.
                </p>
              </div>
            </footer>
          </div>
        </body>
      </div>
    </div>
  );
};

export default ErrorPage;
