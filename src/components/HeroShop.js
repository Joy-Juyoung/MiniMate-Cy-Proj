import React, { useState } from 'react';
import Shop1 from '../assets/shop1.gif';
import Shop2 from '../assets/shop2.gif';
import Shop3 from '../assets/shop5.gif';
import Shop4 from '../assets/shop6.gif';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';

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
    <div className='w-full flex flex-col items-center justify-center py-10 bg-secondary'>
      <div className='w-full px-0 lg:px-10 2xl:px-40'>
        {/* title */}
        <div className='mt-10 mb-16'>
          <div className='font-semibold text-xl md:text-3xl text-center'>
            BEST ITEMS
          </div>
          <div className='text-sm text-center'>Most popular on this week</div>
        </div>

        <div className='w-full grid grid-cols-5 gap-4 mb-16'>
          {shopCategory.map((category, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer shadow-md text-center border border-1 rounded-lg px-6 py-2 ${
                  activeCategory === index
                    ? 'border-none bg-black text-white'
                    : 'text-black'
                }`}
                onClick={() => handleClick(index)}
              >
                {category.name}
              </div>
            );
          })}
        </div>
        <div className='w-full flex items-center justify-between mt-2 gap-8'>
          {shopItem.map((item, index) => {
            return (
              <div
                key={index}
                className='w-full flex items-center justify-between'
              >
                <div className='w-full flex flex-col items-center justify-center py-4 bg-[#fff7f246] rounded-[40%] rounded-b-none shadow-md'>
                  <img
                    src={item.image}
                    alt=''
                    className='h-[200px] object-cover'
                  />
                  <div className='flex gap-4 mt-4'>
                    <div className='text-sm text-center'>{item.name}</div>
                    <div className='text-sm text-center'>🧀{item.cheese}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-full flex justify-center mt-14 mb-10 '>
          <Buttons
            title='SHOP NOW'
            containerStyles='p-4 bg-black text-white rounded-2xl hover:bg-white hover:border hover:border-1 hover:text-black'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroShop;
