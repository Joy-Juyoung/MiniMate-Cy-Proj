import React from 'react';
import Logo from '../assets/logo2.png';
import { MdHelpOutline } from 'react-icons/md';

const Footer = () => {
  return (
    <div className=' min-w-[1100px] flex items-center justify-center'>
      <div className='flex items-center justify-between min-w-[1100px]  h-full py-4 bg-[#fff]'>
        <div className=' flex items-center justify-center'>
          <MdHelpOutline className='mr-2 cursor-pointer' size={40} />
          {/* <div className=''>Help Center</div> */}
        </div>
        <div>TEAM BLINK © 2024</div>
        <div>
          <img src={Logo} alt='logo' className='w-10 h-10' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
