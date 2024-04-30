import React, { useState } from 'react';
import Footer from '../components/Footer';
import { Hero, HeroShop, HeroSlide } from '../components/Hero';

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Hero />
      <HeroSlide />

      <HeroShop />

      <Footer />
    </div>
  );
};

export default Home;
