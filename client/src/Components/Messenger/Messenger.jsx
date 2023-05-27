import React, { useEffect, useRef, useState, useContext } from "react";
import axiosInstance from "../../Instance/instance";
import { AuthContext } from "../../Context/AuthContext";
import MiniNav from "../MiniNav/MiniNav";
import { GoPrimitiveDot } from "react-icons/go";
import Footer from "../../Main-Components/Footer";
import {
  XMarkIcon,
  UserCircleIcon,
  UserPlusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { toastSuccess } from "../Toast/Toast";

const Messenger = ({ socket }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [convoDetails, setConvoDetails] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const shouldFetch = useRef(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(convoDetails[0].receiver_name.customer_id);
    const data = {
      message_text: message,
      receiver_id: convoDetails[0]?.receiver_name.customer_id,
      sender_name: user.customername,
      conversation_id: convoDetails[0]?.conversation_id,
    };
    socket.current.emit("message", data);
    socket.current.emit("notify", {
      sender_id: user.customer_id,
      receiver_id: convoDetails[0]?.receiver_name.customer_id,
      notification_message: "Sent you a message",
      sender_name: user.customername,
    });

    setMessages((prev) => [...prev, data]);

    setMessage("");
    try {
      // const response = await axiosInstance.post("/chat/createMessage", data);
      // socket.current.emit("newMessage", response.data);
      // console.log(response.data);
      // console.log(messages);
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserOnline = async (customer_id) => {
    try {
      const response = await axiosInstance.get(`/chat/checkUserOnline`, {
        params: {
          customer_id: `${customer_id}`,
        },
      });
      console.log(response.data);
      setIsOnline(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async (conversation_id) => {
    try {
      const response = await axiosInstance.get(`/chat/getMessage`, {
        params: {
          conversation_id: `${conversation_id}`,
        },
      });
      console.log(response.data);
      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getChatDetails = async (conversation_id) => {
    //filter conversation array to get the conversation details
    const convo = conversation.filter(
      (convo) => convo.conversation_id === conversation_id
    );
    setConvoDetails(convo);
    checkUserOnline(convo[0].receiver_name.customer_id);
  };

  const getConversations = async () => {
    try {
      const response = await axiosInstance.get(`/chat/getUserChatRooms`);

      console.log(response.data);
      setConversation(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchForUser = async (e) => {
    // e.preventDefault();
    try {
      const response = await axiosInstance.get(`/chat/searchForUser`, {
        params: {
          searchQuery: `${search}`,
        },
      });
      if (response.data.length > 0) {
        console.log(response.data);
        setSearchResults(response.data);
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addNewChat = async (receiver_id) => {
    console.log(receiver_id);
    try {
      const response = await axiosInstance.post(`/chat/createChatRoom`, {
        member_2: receiver_id,
      });
      console.log(response.data);
      getConversations();
      toastSuccess("Added new chat");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (search.length > 4 && search.length < 8) {
      searchForUser();
    }
    if (search.length === 0) {
      setSearchResults([]);
    }
  }, [search]);

  const chatBox = useRef(null);
  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (shouldFetch.current) {
      // getComments();
      getConversations();

      shouldFetch.current = false;
    }
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message", (data) => {
        console.log(data);
        setMessages((prev) => [...prev, data]);
      });
    }
  }, []);

  return (
    <div className="dark:bg-dark-secondary">
      <div className=" min-h-[60vh]">
        <MiniNav />
        <div className="w-screen max-w-[90%] xl:max-w-[1200px] antialiased text-gray-800 mx-auto ">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-[40%] border-b dark:border-b-gray-800 pb-5 lg:border-r dark:border-r-gray-800 lg:border-b-0">
              <div className="flex flex-col h-full w-full ">
                <h1 className="text-2xl font-semibold py-4 px-6 dark:text-accent-3">
                  Conversations
                </h1>

                <div className="flex flex-col mx-4 gap-4 ">
                  <div className="flex flex-row items-center relative py-3 px-4 rounded-2xl border dark:border-gray-800 dark:bg-gray-900">
                    <input
                      type="text"
                      placeholder="Search for a user"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm dark:text-white"
                    />

                    {search && (
                      <div
                        onClick={() => setSearch("")}
                        className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 cursor-pointer"
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}

                    {searchResults.length > 0 ? (
                      // make a floating div that shows the search results
                      <div className="absolute flex flex-col gap-5 dark:border-gray-800 top-14 left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 px-4">
                        {searchResults.map((result) => (
                          <div
                            className="flex flex-col gap-6 h-auto dark:text-white"
                            key={result.customer_id}
                          >
                            <div className="flex flex-row items-center gap-2">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-500 text-pink-100">
                                <UserCircleIcon className="h-8 w-8" />
                              </div>
                              <div className="flex flex-col">
                                <h1 className="text-sm font-semibold">
                                  {result.customername}
                                </h1>
                                <p className="text-xs text-gray-500">
                                  {result.customer_id}
                                </p>
                              </div>

                              <div className="flex-grow">
                                <button
                                  onClick={() => addNewChat(result.customer_id)}
                                  className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-500 text-pink-100"
                                >
                                  <UserPlusIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex lg:flex-col overflow-scroll">
                    {conversation.map((conversation) => (
                      <div
                        key={conversation.conversation_id}
                        onClick={() =>
                          getChatDetails(conversation.conversation_id)
                        }
                        className="flex flex-row items-center rounded-full md:rounded-2xl border dark:border-gray-800 mr-5 mt-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-900 cursor-pointer md:p-4"
                      >
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                          {conversation.receiver_name.customername[0]}
                        </div>
                        <div className=" flex-col ml-3 hidden md:flex dark:text-white">
                          <div className="font-semibold text-sm ">
                            {conversation.receiver_name.customername}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full w-full pb-5">
              <div className="flex flex-col h-full w-full ">
                {convoDetails.length > 0 ? (
                  <div className="flex flex-row items-center py-4 px-6 rounded-2xl border dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100 ">
                      {convoDetails[0].receiver_name.customername[0]}
                    </div>
                    <div className="flex flex-col ml-3">
                      <div className="font-semibold text-sm dark:text-white">
                        {convoDetails[0].receiver_name.customername}
                      </div>
                      {isOnline ? (
                        <div className="text-xs text-green-500 flex items-center">
                          <GoPrimitiveDot className="inline-block" />
                          <span>Online</span>
                        </div>
                      ) : (
                        <div className="text-xs text-red-500 flex items-center">
                          <GoPrimitiveDot className="inline-block" />
                          <span>Offline</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // select a conversation

                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-2xl font-semibold dark:text-white">
                      Select a conversation to get started
                    </div>
                  </div>
                )}

                {convoDetails.length > 0 ? (
                  <div className="h-[60vh] mt-5 overflow-auto chatBox">
                    {messages?.map((message, index) => (
                      <div className="overflow-hidden " key={index}>
                        {message.conversation_id ===
                        convoDetails[0].conversation_id ? (
                          <div className="h-full overflow-y-auto">
                            <div className="grid grid-cols-12 gap-y-2">
                              {message.receiver_id !== user.customer_id ? (
                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                  <div className="flex  flex-row-reverse items-center ">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
                                      {message.sender_name[0]}
                                    </div>

                                    <div className="flex-col flex justify-center items-end gap-1">
                                      <div className="flex flex-col mr-3">
                                        <div className="text-sm font-semibold dark:text-accent-3">
                                          {message.sender_name}
                                        </div>
                                      </div>

                                      <div className="relative ml-3 text-sm bg-gray-300 text-black dark:text-white dark:bg-gray-900  mr-3 py-2 px-3 shadow rounded-xl">
                                        <div>{message.message_text}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                  <div className="flex flex-row items-center">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
                                      {message.sender_name[0]}
                                    </div>

                                    <div className="flex-col flex justify-center items-start gap-1">
                                      <div className="flex flex-col ml-5">
                                        <div className="text-sm font-semibold dark:text-accent-3">
                                          {message.sender_name}
                                        </div>
                                      </div>

                                      <div className="relative ml-3 text-sm text-black bg-gray-200 dark:text-white dark:bg-gray-900 py-2 px-4 shadow rounded-xl">
                                        <div>{message.message_text}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}

                {convoDetails.length > 0 ? (
                  <div className="flex flex-row items-center ">
                    <div className="flex flex-row items-center w-full border dark:bg-gray-900 dark:border-gray-800 rounded-3xl h-12 px-2">
                      <div className="w-full">
                        <input
                          type="text"
                          className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center dark:bg-gray-900 dark:text-gray-400"
                          placeholder="Type your message...."
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                        />
                      </div>
                    </div>
                    <div className="ml-6">
                      <button
                        onClick={handleSubmit}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 dark:bg-gray-900 dark:text-gray-400"
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
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Messenger;
