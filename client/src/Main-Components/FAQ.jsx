import React from "react";
import("preline");
import CarArt from "../assets/car.png";

const FAQ = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center h-auto w-screen max-w-[95%] xl:max-w-[1300px] mx-auto mt-[200px] sm:mt-[160px] md:mt-[120px] lg:my-16">
        {/* <img src={CarArt} alt="car" className="absolute left-0 -z-0" /> */}
        <div className="z-10">
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="max-w-[1300px] mx-auto text-center mb-10 lg:mb-14">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                Your questions, answered
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Answers to the most frequently asked questions.
              </p>
            </div>

            <div className="max-w-[1300px] mx-auto">
              <div className="hs-accordion-group bg-white shadow-2xl rounded-xl">
                <div
                  className="hs-accordion hs-accordion-active:bg-gray-100 rounded-xl p-6 dark:hs-accordion-active:bg-white/[.05] active"
                  id="hs-basic-with-title-and-arrow-stretched-heading-one"
                >
                  <button
                    className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                  >
                    1. Can I cancel my booking on RideBnb anytime?
                    <svg
                      className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      Yes, you can cancel your booking on RideBnb anytime,
                      subject to our cancellation policy. You can cancel by
                      selecting the booking you wish to cancel on your account
                      page. The cancellation policy may vary based on the ride
                      or car rental you booked, and refunds may be available
                      depending on the reason for cancellation and timeframe.
                      Contact our 24/7 customer support team if you have any
                      questions or concerns about cancelling your booking.
                    </p>
                  </div>
                </div>

                <div
                  className="hs-accordion hs-accordion-active:bg-gray-100 rounded-xl p-6 dark:hs-accordion-active:bg-white/[.05]"
                  id="hs-basic-with-title-and-arrow-stretched-heading-two"
                >
                  <button
                    className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
                  >
                    2. How does RideBnb work for sharing a ride?
                    <svg
                      className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      <b>RideBnb</b> works by connecting car owners or drivers
                      with people who need a ride or a car rental. The process
                      is straightforward: car owners or drivers can create a
                      profile on the website, list their vehicle(s), and set
                      their availability and pricing. People looking for a ride
                      or car rental can search for available options on the
                      website using various filters, such as location, date,
                      type of car, and price range. Once they find a suitable
                      option, they can book the ride or car through the website
                      and pay online. After the ride or car rental, users can
                      leave a review of their experience to help future users
                      make informed decisions.
                    </p>
                  </div>
                </div>

                <div
                  className="hs-accordion hs-accordion-active:bg-gray-100 rounded-xl p-6 dark:hs-accordion-active:bg-white/[.05]"
                  id="hs-basic-with-title-and-arrow-stretched-heading-three"
                >
                  <button
                    className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
                  >
                    3. How do I contact the car owner or driver on RideBnb?
                    <svg
                      className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg
                      className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      You can contact the car owner or driver on [Your Website
                      Name] through our messaging system. Once you have booked a
                      ride or car rental, you will be able to exchange messages
                      with the car owner or driver through the website. This
                      messaging system is designed to provide a secure and
                      convenient way for you to communicate with the car owner
                      or driver, without the need to exchange personal contact
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
