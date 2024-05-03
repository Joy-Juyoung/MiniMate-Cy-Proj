import React, { useState } from 'react';
import { FaFolder } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

const folderList = [
  {
    name: 'Public',
    access: 'public',
    category: 'Photo',
  },
];

const PostFrame = ({ title, listStyles }) => {
  const [isPrivat, setIsPrivate] = useState(false);
  // const { location } = useParams();

  // console.log(location);

  return (
    <div className='text-[0.7rem]'>
      <div className='text-[#38b6d8] font-semibold'>PHOTO</div>
      <hr className='text-[#38b6d8] font-semibold my-1' />

      <div className='flex items-center text-[0.8rem] my-1'>
        <div
          className={`${listStyles} mr-2 ${
            !isPrivat ? 'text-[#ead33c]' : 'text-[#ddd]'
          }`}
        >
          <FaFolder />
        </div>
        <div className=''>Public</div>
      </div>
    </div>
  );
};

export default PostFrame;
