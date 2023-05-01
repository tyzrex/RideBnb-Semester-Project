import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../../Instance/instance";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../../Main-Components/Navbar";
import MiniNav from "../MiniNav/MiniNav";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const sender_id = user.customer_id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);

  console.log(messages);

  const socket = useRef();
  const shouldFetch = useRef(true);

  const booking_id = 25;

  const handleSocketConnection = () => {
    socket.current = io("http://localhost:3000", {
      query: {
        booking_id: 25,
        sender_id: sender_id,
      },
    });

    socket.current.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on("online", (data) => {
      if (data === sender_id) {
        setOnline(true);
      }
    });

    socket.current.on("connect", () => {
      console.log("Connected");
    });

    socket.current.on("disconnect", () => {
      setOnline(false);
      console.log("Disconnected");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    const data = {
      message,
      booking_id,
    };

    try {
      const response = await axiosInstance.post("/chat/createMessage", data);
      socket.current.emit("newMessage", response.data);
      console.log(messages);
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    try {
      const response = await axiosInstance.get(`/chat/getMessage`, {
        params: {
          booking_id: `${booking_id}`,
        },
      });

      console.log(response.data);
      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const chatBox = useRef(null);
  useEffect(() => {
    chatBox.current.scrollTop = chatBox.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (shouldFetch.current) {
      handleSocketConnection();
      getComments();
      socket.current.emit("online", sender_id);
      shouldFetch.current = false;
    }
  }, []);

  return (
    <div>
      <Navbar />
      <MiniNav />
      <div className="flex flex-row  w-screen max-w-[90%] xl:max-w-[1200px] antialiased text-gray-800 mx-auto ">
        <div className="flex flex-col h-full w-full ">
          <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
              T
            </div>
            <div className="flex flex-col ml-3">
              <div className="font-semibold text-sm">helo</div>
            </div>
          </div>
          <div className="h-[60vh] overflow-auto chatBox" ref={chatBox}>
            {messages.map((message) => (
              <div className="overflow-hidden ">
                <div className="h-full overflow-y-auto">
                  <div className="grid grid-cols-12 gap-y-2">
                    {message.sender_id === user.customer_id ? (
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.sender_name[0]}
                          </div>

                          <div className="flex-col flex justify-center items-start gap-1">
                            <div className="flex flex-col ml-5">
                              <div className="text-sm font-semibold">
                                {message.sender_name}
                                {online ? (
                                  <div className="text-xs text-green-500">
                                    Online
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500">
                                    Offline
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{message.message_text}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {message.sender_name[0]}
                          </div>

                          <div className="flex-col flex justify-center items-end gap-1">
                            <div className="flex flex-col mr-5">
                              <div className="text-sm font-semibold">
                                {message.sender_name}
                                {message.sender_name}
                                {online ? (
                                  <div className="text-xs text-green-500">
                                    Online
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-500">
                                    Offline
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{message.message_text}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center ">
            <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
              <div className="w-full">
                <input
                  type="text"
                  className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                  placeholder="Type your message...."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
            </div>
            <div className="ml-6">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 "
              >
                <svg
                  className="w-5 h-5 transform rotate-90 -mr-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
