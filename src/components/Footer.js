import React from 'react';
import Logo from '../assets/logo2.png';
import { MdHelpOutline } from 'react-icons/md';
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <div className='w-full flex items-center justify-between py-4 px-10 2xl:px-40'>
      <div className='text-sm'>TEAM BLINK © 2024</div>
      <div className='flex items-center'>
        <button className='mr-4'>
          <MdHelpOutline className='' size={40} />
        </button>
        {/* <button className='mr-4' onClick={toggleHome}>
          Top
        </button> */}
        <button className=''>
          <img
            src={Logo}
            alt='logo'
            className='w-10 h-10'
            onClick={toggleHome}
          />
        </button>
      </div>
    </div>
  );
};

export default Footer;
