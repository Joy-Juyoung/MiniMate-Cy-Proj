import React, { useState } from 'react';
import Shop1 from '../assets/shop1.gif';
import Shop2 from '../assets/shop2.gif';
import Shop3 from '../assets/shop5.gif';
import Shop4 from '../assets/shop6.gif';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';
import { IoIosArrowForward } from 'react-icons/io';

const HeroShop = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  const shopItem = [
    { image: Shop1, name: 'minime one', cheese: '30' },
    { image: Shop2, name: 'minime one', cheese: '30' },
    { image: Shop3, name: 'minime one', cheese: '30' },
    { image: Shop4, name: 'minime one', cheese: '30' },
  ];

  const shopCategory = [
    { name: 'Minime' },
    { name: 'Miniroom' },
    { name: 'Skin' },
    { name: 'Music' },
    { name: 'Font' },
  ];

  return (
    <div className='w-full flex flex-col items-center justify-center py-16 bg-[#fffefc]'>
      <div className='w-full px-10 2xl:px-40'>
        {/* title */}
        <div className='w-fit mb-14 flex items-center '>
          <div className='font-semibold text-lg text-center mr-4 text-hightColor border-b-2 pb-1'>
            BEST ITEMS
          </div>
          <div className='text-sm text-center'>Most popular for this week</div>
        </div>

        <div className='w-full grid grid-cols-5 gap-4 mb-16'>
          {shopCategory.map((category, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer text-sm text-center border border-1  rounded-lg px-5 py-2 ${
                  activeCategory === index
                    ? ' bg-hightColor shadow-md text-white border-hightColor'
                    : 'text-black'
                }`}
                onClick={() => handleClick(index)}
              >
                {category.name}
              </div>
            );
          })}
        </div>
        <div className='w-full grid grid-cols-2 lg:grid-cols-4 mt-2 gap-8'>
          {shopItem.map((item, index) => {
            return (
              <div
                key={index}
                className='w-full flex items-center justify-between'
              >
                <div className='w-full flex flex-col items-center justify-center pt-4 shadow-md border border-1 border-[#ddd] rounded-lg'>
                  <img
                    src={item.image}
                    alt=''
                    className='h-[10rem] object-cover p-5'
                  />
                  <div className='w-full text-xs flex items-center justify-between gap-4 mt-4 bg-[#eee] py-2 px-3'>
                    <div className=''>{item.name}</div>
                    <div className=''>🧀{item.cheese}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-full flex items-center justify-center mt-14 '>
          <Buttons
            title='SHOP NOW'
            iconRight={<IoIosArrowForward />}
            iconStyles='text-xl font-semibold '
            containerStyles='flex items-center gap-2 p-2 md:p-3 mt-6 md:mt-6 text-sm border border-2 font-semibold  rounded-xl text-hightColor hover:bg-hightColor hover:border-hightColor hover:text-white shadow-md'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroShop;
