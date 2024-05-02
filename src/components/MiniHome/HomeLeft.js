import React, { useState } from 'react';
import { mateList } from '../../redux/tempData';
import Nothing from '../../assets/nothing.png';
import { Link } from 'react-router-dom';
import { RiArrowDownSFill } from 'react-icons/ri';
import Buttons from '../Buttons';
import { IoMdArrowDropright } from 'react-icons/io';

const HomeLeft = ({ user }) => {
  const [mateListOpen, toggleMateList] = useState(false);

  return (
    <div className='w-full h-full flex flex-col'>
      {/* banner */}
      <div className='w-full h-full flex flex-col justify-between'>
        <img
          src={Nothing}
          alt=''
          className='h-full items-center flex justify-center'
        />
        <Buttons
          title='Edit'
          containerStyles='h-fit flex justify-start my-1 -ml-1 text-[0.7rem] text-[#666]'
          iconLeft={<IoMdArrowDropright size={15} />}
          iconStyles='text-hightColor'
        />
      </div>
      <div className='w-full h-full flex flex-col justify-between'>
        <div className='h-full text-[0.8rem]'>History is Nothing.</div>
        <Buttons
          title='Edit'
          containerStyles='h-fit my-1 -ml-1 text-[0.7rem] text-[#666]'
          iconLeft={<IoMdArrowDropright size={15} />}
          iconStyles='text-hightColor'
        />
      </div>

      <hr className='w-full border-[#ccc] -mx-2' />

      {/* my info */}
      <div className='w-full h-full flex flex-col text-sm justify-end py-2'>
        <div className='w-full h-full flex items-center'>
          <div className='font-semibold'>{user.username}</div>
          <div className='mx-1'>·</div>
          <div className='text-[0.6rem]'>F</div>
          <div className='mx-1'>·</div>
          <div className='text-[0.6rem]'>1911-1-11</div>
        </div>

        <div className='text-sm flex flex-col items-center mt-2 '>
          <div className='w-full flex'>
            <div
              className='w-fit rounded-lg rounded-b-none text-[0.7rem] px-2 py-1
            border border-1 border-[#bbb] bg-[#ddd] cursor-pointer'
            >
              Owner
            </div>
            <div
              className='w-fit rounded-lg rounded-b-none text-[0.7rem] px-2 py-1
            text-[#bbb] border border-1 border-[#bbb] border-b-[#ddd] bg-[#fff] cursor-pointer'
            >
              Me
            </div>
          </div>

          {/* mate list */}
          <div
            className='relative w-full -mt-1 p-2 text-[0.7rem] rounded-md bg-[#ddd] border border-[#bbb] border-t-[#ddd] '
            onClick={() => toggleMateList(!mateListOpen)}
          >
            <div className='w-full pl-1 bg-[#98d1ff] flex items-center justify-between cursor-pointer'>
              <div className=''>My Mates -------</div>
              <RiArrowDownSFill
                size={20}
                className='border  bg-[#bbb] rounded-sm'
              />
              {mateListOpen && (
                <div className='absolute w-full h-20 overflow-y-auto top-8 -left-0 bg-white shadow-md rounded-md'>
                  {mateList.map((mate, index) => {
                    return (
                      <ul key={index} className='w-filt'>
                        <li className='hover:bg-[#f5f5f5] p-2'>
                          <Link to=''>
                            {mate.name} ({mate.nickname})
                          </Link>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
