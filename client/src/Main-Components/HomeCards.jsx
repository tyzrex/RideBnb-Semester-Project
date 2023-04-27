import React, { useState, useRef, useEffect } from "react";
import PopularCard from "./Cards/PopularCard";
import { axiosBase } from "../Instance/instance";
import LogoCloud from "./LogoCloud";

const HomeCards = () => {
  const [sellPost, setSellPost] = useState([]);
  const [rentPost, setRentPost] = useState([]);

  const getPosts = async (listingType) => {
    try {
      const response = await axiosBase.get(
        `/post/getpostbytype/${listingType}`
      );
      if (listingType === "Sell") {
        setSellPost(response.data);
      }
      if (listingType === "Rent") {
        setRentPost(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const shouldFetch = useRef(false);
  useEffect(() => {
    if (!shouldFetch.current) {
      shouldFetch.current = true;
      getPosts("Sell");
      getPosts("Rent");
    }
  }, []);

  //

  return (
    <div className=" w-screen mx-auto h-auto bg-[#f8f8f8] ">
      <div className="w-full max-w-[95%] xl:max-w-[1300px] mx-auto flex flex-col gap-10 justify-center items-center ">
        <div className=" mt-[300px] mt:mb-[150px] lg:mt-[130px]">
          <div className="flex justify-center w-full items-center">
            <div className="max-w-[95%] flex justify-between w-full xl:max-w-[1300px]">
              <h1 className="text-3xl font-bold">Popular Rent Choices</h1>
              <h1 className="text-md font-bold">
                <u>Explore All</u>
              </h1>
            </div>
          </div>

          <div>
            <div className="grid mx-auto mt-10 justify-items-center w-screen max-w-[95%] xl:max-w-[1300px] content-center gap-7 xl:grid-cols-4 grid-cols-1 md:grid-cols-2">
              {rentPost.map((item) => (
                <PopularCard
                  key={item.vehicle_post_id}
                  vehicleName={item.vehicle_name}
                  vehiclePrice={item.price_per_day}
                  vehicleImage={item.vehicle_image}
                  vehicleId={item.vehicle_post_id}
                  postedBy={item.customername}
                  buttonText="Book"
                  postId={item.vehicle_post_id}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-[180px] md:mb-[150px] lg:mb-[130px]">
          <div className="flex justify-center w-full items-center">
            <div className="max-w-[95%] flex justify-between w-full xl:max-w-[1300px]">
              <h1 className="text-3xl font-bold">Popular Sell Choices</h1>
              <h1 className="text-md font-bold">
                <u>Explore All</u>
              </h1>
            </div>
          </div>

          <div>
            <div className="grid mx-auto mt-10 justify-items-center w-screen max-w-[95%] xl:max-w-[1300px] content-center gap-7 xl:grid-cols-4 grid-cols-1 md:grid-cols-2">
              {sellPost.map((item) => (
                <PopularCard
                  key={item.vehicle_post_id}
                  vehicleName={item.vehicle_name}
                  vehiclePrice={item.price_per_day}
                  vehicleImage={item.vehicle_image}
                  vehicleId={item.vehicle_post_id}
                  postedBy={item.customername}
                  buttonText="Buy"
                  postId={item.vehicle_post_id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-[2] -translate-y-[50%] self-end w-full">
        <LogoCloud />
      </div>
    </div>
  );
};

export default HomeCards;
