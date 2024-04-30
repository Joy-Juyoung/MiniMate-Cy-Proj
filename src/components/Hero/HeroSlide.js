// HeroSlide 컴포넌트
import React, { useState } from 'react';
import Img1 from '../../assets/shop3.gif';
import Img2 from '../../assets/shop4.gif';
import Img3 from '../../assets/miniroom1.gif';
import Img4 from '../../assets/miniroom2.gif';
import Buttons from '../Buttons';
import { IoIosArrowForward } from 'react-icons/io';
import ImageSlider from './ImageSlider';

const images = [Img1, Img2, Img3, Img4];

const HeroSlide = () => {
  return (
    <div className='relative'>
      <div
        className='absolute inset-0 w-full h-full'
        style={{
          background: 'linear-gradient(to left bottom, #fff, #fff)',
          clipPath: 'polygon(0% 100%, 0% 100%, 100% 85%, 100% 100%)',
          // clipPath: 'polygon(0% 100%, 0% 100%, 50% 85%, 100% 100%)',
        }}
      ></div>
      <div className='banner-slider w-full py-16 px-10 2xl:px-40 bg-[#f5f5f5]'>
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='font-semibold text-lg text-center border-b-2 pb-1'>
            NEW ITEMS
          </div>
          <div className='text-sm text-center mt-2'>Brand-new skins</div>
        </div>
        <ImageSlider images={images} />
        <div className='w-full flex items-center justify-center mb-24'>
          <Buttons
            title='SHOP NOW'
            iconRight={<IoIosArrowForward />}
            iconStyles='text-xl font-semibold '
            containerStyles='flex items-center p-2 md:p-3 text-sm border border-2 font-semibold rounded-xl hover:bg-black hover:border-black hover:text-white shadow-md'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
