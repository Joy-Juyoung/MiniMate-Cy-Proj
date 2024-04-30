import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../redux/userSlice';
import Buttons from './Buttons';
import Logo from '../assets/logo2.png';
import { FaRegCircleUser, FaRegBell } from 'react-icons/fa6';
import { TbShoppingCart } from 'react-icons/tb';
import { MdMenu } from 'react-icons/md';
import DropdownMenu from './DropdownMenu';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  return (
    <div
      className='header font-work w-full flex items-center justify-between py-3 md:py-6 px-10 2xl:px-40'
      style={{
        backgroundColor: scrollNav ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      }}
    >
      <Link to='/' className='flex gap-2 items-center'>
        <div className='w-12 h-12 md:w-14 md:h-14 flex items-center p-1 md:p-2'>
          <img src={Logo} alt='logo' />
        </div>
        <span className='text-xl md:text-2xl text-black font-semibold'>
          MINIMATE
        </span>
      </Link>

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

      <div className='hidden md:flex gap-4 items-center text-xl md:text-2xl'>
        <button>
          <FaRegBell />
        </button>
        <button>
          <TbShoppingCart />
        </button>

        <div>
          {!user ? (
            <Buttons
              onClick={() => navigate('/login')}
              title='Log In'
              containerStyles='text-sm font-semibold text-ascent-1 px-4 py-2 border-2 border-[#000] rounded-full'
            />
          ) : (
            <>
              <div className='relative'>
                <FaRegCircleUser
                  className='cursor-pointer'
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                <DropdownMenu
                  isOpen={dropdownOpen}
                  toggleDropdown={setDropdownOpen}
                  navigate={navigate}
                  dispatch={dispatch}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className='flex md:hidden text-2xl'>
        <button>
          <MdMenu />
        </button>
      </div>
    </div>
  );
};

export default Header;
