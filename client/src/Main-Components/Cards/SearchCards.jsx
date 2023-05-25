import "./searchItem.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchItem = (props) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate({
      checkIn: props.checkIn,
      checkOut: props.checkOut,
    });
  }, [props.checkIn, props.checkOut]);

  console.log(date);
  console.log(props);

  return (
    <div className="bg-white w-screen max-w-[90%] mx-auto xl:w-[100%] xl:max-w-[100%] shadow-lg p-[20px] rounded-xl grid grid-flow-row content-center justify-items-center lg:justify-items-stretch md:grid-flow-col gap-[20px] mb-[20px]">
      <img
        src={props.vehicle_image}
        alt=""
        className="w-screen h-[350px] lg:w-[280px] lg:max-w-[100%] lg:h-full object-cover "
      />
      <div className="flex flex-col items-start w-full gap-[10px] lg:flex-[2]">
        <h1 className="text-[20px] font-semibold text-black">
          {props.vehicle_name}
        </h1>
        <span className="text-md font-medium">{props.address}</span>
        <span className="text-[14px] rounded-md  font-semibold text-black">
          Listing Type : {props.vehicle_listing_type}
        </span>
        <span className="text-[16px] text-indigo-500 font-bold">
          Posted By :{" "}
          <span className="font-normal text-black">{props.posted_by}</span>
        </span>
        <span className="text-[14px]">
          {props.vehicle_color} • {props.vehicle_type} • {props.vehicle_brand}
        </span>
        <span className="text-red-500 text-[14px] font-semibold">
          Free cancellation{" "}
        </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails flex justify-around md:justify-between w-full">
        <div className="flex justify-end gap-5">
          {/* <span className="font-medium mt-1 text-orange-500">
            {props.vehicle_listing_type}
          </span> */}
          <button className="bg-black text-white p-[6px] rounded-full font-semibold bordernone ">
            8.9
          </button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rs. {props.price_per_day}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/explore/${props.vehicle_id}`} state={date}>
            <button className="bg-indigo-500 text-white button-transition hover:bg-black p-2 rounded-md">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
