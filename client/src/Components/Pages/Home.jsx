import React from 'react'
import Navbar from '../../Main-Components/Navbar'
import Hero from '../../Main-Components/Hero'
import HomeCards from '../../Main-Components/HomeCards'
import Footer from '../../Main-Components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <HomeCards />
        <Footer />
    </div>
  )
}

export default Home