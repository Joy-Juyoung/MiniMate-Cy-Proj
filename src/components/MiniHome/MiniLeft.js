import React, { useState } from 'react';
// import MiniBanner from '../../assets/together5.svg';
import Nothing from '../../assets/nothing.png';
import { Link } from 'react-router-dom';
import { RiArrowDownSFill } from 'react-icons/ri';

const MiniLeft = () => {
  const [mateListOpen, toggleMateList] = useState(false);

  return (
    <div className='flex-1'>
      <div className='flex items-center justify-center text-[11px] mb-2'>
        today 0 | total 0
      </div>
      <div className='w-full h-[440px] border border-1 border-[#ccc] rounded-md flex flex-col px-6 py-2'>
        <div className='w-full text-black h-[70%] flex flex-col text-xs -mx-2'>
          <div className='h-[50%] flex justify-center items-center'>
            <img
              src={Nothing}
              alt=''
              className='h-[100%] flex justify-center'
            />
          </div>
          <button className='flex justify-start my-2'>Eidt</button>
          <div className='h-[40%] flex justify-start'>History is Nothing.</div>
          <button className='flex justify-start my-2'>Eidt</button>
        </div>
        <hr className='border-[#ccc] -mx-2' />
        <div className='w-full h-[30%] '>
          <div className='mt-8 text-sm flex items-center'>
            <div className=''>Joy Lee</div>
            <div className='mx-1'>*</div>
            <div className=''>1911-1-11</div>
          </div>
          <div className='mt-4 text-sm flex items-center '>
            <div
              className='relative cursor-pointer w-full px-2 py-1 text-xs flex items-center justify-between rounded-md bg-[#cfd773]'
              onClick={() => toggleMateList(!mateListOpen)}
            >
              <div>My Mates ----------</div>
              <RiArrowDownSFill className='border border-[#666]' />
              {mateListOpen && (
                <div className='absolute h-24  overflow-y-auto top-7 -left-0 bg-white shadow-md rounded-md text-xs py-2'>
                  <ul className='w-[150px]'>
                    <li className='hover:bg-[#f5f5f5]  py-2 px-4'>
                      <Link to='/shop'>Jenny Park (BF)</Link>
                    </li>
                    <li className='hover:bg-[#f5f5f5]  py-2 px-4 '>
                      <button>Kevin Wang (Bro)</button>
                    </li>
                    <li className='hover:bg-[#f5f5f5]  py-2 px-4 '>
                      <button>Jhon Bob (God)</button>
                    </li>
                    <li className='hover:bg-[#f5f5f5]  py-2 px-4 '>
                      <button>Eddy deb (Angel)</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button className='mt-4 text-sm flex items-center'>
            Visit to Random mate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniLeft;
