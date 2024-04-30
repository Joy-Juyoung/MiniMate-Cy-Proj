import React, { useState } from 'react';
import BgImg from '../assets/pattern.png';
import OuterBox from '../assets/outerbox.png';
import MiniLeft from '../components/MiniHome/MiniLeft';
import MiniRight from '../components/MiniHome/MiniRight';

const MiniHome = () => {
  const [activeLink, setActiveLink] = useState(0);

  const handleClick = (index) => {
    setActiveLink(index === activeLink ? null : index);
  };

  console.log('index', activeLink);

  const navItems = [
    { name: 'Home' },
    { name: 'Photo' },
    { name: 'Diary' },
    { name: 'Visitor' },
  ];

  return (
    <div
      className='w-full h-screen flex items-center justify-center repeat bg-[#5f5f5f80]'
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '7%',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className='w-full h-[90%] flex'>
        <div
          className='w-[845px] h-full ml-6 rounded-lg relative'
          style={{
            backgroundImage: `url('${OuterBox}')`,
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
          }}
        >
          <div className='absolute right-0 top-20'>
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col cursor-pointer pl-5 pr-3 py-2 mb-1 w-[4.5rem] text-[0.8rem] rounded-md rounded-l-none border border-[#000] border-l-[0] ${
                  activeLink === index
                    ? 'bg-[#fff] text-[#000]'
                    : 'bg-[#38b6d8] text-[#fff]'
                }`}
                onClick={() => handleClick(index)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className='absolute left-10 top-10 flex items-center gap-1'>
            <MiniLeft />
            <MiniRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHome;
