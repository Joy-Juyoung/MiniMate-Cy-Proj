import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '../redux/userSlice';
import Buttons from './Buttons';
import Logo from '../assets/logo2.png';
import { FaRegCircleUser, FaRegBell } from 'react-icons/fa6';
import { TbShoppingCart } from 'react-icons/tb';
import { MdMenu } from 'react-icons/md';
import DropdownMenu from './DropdownMenu';
import NoticeModal from './Modal/NoticeModal';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
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
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBellClick = () => {
    if (!user) {
      openModal();
    } else {
      console.log('no user');
    }
  };

  return (
    <>
      {modalOpen && (
        <NoticeModal closeModal={closeModal}>
          <h2 className='text-2xl font-bold mb-4'>Login Required</h2>
          <p className='text-sm '>
            In order to open this page, you need to login.
          </p>
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
            rounded-xl bg-hightColor border-hightColor text-white shadow-md'
              title='Login Now'
            />
          </div>
        </NoticeModal>
      )}
      <div
        className='header font-work w-full flex items-center justify-between py-3 md:py-6 px-10 2xl:px-40'
        style={{
          backgroundColor: scrollNav
            ? 'rgba(255, 255, 255, 0.9)'
            : 'transparent',
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
          <button onClick={handleBellClick}>
            <FaRegBell />
          </button>
          <button>
            <TbShoppingCart />
          </button>

          <div ref={dropdownRef}>
            {!user ? (
              <Buttons
                onClick={() => navigate('/login')}
                title='Log In'
                containerStyles='text-sm font-semibold px-4 py-2 border-2 rounded-xl bg-black text-white hover:bg-white hover:text-black'
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
    </>
  );
};

export default Header;
