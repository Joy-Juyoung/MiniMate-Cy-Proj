import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo2.png';
import NoticeModal from '../Modal/NoticeModal';
import LoginNotice from '../Modal/LoginNotice';
import HeaderNav from './HeaderNav';
import HeaderDropdown from './HeaderDropdown';
import { FaRegBell } from 'react-icons/fa6';
import { TbShoppingCart } from 'react-icons/tb';
import { MdMenu } from 'react-icons/md';
import Sidebar from './Sidebar';

const Header = ({ me }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);
  const [isSideOpen, setIsSideOpen] = useState(false);

  const toggle = () => {
    setIsSideOpen(!isSideOpen);
  };

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
      document.body.style.overflow = 'auto';
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

  const handleIconClick = () => {
    if (!me) {
      openModal();
    } else {
      navigate('/shop');
    }
  };

  return (
    <>
      {modalOpen && (
        <NoticeModal closeModal={closeModal}>
          <LoginNotice closeModal={closeModal} navigate={navigate} />
        </NoticeModal>
      )}

      <div
        className='header font-work w-full h-full flex items-center justify-between py-3 
        md:py-6 px-10 sm:px-20 md:px-40'
        style={{
          backgroundColor: scrollNav
            ? 'rgba(255, 255, 255, 0.9)'
            : 'transparent',
        }}
      >
        <div
          onClick={() => navigate('/')}
          className='flex gap-2 items-center cursor-pointer'
        >
          <div className='w-12 h-12 md:w-14 md:h-14 flex items-center'>
            <img src={Logo} alt='logo' />
          </div>
          <span className='text-xl md:text-2xl text-black font-semibold'>
            MINIMATE
          </span>
        </div>

        <div className='hidden md:flex gap-4 items-center text-xl md:text-2xl'>
          <HeaderNav location={location} navigate={navigate} />

          <div className='-ml-4'>|</div>

          {/* <button
            onClick={() => {
              !me ? openModal() : navigate('/shop');
            }}
            className='active:text-hightColor'
          >
            <FaRegBell />
          </button> */}
          <button
            onClick={() => {
              !me ? openModal() : navigate('/cart');
            }}
            className='active:text-hightColor'
          >
            <TbShoppingCart />
          </button>

          <HeaderDropdown
            dropdownRef={dropdownRef}
            isOpen={dropdownOpen}
            toggleDropdown={setDropdownOpen}
            navigate={navigate}
            dispatch={dispatch}
            me={me}
          />
        </div>

        <div className='flex md:hidden text-2xl'>
          <button onClick={toggle} className=''>
            <MdMenu className='' />
          </button>
        </div>
      </div>

      <Sidebar isSideOpen={isSideOpen} toggle={toggle} />
    </>
  );
};

export default Header;
