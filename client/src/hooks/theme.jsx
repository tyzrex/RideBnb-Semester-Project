import { MoonIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const handleTheme = (e) => {
    e.preventDefault();
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div>
      <button className="text-black dark:text-accent-1 p-2 md:p-[14px] text-sm font-bold dark:hover:bg-gray-900 rounded-xl bg-white dark:bg-gray-900 border-2 dark:border-0 hover:bg-black hover:text-white duration-300 transition-colors ease-in">
        {theme === "light" ? (
          <div
            className="flex justify-center items-center gap-2"
            onClick={handleTheme}
          >
            {/* <span className="">Dark Mode<2/span> */}
            <MoonIcon className="h-5 w-5" />
          </div>
        ) : (
          <div
            className="flex justify-center items-center gap-2"
            onClick={handleTheme}
          >
            {/* <span className="">Light Mode</span> */}
            <LightBulbIcon className="h-5 w-5" />
          </div>
        )}
      </button>
    </div>
  );
};

export default Theme;
