import { useEffect, useRef, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { toastBooking } from "../Toast/Toast";
import axiosInstance from "../../Instance/instance";
import("preline");

const Notification = ({ socket }) => {
  const [notification, setNotification] = useState(false);

  const [notify, setNotify] = useState([]);

  const [notifyCount, setNotifyCount] = useState(0);

  const notificationHandler = () => {
    setNotification(!notification);
    setNotifyCount(0);
  };

  const shouldFetch = useRef(true);

  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get("notification/getNotifications");
      console.log(response.data);
      if (response.data.length > 0) {
        setNotify(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shouldFetch.current) {
      getNotifications();
      if (socket?.current) {
        socket?.current.on("notify", (data) => {
          // console.log(data);
          //set with previous state
          setNotify((prev) => [...prev, data]);
          setNotifyCount((prev) => prev + 1);
          toastBooking(
            <div className="flex items-center gap-3">
              <div>
                <div className="relative inline-flex items-center p-2 justify-center w-10 h-10 overflow-hidden bg-indigo-500 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-sm text-white dark:text-gray-300">
                    {data.sender_name[0]}
                    {data.sender_name[1]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs mr-2">{data.sender_name}</span>
                <span className="text-xs text-gray-500">
                  {data.notification_message}
                </span>
              </div>
            </div>
          );
        });

        socket?.current.on("notifyBooking", (data) => {
          console.log(data);
        });
      }
    }
    shouldFetch.current = false;
  }, []);

  return (
    <div className="hs-dropdown [--placement:bottom-right]">
      <button
        onClick={notificationHandler}
        className="text-3xl text-white bg-green-500 rounded-full p-2 relative hs-dropdown-toggle focus:outline-none hover:bg-black button-transition"
      >
        <AiOutlineBell />
        {notifyCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {notifyCount}
          </span>
        )}
      </button>
      <div
        className="mx-auto xl:max-w-[1200px] hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden w-full z-10 bg-white rounded-lg p-2 "
        id="notification"
      >
        <div className="lg:w-5/12 w-screen rounded-b-2xl md:rounded-2xl lg:mt-0 bg-gray-50 border h-[400px]  overflow-y-auto p-8 absolute right-0">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold leading-6 text-gray-800">
              Notifications
            </p>
            <div className="cursor-pointer" onClick={notificationHandler}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="mt-7">
            {notify?.map((item, index) => (
              <div
                key={index}
                className="w-full p-3 mt-2 bg-indigo-50 rounded-3xl flex"
              >
                <div className="pl-3 flex gap-3 items-center">
                  <div className="relative inline-flex items-center p-2 justify-center w-10 h-10 overflow-hidden bg-indigo-500 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-sm text-white dark:text-gray-300">
                      {item.sender_name[0]}
                      {item.sender_name[1]}
                    </span>
                  </div>
                  <p className="text-sm leading-none flex flex-col gap-1">
                    <span className="text-indigo-700">{item.sender_name}</span>{" "}
                    <span className=" leading-5">
                      {item.notification_message}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notification;
