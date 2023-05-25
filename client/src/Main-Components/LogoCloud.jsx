import React from "react";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";
import car4 from "../assets/car4.png";
import car5 from "../assets/car5.png";
import car7 from "../assets/car7.png";
import mercedez from "../assets/mercedez.png";

const LogoCloud = () => {
  const images = [car3, car4, car5, car7, mercedez, car2];

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
                className="max-w-[80px] filter "
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
