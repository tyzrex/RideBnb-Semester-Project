import React, { useState, useRef, useEffect, useContext } from "react";
import PopularCard from "./Cards/PopularCard";
import { axiosBase } from "../Instance/instance";
import LogoCloud from "./LogoCloud";
import { AuthContext } from "../Context/AuthContext";

const HomeCards = () => {
  const { user } = useContext(AuthContext);
  const [sellPost, setSellPost] = useState([]);
  const [rentPost, setRentPost] = useState([]);
  const user_id = user.customer_id;

  const getPosts = async (listingType) => {
    try {
      const response = await axiosBase.get(`/post/getpostbytype`, {
        params: {
          listingType: listingType,
          user_id: user_id,
        },
      });
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

  return (
    <div className=" w-screen mx-auto h-auto bg-gray-100">
      <div className="w-full max-w-[90%] xl:max-w-[1200px] mx-auto flex flex-col gap-10 justify-center items-center ">
        <div className=" mt-[300px] mt:mb-[150px] md:mt-[250px] xl:mt-[130px]">
          <div className="flex justify-center w-full items-center">
            <div className="max-w-[90%] flex justify-between w-full xl:max-w-[1200px]">
              <h1 className="text-3xl font-bold">Popular Rent Choices</h1>
              <h1 className="text-md font-bold">
                <u>Explore All</u>
              </h1>
            </div>
          </div>

          <div>
            <div className="grid mx-auto mt-10 justify-items-center w-screen max-w-[90%] xl:max-w-[1200px] content-center gap-6 xl:grid-cols-4 grid-cols-1 lg:grid-cols-2">
              {rentPost.map((item) => (
                <PopularCard
                  key={item.vehicle_post_id}
                  vehicleName={item.vehicle_name}
                  vehiclePrice={item.price_per_day}
                  vehicleImage={item.vehicle_image}
                  vehicleId={item.vehicle_post_id}
                  vehicleLocation={item.address}
                  postedBy={item.customername}
                  buttonText="Book"
                  postId={item.vehicle_post_id}
                  vehicleRating={item.avg_rating}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-[250px] md:mb-[180px] lg:mb-[130px]">
          <div className="flex justify-center w-full items-center">
            <div className="max-w-[90%] flex justify-between w-full xl:max-w-[1200px]">
              <h1 className="text-3xl font-bold">Popular Sell Choices</h1>
              <h1 className="text-md font-bold">
                <u>Explore All</u>
              </h1>
            </div>
          </div>

          <div>
            <div className="grid mx-auto mt-10 justify-items-center w-screen max-w-[90%] xl:max-w-[1200px] content-center gap-7 xl:grid-cols-4 grid-cols-1 lg:grid-cols-2">
              {sellPost.map((item) => (
                <PopularCard
                  key={item.vehicle_post_id}
                  vehicleName={item.vehicle_name}
                  vehiclePrice={item.price_per_day}
                  vehicleImage={item.vehicle_image}
                  vehicleId={item.vehicle_post_id}
                  vehicleLocation={item.address}
                  postedBy={item.customername}
                  buttonText="Buy"
                  postId={item.vehicle_post_id}
                  vehicleRating={item.avg_rating}
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
