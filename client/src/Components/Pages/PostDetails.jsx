import React, { useRef, useState, useEffect, useParams } from "react";
import Navbar from "../../Main-Components/Navbar";
import Footer from "../../Main-Components/Footer";
import axiosInstance from "../../Instance/instance";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const id = window.location.pathname.split("/")[2];

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/post/getpost/${id}`);
      setPost(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchPost();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-4xl font-bold text-black mt-10">
        {" "}
        Post Details{" "}
      </h1>
      <div className="max-w-[1300px] w-screen mx-auto mt-10 mb-20 flex justify-center justify-items-centers">
        <div className="flex justify-center items-center w-full gap-5 ">
          <div className="w-full">
            <img
              className="w-full h-[40vh] object-cover rounded-3xl"
              src={`../../../Images/${post.vehicle_image}`}
              alt="post"
            />
          </div>
          <div className="w-[30%] px-8 flex flex-col justify-center items-center bg-white shadow-lg h-full rounded-3xl">
            <div>
              <h1 className="text-2xl font-bold text-black"> User Details </h1>
            </div>
            <div>
              <h1>
                Posted by
                <span className="font-bold text-[#ff5a5f]">
                  {" "}
                  {post.customername}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className=""></div>
          <div></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostDetails;
