import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchUser } from '../redux/authSlice';
import Footer from '../components/Footer';
import { Hero, HeroShop, HeroSlide } from '../components/Hero';

const Home = ({ me }) => {
  console.log('me', me);

  return (
    <div className='w-full h-full px-10 sm:px-20 md:px-40'>
      <Hero me={me} />
      <HeroSlide />
      <HeroShop />
    </div>
  );
};

export default Home;
