import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BgImg from '../../assets/pattern.png';
import OuterBox from '../../assets/outerbox.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { myHome, navItems } from '../../redux/tempData';
import Buttons from '../Buttons';
import { IoMdArrowDropright } from 'react-icons/io';
import { useEffect } from 'react';

const MiniHomeFrame = ({ LeftContent, RightContent, me, nav }) => {
  const { domain } = useParams();
  const navigate = useNavigate();
  console.log('domain', domain);

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
            {navItems.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/${domain}/${item.name.toLowerCase()}`)
                  }
                  className={`flex flex-col items-center justify-center cursor-pointer w-[4.3rem] mb-1 py-2 text-[0.8rem] rounded-md rounded-l-none border border-[#000] border-l-[0] ${
                    nav === item.name
                      ? 'bg-[#eeeeee] text-[#000]'
                      : 'bg-[#38b6d8] text-[#fff]'
                  }`}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className='w-[728px] flex flex-row gap-3 mx-9 my-10'>
            {/* Left */}
            <div className='basis-1/4 h-6'>
              <div className='h-full flex items-center justify-center text-[0.6rem] px-4'>
                <div className='h-full flex items-center justify-between'>
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
              <div className='relative w-full h-[440px] border border-1 border-[#ccc] rounded-md'>
                <div className='absolute w-full h-[440px] top-0 left-0 px-4 py-2'>
                  {LeftContent}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className='basis-3/4 h-6'>
              <div className='h-full flex items-center justify-between px-4'>
                <div className='h-full flex items-center '>
                  <div className='mr-2 text-sm'>{myHome.title}</div>
                  <Buttons
                    title='Edit'
                    containerStyles='h-fit -ml-1 text-[0.6rem] text-[#666]'
                    iconLeft={<IoMdArrowDropright size={15} />}
                    iconStyles='text-hightColor -mr-1'
                  />
                </div>

                <div className='text-[0.6rem]'>
                  http://localhost:3000/{me.domain}
                </div>
              </div>
              <div className='relative overflow-y-auto w-full h-[440px] border border-1 border-[#ccc] rounded-md flex flex-col px-4 py-2'>
                <div className='absolute w-full top-0 left-0 px-4 py-2'>
                  {RightContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHomeFrame;
