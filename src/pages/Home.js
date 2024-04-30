import React, { useState } from 'react';
import Together2 from '../assets/together2.svg';
import Footer from '../components/Footer';
import MainInfo from '../components/MainInfo';
import Hero from '../components/Hero';
import { HeroAd, HeroShop } from '../components';
import BgImg from '../assets/pattern.png';

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Hero />

      <HeroShop />

      <div className='w-full h-[15rem] bg-[#f5f5f5]'></div>
      <HeroAd />

      <Footer />
    </div>
  );
};

export default Home;
