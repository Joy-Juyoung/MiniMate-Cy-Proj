import React, { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Buttons from '../Buttons';
import { IoIosArrowForward } from 'react-icons/io';
import { shopCategory, shopItem } from '../../redux/tempData';
import { useNavigate } from 'react-router-dom';
// import { CgGhostCharacter, CgHomeAlt } from "react-icons/cg";
// import { TbBackground, TbMusic } from "react-icons/tb";
// import { RiFontSize } from "react-icons/ri";

const HeroShop = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className='w-full h-fit flex flex-col items-center justify-center pb-28 md:pb-auto py-12 bg-[#fff9e7]'>
      <div className='w-full h-full px-10 sm:px-20 md:px-40'>
        <div className='w-full mx-auto mb-6 flex justify-center'>
          {/* <span className='dots-container'></span> */}
          <div className='font-semibold text-lg border-t-2 pb-1'>SHOP</div>
          {/* <div className='text-sm text-center mt-2'>Brand-new items</div> */}
        </div>
        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center '>
          {shopCategory.map((category, index) => {
            const IconComponent = category.image;
            return (
              <div
                key={index}
                className='flex flex-col items-center justify-center cursor-pointer '
              >
                <div
                  className='w-full h-full p-8 mb-2 rounded-lg bg-[#fff] 
                flex items-center justify-center shadow-md'
                  onClick={() => handleClick(index)}
                >
                  <IconComponent className='w-12 h-12 mx-auto' />
                </div>
                <p className=''>{category.name.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
        {/* <div className='w-full flex items-center justify-center'>
          <Buttons
            onClick={() => {
              navigate('/shop');
              scroll.scrollToTop();
            }}
            title='SHOP NOW'
            iconRight={<IoIosArrowForward />}
            iconStyles='text-xl font-semibold '
            containerStyles='flex items-center p-2 md:p-3 text-sm border border-2 font-semibold rounded-xl hover:bg-black hover:border-black hover:text-white shadow-md'
          />
        </div> */}
      </div>
    </div>
  );
};

export default HeroShop;
