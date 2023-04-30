import React from "react";
import Navbar from "../../Main-Components/Navbar";
import HomeCards from "../../Main-Components/HomeCards";
import Footer from "../../Main-Components/Footer";
import FAQ from "../../Main-Components/FAQ";
import ExperimentHero from "../../Main-Components/experimentHero";
import Album from "../../Main-Components/Album/Album";
import("preline");

const Home = () => {
  return (
    <div>
      <Navbar />
      <ExperimentHero />
      <HomeCards />
      <Album />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
