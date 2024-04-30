import React, { useState } from 'react';
import Footer from '../components/Footer';
import { Hero, HeroShop } from '../components/Hero';

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Hero />

      <HeroShop />

      {/* <div className='w-full h-[15rem] bg-[#f5f5f5]'></div>
      <HeroAd /> */}

      <Footer />
    </div>
  );
};

export default Home;
