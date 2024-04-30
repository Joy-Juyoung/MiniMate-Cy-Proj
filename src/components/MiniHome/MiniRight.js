import React from 'react';
import { Link } from 'react-router-dom';
import Miniroom from '../../assets/shop3.gif';
import Minime from '../../assets/shop1.gif';

const MiniRight = () => {
  return (
    <div className='flex-2'>
      <div className='flex items-center text-sm font-semibold mb-1 ml-4'>
        Joy's Minihome
      </div>
      <div className=' overflow-y-auto w-[530px] h-[440px] border border-1 border-[#ccc] rounded-md flex flex-col px-4 py-2'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='text-[#38b6d8] text-[11px] font-semibold'>
              Update news
            </div>
            <hr className='border-[#ccc]' />
            <div>
              <ul className='text-[12px] list-disc ml-4 '>
                <li className='mt-1'>New Post1</li>
                <li className='mt-1'>New Post2</li>
                <li className='mt-1'>New Post3</li>
                <li className='mt-1'>New Post4</li>
              </ul>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-[0.1rem] text-[12px] mt-4 text-[#2c509a] items-center  '>
            <div className='bg-[#ddd] h-full flex justify-between items-center px-2'>
              <div>Diary</div>
              <div>0/175</div>
            </div>
            <div className='bg-[#ddd] h-full flex justify-between items-center px-2'>
              <div>Diary</div>
              <div>0/175</div>
            </div>
            <div className='bg-[#ddd] h-full flex justify-between items-center px-2'>
              <div>Diary</div>
              <div>0/175</div>
            </div>
            <div className='bg-[#ddd] h-full flex justify-between items-center px-2'>
              <div>Diary</div>
              <div>0/175</div>
            </div>
            <div className='bg-[#ddd] h-full flex justify-between items-center px-2'>
              <div>Diary</div>
              <div>0/175</div>
            </div>
            <div className='bg-[#ddd] h-full flex justify-between items-center px-2'>
              <div>Diary</div>
              <div>0/175</div>
            </div>
          </div>
        </div>
        <div className='text-[#38b6d8] text-[11px] font-semibold mt-4'>
          Miniroom
        </div>
        <hr className='border-[#ccc]' />
        <div className='relative'>
          <img src={Miniroom} alt='' className='w-full object-cover my-2 ' />
          <img
            src={Minime}
            alt=''
            className='object-cover my-2 absolute top-20 left-3 w-[70px]'
          />
        </div>
        <div className='text-[#38b6d8] text-[11px] font-semibold '>
          What is mates say
        </div>
        <hr className='border-[#ccc]' />
        <div className='text-[14px] mx-2 '>
          <div className='flex items-center my-1'>
            <div>
              Hi HEllloooooo (God{' '}
              <Link className='text-[#2c509a]'>Jhon Bob</Link>)
            </div>
            <div className='text-[11px] text-[#959595] ml-2'>2024.03.28</div>
          </div>
          <hr className='border-[#ddd]' />
          <div className='flex items-center my-1'>
            <div>
              Hi HEllloooooo (God{' '}
              <Link className='text-[#2c509a]'>Jhon Bob</Link>)
            </div>
            <div className='text-[11px] text-[#959595] ml-2'>2024.03.28</div>
          </div>
          <hr className='border-[#ddd]' />
          <div className='flex items-center my-1'>
            <div>
              Hi HEllloooooo (God{' '}
              <Link className='text-[#2c509a]'>Jhon Bob</Link>)
            </div>
            <div className='text-[11px] text-[#959595] ml-2'>2024.03.28</div>
          </div>
          <hr className='border-[#ddd]' />
        </div>
      </div>
    </div>
  );
};

export default MiniRight;
