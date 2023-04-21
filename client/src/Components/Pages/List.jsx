import "./list.css";
import Navbar from "../../Main-Components/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Footer from "../../Main-Components/Footer";
import SearchItem from "../../Main-Components/Cards/SearchCards";

const List = () => {
  //   const location = useLocation();
  //   const [destination, setDestination] = useState(location.state.destination);
  //   const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [data, setData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    vehicleType: "Car",
    listingType: "All",
  });
  return (
    <div>
      <Navbar />
      <h1 className="text-4xl pt-3 pb-6 font-bold text-center mt-10">
        Search Results for *query*
      </h1>
      <div className="flex justify-center mt-[20px] mb-10">
        <div className="w-[100%] max-w-[95%] xl:max-w-[1300px] flex-col flex xl:flex-row justify-center items-center gap-[20px]">
          <div className="h-full">
            <div className="xl:flex-1 w-screen max-w-[95%] mx-auto xl:w-full bg-white shadow-xl px-8 py-2 lg:p-5 rounded-md ">
              <h1 className="text-2xl py-6 font-bold top-[10px] text-black">
                Search for Vehicles
              </h1>
              <div className="flex flex-col gap-[10px] mb-[10px]">
                <label className="text-black font-medium">Location</label>
                <input
                  type="text"
                  className="rounded-md border p-2"
                  placeholder="Enter the Location"
                />
              </div>
              <div className="flex flex-col gap-2 mb-[10px]">
                <label className="text-black font-medium">
                  Check-in / Check-out Date
                </label>
                <span
                  className="rounded-md border p-2 cursor-pointer h-[40px] flex items-center"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                    rangeColors={["black"]}
                  />
                )}
              </div>
              <div className="flex flex-col gap-[5px] ">
                <label className="text-[16px] pt-3 font-medium">Options</label>
                <div className="p-[10px]">
                  <div className="flex justify-between mb-[10px] items-center text-black text-[12px]">
                    <span className="text-lg">
                      Min price <small>per night</small>
                    </span>
                    <input type="number" className="w-[100px] border p-2" />
                  </div>
                  <div className="flex justify-between mb-[10px] items-center text-black text-[12px]">
                    <span className="text-lg">
                      Max price <small>per night</small>
                    </span>
                    <input type="number" className="w-[100px] border p-2" />
                  </div>
                  <div className="flex justify-between mb-[10px] items-center text-black text-[12px]">
                    <span className="text-lg">Vehicle Type</span>
                    <select className="border p-2 w-[100px] bg-white">
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                    </select>
                  </div>

                  <div className="flex justify-between mb-[10px] items-center text-black text-[12px]">
                    <span className="text-lg">Listing Type</span>
                    <select className="border p-2 w-[100px] bg-white">
                      <option value="Car">Rent</option>
                      <option value="Bike">Sell</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="button-hover bg-black text-white p-3 rounded-md">
                Search
              </button>
            </div>
          </div>
          <div className="flex-[3]">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
