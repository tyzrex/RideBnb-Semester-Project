import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="bg-white w-screen max-w-[95%] mx-auto xl:w-[100%] xl:max-w-[100%] shadow-lg p-[20px] rounded-xl grid grid-flow-row content-center justify-items-center lg:justify-items-stretch md:grid-flow-col gap-[20px] mb-[20px]">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="w-screen h-[330px] lg:w-[280px] lg:max-w-[100%] lg:h-full object-cover "
      />
      <div className="flex flex-col items-start w-full gap-[10px] lg:flex-[2]">
        <h1 className="text-[20px] font-semibold text-black">
          Tower Street Apartments
        </h1>
        <span className="text-md font-medium">Location</span>
        <span
          className="p-2 text-[12px] rounded-md bg-black text-white"
          style={{
            width: "max-content",
          }}
        >
          Type
        </span>
        <span className="text-[14px] font-bold">
          Posted By: <span className="font-medium">Rajat</span>
        </span>
        <span className="text-[14px]">White • 1 Car • Brand</span>
        <span className="text-red-500 text-[14px] font-semibold">
          Free cancellation{" "}
        </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails flex justify-around w-full">
        <div className="flex justify-between">
          <span className="font-medium">Excellent</span>
          <button className="bg-black text-white p-[6px] rounded-md font-semibold bordernone ">
            8.9
          </button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rs. 112</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="bg-black text-white button-hover p-2 rounded-md">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
