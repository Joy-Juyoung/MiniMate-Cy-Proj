import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSideOpen, toggle }) => {
  useEffect(() => {
    if (isSideOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSideOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white text-black grid items-center transition-transform duration-300 z-50 ${
        isSideOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
      } `}
      onClick={toggle}
    >
      <div
        onClick={toggle}
        className='absolute top-[24px] right-[24px] bg-transparent text-black text-xl cursor-pointer'
      >
        <FaTimes />
      </div>
      <div className='text-black py-20 px-10 w-full grid grid-cols-1 items-center  cursor-pointer'>
        <div className='w-full grid grid-cols-1 items-center justify-center cursor-pointer'>
          <Link
            to='/'
            onClick={toggle}
            className='w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]'
          >
            Home
          </Link>
          <Link
            to='/shop'
            onClick={toggle}
            className='w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]'
          >
            Shop
          </Link>

          <Link
            to='/account'
            onClick={toggle}
            className='w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]'
          >
            My Account
          </Link>

          <Link
            to='/cart'
            onClick={toggle}
            className='w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]'
          >
            Cart
          </Link>
          <Link
            to=''
            onClick={toggle}
            className='w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]'
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
