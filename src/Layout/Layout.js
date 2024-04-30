import React from 'react';
import { Footer, Hero, HeroAd, HeroShop } from '../components';

const Layout = ({ children }) => {
  return (
    <div className='container mx-auto py-10 min-h-screen'>
      <Hero />

      <HeroShop />

      <div className='w-full h-[15rem] bg-[#f5f5f5]'></div>
      <HeroAd />

      <Footer />
    </div>
  );
};

export default Layout;
