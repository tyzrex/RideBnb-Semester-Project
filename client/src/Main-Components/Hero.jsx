import AOS from "aos";
import "aos/dist/aos.css";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import Animate from "react-smooth";
import BikeImg from "../assets/herobike.jpg";
import CarImg from "../assets/herocar.jpg";

const Hero = () => {
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
      className={` relative delay-500 transition-all h-auto text-black bg-white border-t border-t-gray-600 flex`}
    >
      <div
        className="absolute transition-all duration-1000 ease-in-out w-full h-full object-cover"
        alt="background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="self-start z-[2] w-full h-auto mx-auto text-center "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25))",
          // backgroundImage: `url(${backgroundImage})`,
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
          // transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="w-full mx-auto lg:max-w-[1700px] max-w-[95%] z-[0] py-[400px] md:py-[200px] h-full mt-[-250px] md:mt-[-80px] lg:mt-[0px] lg:flex lg:justify-around lg:items-center md:grid grid gap-0 content-center justify-items-center md:justify-items-center md:content-center sm:content-center sm:justify-items-center">
          <Animate to="1" from="0" attributeName="opacity">
            <div>
              <h1 className="md:text-5xl sm:text-5xl text-4xl z-10 font-semibold md:py-6 md:max-w-xl text-white">
                Discover your perfect ride, hit the road with Confidence
              </h1>
            </div>
          </Animate>
          <Animate to="1" from="0" attributeName="opacity">
            <div>
              <div className="flex  justify-center items-center">
                <p className="md:text-4xl sm:text-3xl text-xl font-bold py-4 text-white">
                  Motorcycle or Cars{" "}
                </p>
              </div>
              <p className=" text-md md:text-lg font-bold md:max-w-lg text-white md:pl-4 pl-2">
                we've got you covered.
              </p>
              <button className="bg-black animate-[bounceIn_1s_ease-in-out] hover:bg-white transition-all ease-in-out duration-500 w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white hover:text-black ">
                Join Today
              </button>
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

export default Hero;
