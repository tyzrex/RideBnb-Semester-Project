import AOS from "aos";
import "aos/dist/aos.css";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import Animate from "react-smooth";
import CarImg from "../assets/sally.png";
import Vector from "../assets/pattern.jpg";

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
      className={` h-auto text-black flex bg-cover bg-center bg-no-repeat hero-light dark:hero-dark`}
      // style={{ backgroundImage: `url(${Vector})`, backgroundSize: "cover" }}
    >
      <div className="w-full mx-auto xl:max-w-[1200px] max-w-[90%] z-[0] py-[60px] md:py-[80px] lg:pt-[50px] xl:pb-[120px] h-full  lg:mt-[0px] lg:flex lg:justify-between lg:items-center md:grid grid gap-0 content-center justify-items-center md:justify-items-center md:content-center sm:content-center sm:justify-items-center">
        <Animate to="1" from="0" attributeName="opacity">
          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="md:text-5xl sm:text-5xl text-4xl z-10 font-semibold md:py-6 md:max-w-xl lg:text-left text-center bg-gradient-to-r text-transparent bg-clip-text dark:from-accent-3 dark:to-accent-1 from-gray-100 to-white">
              Discover your perfect ride, Lead the road with{" "}
              <span>Confidence</span>
            </h1>
            <div className="">
              <button className="bg-accent-2 animate-[bounceIn_1s_ease-in-out] hover:bg-white transition-all ease-in-out duration-500 w-[200px] rounded-xl font-bold my-6 mx-auto py-3 text-white hover:text-black ">
                Join Today
              </button>
            </div>
          </div>
        </Animate>
        <div className="">
          <Animate to="1" from="0" attributeName="opacity">
            <div className="h-[510px]">
              <img
                src={backgroundImage}
                alt="background"
                className="object-cover "
                loading="lazy "
              />
            </div>
          </Animate>
        </div>
      </div>

      <div className="absolute z-[2] translate-y-[50%] self-end w-full">
        <HeroCard onCarClick={handleCarClick} onBikeClick={handleBikeClick} />
      </div>
    </div>
  );
};

export default ExperimentHero;
