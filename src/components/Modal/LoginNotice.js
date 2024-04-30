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
          containerStyles='flex items-center px-4 py-3 text-sm border border-2   
            rounded-xl shadow-md border-[#ddd] '
          title='Later'
        />
        <Buttons
          onClick={() => navigate('/login')}
          containerStyles='flex items-center px-4 py-3 ml-4 text-sm border border-2   
            rounded-xl bg-black border-black text-white shadow-md'
          title='Login Now'
        />
      </div>
    </>
  );
};

export default LoginNotice;
