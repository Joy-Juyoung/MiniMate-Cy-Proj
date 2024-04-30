import React from 'react';
import Buttons from '../Buttons';
import DropdownMenu from './DropdownMenu';
import { FaRegCircleUser } from 'react-icons/fa6';

const HeaderDropdown = ({
  isOpen,
  toggleDropdown,
  navigate,
  dispatch,
  dropdownRef,
  user,
}) => {
  return (
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
              onClick={() => toggleDropdown(!isOpen)}
            />
            <DropdownMenu
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
              navigate={navigate}
              dispatch={dispatch}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderDropdown;
