import React from 'react';
import Logo from '../assets/logo2.png';
import { MdHelpOutline } from 'react-icons/md';

const Footer = () => {
  return (
    <div className='flex items-center justify-between w-full h-full py-4 px-24 bg-[#fff]'>
      <div className='flex items-center'>
        <MdHelpOutline className='mr-2 cursor-pointer' size={40} />
        {/* <div className=''>Help Center</div> */}
      </div>
      <div>TEAM BLINK © 2024</div>
      <div>
        <img src={Logo} alt='logo' className='w-10 h-10' />
      </div>
    </div>
  );
};

export default Footer;
