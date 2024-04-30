import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSideOpen, toggle }) => {
  return (
    <div
      isSideOpen={isSideOpen}
      onClick={toggle}
      className='flxed w-full h-full bg-[#0d0d0d] gird items-center top-0 left-0 ease-in-out-3000'
    >
      <div
        onClick={toggle}
        className='absolute top-20 right-5 bg-transparent text-white text-lg cursor-pointer'
      >
        <FaTimes />
      </div>
      <div className='text-white py-20 px-10'>
        <div className='w-full grid grid-cols-1 items-center cursor-pointer'>
          <Link
            to='/account'
            onClick={toggle}
            className='w-full items-center justify-center'
          >
            My Account
          </Link>
          <Link to='/shop' onClick={toggle}>
            Shop
          </Link>
          <Link to='' onClick={toggle}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
