import React, { useRef, useState } from 'react';
import { FaFolder } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { IoMdSave } from 'react-icons/io';

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
  const addRef = useRef();

  const handleAddFolder = () => {
    setIsAddFolder(!isAddFolder);
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
                <div className=' w-full'>{folder.name}</div>
              </div>
            );
          })}

          {isAddFolder && (
            <>
              <div className='flex w-full items-center text-[0.8rem] my-1'>
                <FaFolder className={`${listStyles} mr-2 text-[#ead33c]`} />
                <input
                  type='text'
                  className='border border-[#bbb] rounded-sm  w-full px-1 py-[0.1rem]'
                  ref={addRef}
                />
              </div>
              {/* <div>
                <div>Access</div>
              </div> */}
            </>
          )}
        </div>

        <div className='flex items-center justify-center text-[0.7rem] text-[#999]'>
          <div
            className='flex items-center cursor-pointer hover:underline underline-offset-2'
            onClick={() => handleAddFolder()}
          >
            {isAddFolder ? (
              <>
                <IoMdSave className='mr-1 font-bold text-[0.8rem]' /> Save
              </>
            ) : (
              <>
                <GoPlus className='mr-1 font-bold text-[0.8rem]' /> Add
              </>
            )}
          </div>
          <div className='mx-2'>|</div>
          <div className='flex items-center cursor-pointer'>
            <IoMdSettings className='mr-1 text-[0.8rem]' />
            <div className='hover:underline underline-offset-2'>Setting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLeftFrame;
