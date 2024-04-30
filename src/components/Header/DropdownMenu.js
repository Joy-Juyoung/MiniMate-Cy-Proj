import React from 'react';
import { Logout } from '../../redux/userSlice';

const DropdownMenu = ({ isOpen, toggleDropdown, navigate, dispatch }) => {
  const listItemStyle = 'hover:bg-[#f5f5f5]  py-2 px-6 cursor-pointer';

  return (
    isOpen && (
      <div className='absolute top-8 right-0 bg-white shadow-md rounded-md text-sm py-2'>
        <ul className='w-[150px]'>
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              navigate('/shop');
            }}
          >
            Account
          </li>
          <li className={listItemStyle}>
            <button>My Cheese</button>
          </li>
          <li className={listItemStyle}>
            <button
              onClick={() => {
                dispatch(Logout());
                navigate('/');
                toggleDropdown(false);
              }}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    )
  );
};

export default DropdownMenu;
