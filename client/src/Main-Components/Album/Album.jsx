import React from "react";
import "./Album.css";
import BikePic from "../../assets/bike.png";
import BikePic2 from "../../assets/duke.png";
import BikePic3 from "../../assets/cbr2.png";
import BikePic4 from "../../assets/herobike.jpg";
import { Link } from "react-router-dom";
const Album = () => {
  return (
    <div className="w-screen hidden lg:block overflow-hidden">
      <div className="flex flex-col main-album gap-20 mt-[300px] mb-[150px] md:mt-[200px] xl:mb-0 xl:mt-[160px] mx-auto max-w-[90%] xl:max-w-[1200px] w-full justify-center items-center">
        <div className="text-center w-full mx-auto">
          <h1 className="text-[48px] font-bold">Explore Our Collection</h1>
        </div>
        <div className="card-swiper">
          <div className="card-groups">
            <div className="card-group" data-index="0" data-status="active">
              <div
                className="little-card card"
                style={{ backgroundImage: `url(${BikePic})` }}
              ></div>
              <div
                className="big-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic2})` }}
              ></div>
              <div
                className="little-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic3})` }}
              ></div>
              <div
                className="big-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic4})` }}
              ></div>
              <div
                className="little-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic})` }}
              ></div>
              <div
                className="big-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic})` }}
              ></div>
              <div
                className="little-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic3})` }}
              ></div>
              <div
                className="big-card card rounded-3xl"
                style={{ backgroundImage: `url(${BikePic4})` }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <Link to="/explore">
            <button className="bg-blue-500 z-10 text-[#ffffff] font-bold text-[18px] px-8 py-3 rounded-full animate-bounce">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Album;
