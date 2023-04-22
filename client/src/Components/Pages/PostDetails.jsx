import React, { useRef, useState, useEffect, useParams } from "react";
import Navbar from "../../Main-Components/Navbar";
import Footer from "../../Main-Components/Footer";
import axiosInstance from "../../Instance/instance";
import { GoLocation } from "react-icons/go";
import { IoIosColorPalette } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { AiFillCar } from "react-icons/ai";
import { TbBike } from "react-icons/tb";
import { MdOutlineMergeType } from "react-icons/md";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const PostDetails = () => {
  const [post, setPost] = useState({});
  const id = window.location.pathname.split("/")[2];
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/post/getpost/${id}`);
      setPost(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createSocketConnection = () => {
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.emit("joinRoom", id);

    socket.on("newComment", (comment) => {
      setComments((prevState) => [...prevState, comment]);
    });

    socket.on("comments", (comments) => {
      setComments(comments);
    });

    return () => {
      socket.disconnect();
    };
  };

  const getComments = async () => {
    try {
      const response = await axiosInstance.get(`/comment/getComments/${id}`);
      setComments(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    try {
      const data = {
        vehicle_post_id: id,
        comment: newComment,
      };
      const response = await axiosInstance.post("/comment/createComment", data);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    createComment();
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      getComments();
      createSocketConnection();
      fetchPost();
    }
  }, []);

  return (
    <div>
      <Navbar />
      {/* <h1 className="text-center text-4xl font-bold text-black mt-10">
        {" "}
        Post Details{" "}
      </h1> */}
      <div className="lg:max-w-[1300px] max-w-[95%] gap-6 w-screen mx-auto mt-10 mb-20 flex flex-col justify-center justify-items-centers">
        <div className=" flex-col flex lg:flex-row justify-center items-center w-full gap-5 ">
          <div className="w-full shadow-md rounded-3xl">
            <img
              className="w-full h-[50vh] object-cover rounded-3xl"
              src={`../../../Images/${post.vehicle_image}`}
              alt="post"
            />
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-5">
          <div className="flex flex-col">
            <div>
              <h1 className="text-4xl text-left font-bold text-black">
                {" "}
                {post.vehicle_name}{" "}
              </h1>

              <h1 className="flex gap-2 items-start mt-3 py-2 font-medium">
                <GoLocation className="text-2xl" />
                Location : {post.address}
              </h1>
            </div>
            <div className="mt-5 flex  items-center gap-5">
              <div className="px-2 py-5 shadow-lg gap-2 flex justify-center items-center rounded-xl">
                <IoIosColorPalette className="text-2xl" />
                <h1>Color: {post.vehicle_color}</h1>
              </div>
              <div className=" px-5 py-5 shadow-lg gap-2 flex justify-center items-center rounded-xl">
                <SiBrandfolder className="text-2xl" />
                <h1>Brand: {post.vehicle_brand}</h1>
              </div>
              <div className=" px-5 py-5 shadow-lg gap-2 flex justify-center items-center rounded-xl">
                {post.vehicle_type === "Car" ? (
                  <AiFillCar className="text-2xl" />
                ) : (
                  <TbBike className="text-2xl" />
                )}
                <h1>Vehicle Type: {post.vehicle_type}</h1>
              </div>
              <div className=" px-5 py-5 shadow-lg gap-2 flex justify-center items-center rounded-xl">
                <MdOutlineMergeType className="text-2xl" />
                <h1>Listing Type: {post.vehicle_listing_type}</h1>
              </div>
            </div>
            <div className="mt-5">
              <h1>
                {post.vehicle_description}
                lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptas, quod, quia, quae voluptates quibusdam
                voluptatibus voluptatum quidem quos quas nesciunt. Quisquam,
                quae.
              </h1>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col py-10 gap-5 bg-emerald-200">
        <h2>Comments</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button type="submit">Post</button>
        </form>
        <ul>
          {comments.map((comment) => (
            <li className="text-black" key={comment.comment_id}>
              {comment.comment_text}
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default PostDetails;
