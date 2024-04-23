import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoDark from '../assets/logo-dark.png';
import { Logout } from '../redux/userSlice';
import { FaRegCircleUser, FaRegBell } from 'react-icons/fa6';
import { TbShoppingCart } from 'react-icons/tb';
import Buttons from './Buttons';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='header font-work w-full flex items-center justify-between py-6 px-24 bg-[#F1CE44] '>
      {/* Left */}
      <Link to='/' className='flex gap-3 items-center'>
        <div className='w-16 h-16  flex items-center'>
          <img src={LogoDark} alt='logo' />
        </div>

        <span className='text-2xl font-semibold text-[#F37125]'>MiniMate</span>
      </Link>

      {/* Center */}
      <div className='flex gap-3 items-center'>
        <Buttons
          onClick={() => navigate('/')}
          title='HOME'
          containerStyles={`text-xl font-semibold px-4 md:px-6 py-1 md:py-2
            hover:text-[#F37125] ${
              location.pathname === '/'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'text-ascent-1'
            }`}
        />
        <Buttons
          onClick={() => navigate('/shop')}
          title='SHOP'
          containerStyles={`text-xl font-semibold px-4 md:px-6 py-1 md:py-2
            hover:text-[#F37125] ${
              location.pathname === '/shop'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'text-ascent-1'
            }`}
        />
      </div>

      {/* Right */}
      <div className='flex gap-4 items-center text-ascent-1 text-xl md:text-2xl '>
        <div>
          <FaRegBell />
        </div>
        <div>
          <TbShoppingCart />
        </div>
        <div>
          <FaRegCircleUser />
        </div>

        <div>
          {!user ? (
            <Buttons
              onClick={() => dispatch(Logout())}
              title='Log Out'
              containerStyles='text-sm font-semibold text-ascent-1 px-4 md:px-6 py-1 md:py-2 border-2 border-[#666] rounded-full'
            />
          ) : (
            <Buttons
              onClick={() => navigate('/login')}
              title='Log In'
              containerStyles='text-sm font-semibold text-ascent-1 px-4 md:px-6 py-1 md:py-2 border-2 border-[#666] rounded-full'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
