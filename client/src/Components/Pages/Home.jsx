import React from "react";
import HomeCards from "../../Main-Components/HomeCards";
import Footer from "../../Main-Components/Footer";
import FAQ from "../../Main-Components/FAQ";
import ExperimentHero from "../../Main-Components/experimentHero";

import("preline");

const Home = () => {
  return (
    <div>
      <ExperimentHero />
      <HomeCards />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
