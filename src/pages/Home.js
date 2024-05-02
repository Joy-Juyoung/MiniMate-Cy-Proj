import React, { useState } from 'react';
import Footer from '../components/Footer';
import { Hero, HeroShop, HeroSlide } from '../components/Hero';

const Home = () => {
  return (
    <div className='w-full h-full px-10 sm:px-20 md:px-40'>
      <Hero />
      <HeroSlide />
      <HeroShop />
    </div>
  );
};

export default Home;
