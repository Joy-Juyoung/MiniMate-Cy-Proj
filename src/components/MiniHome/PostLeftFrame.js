import React, { useState } from 'react';
import { FaFolder } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';

const folderList = [
  {
    name: 'Public',
    access: 'public',
    category: 'Photo',
  },
  {
    name: '1',
    access: 'private',
    category: 'Photo',
  },
  {
    name: '2',
    access: 'public',
    category: 'Photo',
  },
];

const PostLeftFrame = ({ title, listStyles, onClick }) => {
  // const [isPrivat, setIsPrivate] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);

  const handleAddFolder = () => {
    setIsAddFolder(true);
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='text-[#38b6d8] font-semibold text-[0.7rem]'>PHOTO</div>
      <hr className='text-[#38b6d8] font-semibold my-1' />

      <div className='h-full flex flex-col justify-between'>
        <div>
          {folderList.map((folder, index) => {
            return (
              <div key={index} className='flex items-center text-[0.8rem] my-1'>
                <FaFolder
                  className={`${listStyles} mr-2 ${
                    folder.access === 'public'
                      ? 'text-[#ead33c]'
                      : 'text-[#bbb]'
                  }`}
                />
                <div className=''>{folder.name}</div>
              </div>
            );
          })}

          {/* <input type='text' placeholder={folder.name} /> */}
        </div>

        <div className='flex items-center justify-center text-[0.7rem] text-[#999]'>
          <div
            className='flex items-center cursor-pointer'
            onClick={() => handleAddFolder()}
          >
            <GoPlus className='mr-1 font-bold text-[0.8rem]' />
            <div className='hover:underline underline-offset-2'>Add</div>
          </div>
          <div className='mx-2'>|</div>
          <div className='flex items-center cursor-pointer'>
            <IoMdSettings className='mr-1 text-[0.8rem]' />
            <div className='hover:underline underline-offset-2'>Manage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLeftFrame;
