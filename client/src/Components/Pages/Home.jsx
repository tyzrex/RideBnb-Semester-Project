import React, { useEffect } from "react";
import HomeCards from "../../Main-Components/HomeCards";
import Footer from "../../Main-Components/Footer";
import FAQ from "../../Main-Components/FAQ";
import ExperimentHero from "../../Main-Components/experimentHero";
import Navbar from "../../Main-Components/experimentNav";
import Hero from "../../Main-Components/Hero";

import("preline");

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
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
