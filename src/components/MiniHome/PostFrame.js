import React from 'react';
import { FaFolder } from 'react-icons/fa6';
// import { FaRegFolder } from 'react-icons/fa6';
// import { BsFolderFill } from 'react-icons/bs';

const PostFrame = ({ title, listStyles }) => {
  return (
    <div className=' text-[0.7rem]'>
      <div className='text-[#38b6d8] font-semibold'>PHOTO</div>
      <hr className='text-[#38b6d8] font-semibold my-1' />

      <div className='flex items-center '>
        <div className={`${listStyles} text-[#ead33c] mr-2`}>
          <FaFolder />
        </div>
        <div className=''>Public</div>
      </div>
    </div>
  );
};

export default PostFrame;
