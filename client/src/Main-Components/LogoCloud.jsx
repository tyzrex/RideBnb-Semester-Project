import React from "react";
import bmw from "../assets/bmw.svg";
import mazda from "../assets/mazda-2.svg";
import tesla from "../assets/teslamotor.svg";
import porsche from "../assets/car5.png";
import lambo from "../assets/lamborghini.svg";
import mercedez from "../assets/mercedes-benz-logo.svg";

const LogoCloud = () => {
  const images = [mazda, tesla, porsche, lambo, bmw, mercedez];

  return (
    <div className={`bg-no-repeat bg-cover bg-center rounded-3xl`}>
      <div className="mx-auto rounded-3xl py-5 px-4 w-full max-w-[90%] xl:max-w-[1200px] bg-white dark:glass border dark:border-gray-800">
        <div className="grid grid-cols-6 lg:grid-cols-6 gap-y-10 gap-x-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="col-span-3 sm:col-span-2 lg:col-span-1 flex justify-center items-center"
            >
              <img
                src={image}
                key={index}
                className="max-w-[80px] lg:max-w-[90px] max-h-[110px] filter "
                alt="mercedes benz car logo png brand image "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
