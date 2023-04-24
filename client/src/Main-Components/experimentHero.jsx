import AOS from "aos";
import "aos/dist/aos.css";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import Animate from "react-smooth";
import BikeImg from "../assets/bikebmw.png";
import CarImg from "../assets/bmwclear.png";

const ExperimentHero = () => {
  AOS.init();
  const [backgroundImage, setBackgroundImage] = useState(CarImg);

  const handleCarClick = () => {
    setBackgroundImage(CarImg);
  };

  const handleBikeClick = () => {
    setBackgroundImage(BikeImg);
  };

  return (
    <div
      className={`delay-500 transition-all h-auto text-black bg-gray-200 flex`}
    >
      <div className="w-full mx-auto xl:max-w-[1300px] max-w-[95%] z-[0] py-[350px] md:py-[200px] lg:pt-[50px] xl:pb-[120px] h-full mt-[-250px] md:mt-[-80px] lg:mt-[0px] lg:flex lg:justify-around lg:items-center md:grid grid gap-0 content-center justify-items-center md:justify-items-center md:content-center sm:content-center sm:justify-items-center">
        <Animate to="1" from="0" attributeName="opacity">
          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="md:text-5xl sm:text-5xl text-4xl z-10 font-semibold md:py-6 md:max-w-xl text-black lg:text-left text-center">
              Discover your perfect ride, hit the road with Confidence
            </h1>
            <div className="">
              <button className="bg-black animate-[bounceIn_1s_ease-in-out] hover:bg-white transition-all ease-in-out duration-500 w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white hover:text-black ">
                Join Today
              </button>
            </div>
          </div>
        </Animate>
        <div>
          <img
            src={backgroundImage}
            alt="background"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute z-[2] translate-y-[50%] self-end w-full">
        <HeroCard onCarClick={handleCarClick} onBikeClick={handleBikeClick} />
      </div>
    </div>
  );
};

export default ExperimentHero;
