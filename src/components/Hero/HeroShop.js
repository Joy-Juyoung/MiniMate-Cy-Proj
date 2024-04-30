// HeroShop 컴포넌트
import React, { useState } from 'react';
import Shop1 from '../../assets/shop1.gif';
import Shop2 from '../../assets/shop2.gif';
import Shop3 from '../../assets/shop5.gif';
import Shop4 from '../../assets/shop6.gif';
import Buttons from '../Buttons';
import { IoIosArrowForward } from 'react-icons/io';

const HeroShop = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleClick = (index) => {
    setActiveCategory(index === activeCategory ? null : index);
  };

  const shopItem = [
    { image: Shop1, name: 'Minime one', cheese: '30', category: 'Minime' },
    { image: Shop2, name: 'Minime one', cheese: '30', category: 'Minime' },
    { image: Shop3, name: 'Minime one', cheese: '30', category: 'Minime' },
    { image: Shop4, name: 'Minime one', cheese: '30', category: 'Minime' },
  ];

  const shopCategory = [
    { name: 'Minime' },
    { name: 'Miniroom' },
    { name: 'Skin' },
    { name: 'Music' },
    { name: 'Font' },
  ];

  return (
    <div className='w-full relative' style={{ zIndex: 1 }}>
      <div className='w-full flex flex-col items-center justify-center pb-14 bg-[#fff]'>
        <div className='w-full py-16 px-10 2xl:px-40'>
          <div className='w-full mb-12 flex flex-col items-center justify-center'>
            <div className='font-semibold text-lg text-center border-b-2 pb-1'>
              BEST ITEMS
            </div>
            <div className='text-sm text-center mt-2'>
              Most popular for this week
            </div>
          </div>

          <div className='w-full grid grid-cols-5 gap-4'>
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
          <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-8 my-14'>
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
                      className='w-[80%] text-xs flex flex-col py-3 px-3 mt-4 -mb-4 bg-white shadow-md
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
