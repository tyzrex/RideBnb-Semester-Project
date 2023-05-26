import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavbar = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div className="top-0 sticky z-50">{showNavbar && children}</div>;
};

export default ShowNavbar;
