import React, { useEffect } from "react";
import Navbar from "../../Main-Components/Navbar";
import HomeCards from "../../Main-Components/HomeCards";
import Footer from "../../Main-Components/Footer";
import FAQ from "../../Main-Components/FAQ";
import ExperimentHero from "../../Main-Components/experimentHero";
import Hero from "../../Main-Components/Hero";
import Album from "../../Main-Components/Album/Album";

import("preline");

const Home = ({ socket }) => {
  return (
    <div>
      <ExperimentHero />

      {/* <Hero /> */}
      <HomeCards />

      {/* <Album /> */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
