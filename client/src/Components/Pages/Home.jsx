import React from "react";
import Navbar from "../../Main-Components/Navbar";
import Hero from "../../Main-Components/Hero";
import HomeCards from "../../Main-Components/HomeCards";
import Footer from "../../Main-Components/Footer";
import FAQ from "../../Main-Components/FAQ";
import("preline");

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HomeCards />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
