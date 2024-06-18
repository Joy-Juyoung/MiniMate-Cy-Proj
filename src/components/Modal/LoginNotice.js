import React from 'react';
import Buttons from '../Buttons';

const LoginNotice = ({ closeModal, navigate }) => {
  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>Login Required</h2>
      <p className='text-sm'>In order to open this page, you need to login.</p>
      <p className='text-sm mb-4'>Would you like to login now or later?</p>

      <div className='w-full flex items-center justify-end'>
        <Buttons
          onClick={closeModal}
          containerStyles='min-w-[80px] flex items-center justify-center px-4 py-3 text-sm border border-2   
          rounded-xl shadow-md border-[#f0f0f0] '
          title='Later'
        />
        <Buttons
          onClick={() => navigate('/login')}
          containerStyles='min-w-[80px] flex items-center justify-center px-4 py-3 text-sm border border-2   
          rounded-xl shadow-md border-[#f0f0f0] '
          title='Login Now'
        />
      </div>
    </>
  );
};

export default LoginNotice;
