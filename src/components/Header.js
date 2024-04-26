import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo2.png';
import { Logout } from '../redux/userSlice';
import { FaRegCircleUser, FaRegBell } from 'react-icons/fa6';
import { TbShoppingCart } from 'react-icons/tb';
import Buttons from './Buttons';
import { useState } from 'react';
// import Dropdown from './Dropdown';
import { MdMenu } from 'react-icons/md';
import { animateScroll as scroll } from 'react-scroll';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, toggleDropdown] = useState(false);

  // console.log(dropdownOpen);

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  // console.log(scrollNav);
  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    // <div
    //   className='header font-work w-full flex items-center justify-between
    // py-3 md:py-6 px-0 lg:px-10 pb-20 2xl:px-40 transparent'
    // >
    <div
      className='header font-work w-full flex items-center justify-between py-3 md:py-6 px-0 lg:px-10 2xl:px-40'
      style={{
        backgroundColor: scrollNav ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
      }}
    >
      {/* Left */}
      <Link to='/' className='flex gap-2 items-center'>
        <div className='w-12 h-12 md:w-14 md:h-14 flex items-center p-1 md:p-2'>
          <img src={Logo} alt='logo' />
        </div>
        <span className='text-xl md:text-2xl text-black font-semibold'>
          MINIMATE
        </span>
      </Link>

      {/* Center */}
      <div className='hidden md:flex items-center justify-center'>
        <Buttons
          onClick={() => navigate('/')}
          title='HOME'
          containerStyles={`text-xl font-bold px-2 py-1
            hover:text-[#F37125] ${
              location.pathname === '/'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'transparent'
            }`}
        />
        <Buttons
          onClick={() => navigate('/shop')}
          title='SHOP'
          containerStyles={`text-xl font-bold px-4 py-1
            hover:text-[#F37125] ${
              location.pathname === '/shop'
                ? 'text-[#F37125] underline underline-offset-8'
                : 'transparent'
            }`}
        />
      </div>

      {/* Right */}
      <div className='hidden md:flex gap-4 items-center text-xl md:text-2xl '>
        <button>
          <FaRegBell />
        </button>
        <button>
          <TbShoppingCart />
        </button>
        <button
          className='relative'
          onClick={() => toggleDropdown(!dropdownOpen)}
        >
          <FaRegCircleUser />
          {dropdownOpen && (
            <div className='absolute top-10 right-0 bg-white shadow-md rounded-md text-sm py-2'>
              <ul className='w-[150px]'>
                <li className='hover:bg-[#f5f5f5]  py-2 px-6 '>
                  <Link to='/shop'>Account</Link>
                </li>
                <li className='hover:bg-[#f5f5f5]  py-2 px-6 '>
                  <button>My Cheese</button>
                </li>
                <li className='hover:bg-[#f5f5f5] py-2 px-6 '>
                  <button onClick={() => dispatch(Logout())}>Log Out</button>
                </li>
              </ul>
            </div>
          )}
        </button>

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

      {/* md screen menu */}
      <div className='flex md:hidden text-2xl'>
        <button>
          <MdMenu />
        </button>
      </div>
    </div>
  );
};

export default Header;
