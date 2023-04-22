import "./list.css";
import Navbar from "../../Main-Components/Navbar";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import Footer from "../../Main-Components/Footer";
import SearchItem from "../../Main-Components/Cards/SearchCards";
import { axiosBase } from "../../Instance/instance";

const List = () => {
  const prevState = useLocation();
  const [searchData, setSearchData] = useState([]);
  const [datePicker, setDatePicker] = useState(false);

  const handleDatePicker = () => {
    setDatePicker(!datePicker);
    handleDate();
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const convertDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = `0${newDate.getMonth() + 1}`.slice(-2);
    const day = newDate.getDate();
    return `${year}-${month}-${day}`;
  };
  const handleSelect = (ranges) => {
    selectionRange.startDate = ranges.selection.startDate;
    selectionRange.endDate = ranges.selection.endDate;
  };

  const handleDate = () => {
    setData((prevData) => ({
      ...prevData,
      checkIn: convertDate(selectionRange.startDate),
      checkOut: convertDate(selectionRange.endDate),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [data, setData] = useState({
    location: prevState.state.location,
    checkIn: prevState.state.checkIn,
    checkOut: prevState.state.checkOut,
    vehicleType: prevState.state.vehicleType,
    listingType: "All",
  });

  const searchVehicle = async () => {
    try {
      const response = await axiosBase.get(
        `http://localhost:5000/search/searchVehicle`,
        { params: data }
      );
      setSearchData(response.data);
      console.log(response.data);
      console.log(typeof response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchData);

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      searchVehicle();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl pt-3 pb-6 font-bold text-center mt-10">
        Search Results for {prevState.state.location}
      </h1>
      <div className="flex justify-center mt-[20px] mb-10">
        <div className="w-[100%] max-w-[95%] xl:max-w-[1300px] flex-col flex xl:flex-row justify-center gap-[20px]">
          <div className="h-full">
            <div className="xl:flex-1 pb-5 w-screen max-w-[95%] mx-auto xl:w-full bg-white shadow-xl px-8 py-2 lg:p-5 rounded-md ">
              <h1 className="text-2xl py-6 font-bold top-[10px] text-black">
                Search for Vehicles
              </h1>
              <div className="flex flex-col gap-[10px] mb-[10px]">
                <label className="text-black font-medium">Location</label>
                <input
                  type="text"
                  className="rounded-md border p-2"
                  placeholder="Enter the Location"
                  value={data.location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-[5px]">
                {/* <label className="text-black font-medium">
                  Check-in / Check-out Date
                </label>
                <span
                  className="rounded-md border p-2 cursor-pointer h-[40px] flex items-center"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                    rangeColors={["black"]}
                  />
                )} */}
                <div>
                  <label className="text-gray-500">Check In</label>
                  <input
                    onClick={handleDatePicker}
                    type="text"
                    readOnly={true}
                    value={data.checkIn}
                    onChange={handleChange}
                    placeholder="Pick a date"
                    className="w-full border-2 text-gray-500 border-gray-300 bg-white rounded-lg p-2 mb-4 cursor-pointer"
                    name="checkIn"
                  />
                  {datePicker && (
                    <div className="flex justify-center items-center">
                      <DateRange
                        className=""
                        ranges={[selectionRange]}
                        rangeColors={["#000000"]}
                        onChange={handleSelect}
                        minDate={new Date()}
                        footerContent={
                          <div className="flex justify-center items-center">
                            <button
                              onClick={handleDatePicker}
                              className="bg-black text-white px-4 py-2 rounded-lg"
                            >
                              Close
                            </button>
                          </div>
                        }
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-gray-500">Check Out</label>
                  <input
                    onClick={handleDatePicker}
                    type="text"
                    readOnly={true}
                    value={data.checkOut}
                    onChange={handleChange}
                    placeholder="Pick a date"
                    className="w-full border-2 text-gray-500 border-gray-300 bg-white rounded-lg p-2 mb-4 cursor-pointer"
                    id="checkOut"
                    name="checkOut"
                  />
                </div>
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
            {searchData.map((item) => (
              <SearchItem
                key={item.vehicle_post_id}
                vehicle_name={item.vehicle_name}
                vehicle_type={item.vehicle_type}
                vehicle_price={item.vehicle_price}
                vehicle_image={item.vehicle_image}
                vehicle_location={item.vehicle_location}
                vehicle_listing_type={item.vehicle_listing_type}
                address={item.address}
                vehicle_color={item.vehicle_color}
                vehicle_brand={item.vehicle_brand}
                posted_by={item.customername}
                price_per_day={item.price_per_day}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
