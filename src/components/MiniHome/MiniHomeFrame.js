import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BgImg from '../../assets/pattern.png';
import OuterBox from '../../assets/outerbox.png';

import { useParams } from 'react-router-dom';
import { myHome, navItems } from '../../redux/tempData';

const MiniHomeFrame = ({ LeftContent, RightContent }) => {
  const { domain } = useParams(); // 이메일 파라미터 가져오기
  const { user } = useSelector((state) => state.user);
  const [activeLink, setActiveLink] = useState(1);

  const handleClick = (id) => {
    setActiveLink(id === activeLink ? null : id);
  };

  return (
    <div
      className='w-full h-screen flex items-center justify-center bg-[#afafaf]'
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: '10%',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className='w-full h-[90%] flex'>
        <div
          className='w-[845px] h-full ml-6 rounded-lg relative '
          style={{
            backgroundImage: `url('${OuterBox}')`,
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
          }}
        >
          <div className='absolute right-0 top-20'>
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center cursor-pointer w-[4.3rem] mb-1 py-2 text-[0.8rem] rounded-md rounded-l-none border border-[#000] border-l-[0] ${
                  activeLink === item.id
                    ? 'bg-[#eeeeee] text-[#000]'
                    : 'bg-[#38b6d8] text-[#fff]'
                }`}
                onClick={() => handleClick(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className='w-[728px] flex flex-row gap-3 mx-9 my-10'>
            {/* Left */}
            <div className='basis-1/4 h-6'>
              <div className='h-full flex items-center justify-center text-[0.6rem] px-4'>
                <div className='flex items-center justify-between'>
                  <p>today</p>
                  <p className='text-[#ff3737] ml-2 text-[0.8rem]'>
                    {myHome.today}
                  </p>
                </div>
                <p className='mx-2'>|</p>
                <div className='flex items-center justify-between'>
                  <p>total</p>
                  <p className='ml-2 text-[0.8rem]'>{myHome.total}</p>
                </div>
              </div>
              <div className='w-full h-[440px] border border-1 border-[#ccc] rounded-md flex flex-col px-4 py-2'></div>
              {LeftContent}
            </div>

            {/* Right */}
            <div className='basis-3/4 h-6'>
              <div className='flex items-center justify-between px-4'>
                <div className='h-full flex items-center '>{myHome.title}</div>
                <div className='text-[0.6rem]'>
                  http://localhost:3000/minihome/
                  {!myHome.domain ? user.username : myHome.domain}/home
                </div>
              </div>
              <div className='overflow-y-auto w-full h-[440px] border border-1 border-[#ccc] rounded-md flex flex-col px-4 py-2'></div>
              <div>{RightContent}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHomeFrame;
