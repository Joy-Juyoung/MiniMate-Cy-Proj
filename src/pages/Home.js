import React, { useState } from 'react';
import Together2 from '../assets/together2.svg';
import Footer from '../components/Footer';
import MainInfo from '../components/MainInfo';
import Hero from '../components/Hero';
import { HeroShop } from '../components';
import BgImg from '../assets/pattern.png';

const Home = () => {
  return (
    <div className='w-full h-screen'>
      <Hero />

      <HeroShop />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
