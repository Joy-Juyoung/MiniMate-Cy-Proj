import React from 'react';
import Logo from '../assets/logo2.png';
import { MdHelpOutline } from 'react-icons/md';

const Footer = () => {
  return (
    <div className='w-full flex items-center justify-between py-4 px-0 lg:px-10 2xl:px-40'>
      <button className=' '>
        <MdHelpOutline className='' size={40} />
      </button>
      <div className=''>TEAM BLINK © 2024</div>
      <div className=' '>
        <img src={Logo} alt='logo' className='w-10 h-10' />
      </div>
    </div>
  );
};

export default Footer;
