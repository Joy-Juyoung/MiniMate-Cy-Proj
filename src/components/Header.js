import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo2.png';
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
    <div className='header font-work w-full flex items-center justify-center py-4 bg-[#f7d24f] '>
      {/* Left */}
      <div className='min-w-[1100px] flex items-center justify-between '>
        <Link to='/' className='flex gap-3 items-center'>
          <div className='w-12 h-12  flex items-center'>
            <img src={Logo} alt='logo' />
          </div>

          <span className='text-xl font-semibold text-[#000]'>MINIMATE</span>
        </Link>

        {/* Center */}
        <div className='flex gap-3 items-center'>
          <Buttons
            onClick={() => navigate('/')}
            title='HOME'
            containerStyles={`text-lg font-semibold px-4 md:px-6 py-1 md:py-2
            hover:text-[#F37125] ${
              location.pathname === '/'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'text-ascent-1'
            }`}
          />
          <Buttons
            onClick={() => navigate('/shop')}
            title='SHOP'
            containerStyles={`text-lg font-semibold px-4 md:px-6 py-1 md:py-2
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
                containerStyles='text-sm font-semibold text-ascent-1 px-4 py-2 border-2 border-[#000] rounded-full'
              />
            ) : (
              <Buttons
                onClick={() => navigate('/login')}
                title='Log In'
                containerStyles='text-sm font-semibold text-ascent-1 px-4 py-2 border-2 border-[#000] rounded-full'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
