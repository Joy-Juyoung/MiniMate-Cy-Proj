import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';

const HeaderNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='hidden md:flex items-center justify-center'>
      <Buttons
        onClick={() => navigate('/')}
        title='HOME'
        containerStyles={`text-xl font-bold px-2 py-1
          hover:text-hightColor ${
            location.pathname === '/'
              ? 'text-hightColor underline underline-offset-8'
              : 'transparent'
          }`}
      />
      <Buttons
        onClick={() => navigate('/shop')}
        title='SHOP'
        containerStyles={`text-xl font-bold px-4 py-1
          hover:text-hightColor ${
            location.pathname === '/shop'
              ? 'text-hightColor underline underline-offset-8'
              : 'transparent'
          }`}
      />
    </div>
  );
};

export default HeaderNav;
