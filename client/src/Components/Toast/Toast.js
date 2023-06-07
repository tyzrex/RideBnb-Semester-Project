import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
  position: "top-right",
  autoClose: 1400,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: window.localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

export const toastError = (message) => {
  toast.error(message, {
    ...toastStyle,
  });
};

export const toastSuccess = (message) => {
  toast.success(message, {
    ...toastStyle,
  });
};

export const toastBooking = (message) => {
  toast.info(message, {
    ...toastStyle,
  });
};
