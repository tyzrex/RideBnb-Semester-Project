import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Main-Components/Navbar";
import ExploreCards from "../../Main-Components/Cards/ExploreCards";
import axios from "axios";
import ExploreHero from "../../Main-Components/ExploreHero";
import Footer from "../../Main-Components/Footer";

const ExploreAll = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPosts = async (page) => {
    try {
      const limit = 2;
      const response = await axios.get(
        `http://localhost:5000/post/getPosts?page=${page}&limit=${limit}`
      );

      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      getPosts(currentPage);
    }
  }, []);

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Navbar />
      <div>
        <ExploreHero />
      </div>

      <div className="pb-20">
        <div className="w-screen gap-5 grid justify-items-center content-center xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mx-auto max-w-[95%] xl:max-w-[1300px] mt-20">
          {posts.map((item) => (
            <ExploreCards
              key={item.vehicle_post_id}
              vehicleName={item.vehicle_name}
              vehiclePrice={item.price_per_day}
              vehicleImage={item.vehicle_image}
              postedBy={item.customername}
            />
          ))}
        </div>
        <div className="flex justify-center items-center space-x-5 mt-10">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black button-hover text-white rounded-md"
          >
            Previous
          </button>
          <p className="text-xl font-bold">
            {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black button-hover text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExploreAll;
