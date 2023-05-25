import AOS from "aos";
import "aos/dist/aos.css";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import Animate from "react-smooth";
import BikeImg from "../assets/cbr2.png";
import CarImg from "../assets/bmwclear.png";
import HeroVideo from "../assets/car.mp4";

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
    <div className={` h-auto text-black bg-gray-200 flex`}>
      <div className="w-screen h-full">
        <video
          autoPlay
          loop
          muted
          className="bg-black object-cover h-[700px] w-full"
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="absolute z-[2] translate-y-[50%] self-end w-full">
        <HeroCard onCarClick={handleCarClick} onBikeClick={handleBikeClick} />
      </div>
    </div>
  );
};

export default ExperimentHero;
