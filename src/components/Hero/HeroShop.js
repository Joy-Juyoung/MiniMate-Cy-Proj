import React, { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Buttons from '../Buttons';
import { IoIosArrowForward } from 'react-icons/io';
import { shopCategory, shopItem } from '../../redux/tempData';
import { useNavigate } from 'react-router-dom';

const HeroShop = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  return (
    <div className='w-full relative' style={{ zIndex: 1 }}>
      <div className='w-full flex flex-col items-center justify-center pb-14 bg-[#fff]'>
        <div className='w-full py-16 px-10 2xl:px-40'>
          <div className='w-full mb-12 flex flex-col items-center justify-center'>
            <div className='font-semibold text-lg text-center border-b-2 pb-1'>
              NEW ITEMS
            </div>
            <div className='text-sm text-center mt-2'>Brand-new items</div>
          </div>

          <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
            {shopCategory.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`cursor-pointer text-sm text-center px-5 py-2 rounded-lg border ${
                    activeCategory === index
                      ? ' bg-black text-white shadow-md border-white'
                      : 'border-[#ddd] shadow-md hover:bg-[#ffffff52]'
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {category.name}
                </div>
              );
            })}
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-14'>
            {shopItem.map((item, index) => {
              return (
                <div
                  key={index}
                  className='w-full flex items-center justify-between cursor-pointer'
                >
                  <div className='w-full pt-3 flex flex-col items-center justify-center shadow-md border border-[#ccc] rounded-lg'>
                    <img
                      src={item.image}
                      alt=''
                      className='w-full h-[10rem] object-contain '
                    />
                    <div
                      className='w-full text-xs flex flex-col py-3 px-3 mt-4 bg-[#f5f5f5] shadow-md
                      rounded-lg'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='text-md'>{item.name}</div>
                        <div className='mt-1'>🧀{item.cheese}</div>
                      </div>
                      {/* <div className='mt-1 text-right'>Add to Cart</div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='w-full flex items-center justify-center'>
            <Buttons
              onClick={() => {
                navigate('/shop');
                scroll.scrollToTop();
              }}
              title='SHOP NOW'
              iconRight={<IoIosArrowForward />}
              iconStyles='text-xl font-semibold '
              containerStyles='flex items-center p-2 md:p-3 text-sm border border-2 border-black font-semibold rounded-xl bg-black text-white hover:border-black hover:bg-white hover:text-black shadow-md'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroShop;
