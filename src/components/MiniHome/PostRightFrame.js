import React from 'react';
import { GoPlus } from 'react-icons/go';

const PostRightFrame = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex justify-end'>
        <button className='flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-2 '>
          <GoPlus />
          Upload
        </button>
      </div>
      <div className='h-full'>
        <hr className='text-[#bbb]' />
        <div className='h-full my-2'>picture</div>
        <hr className='text-[#bbb]' />
      </div>
    </div>
  );
};

export default PostRightFrame;
