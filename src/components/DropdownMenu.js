import React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../redux/userSlice';

const DropdownMenu = ({ isOpen, toggleDropdown, navigate, dispatch }) => {
  const listItemStyle = 'hover:bg-[#f5f5f5]  py-2 px-6';

  return (
    isOpen && (
      <div className='absolute top-8 right-0 bg-white shadow-md rounded-md text-sm py-2'>
        <ul className='w-[150px]'>
          <li className={listItemStyle}>
            <Link to='/shop'>Account</Link>
          </li>
          <li className={listItemStyle}>
            <button>My Cheese</button>
          </li>
          <li className={listItemStyle}>
            <button
              onClick={() => {
                dispatch(Logout());
                navigate('/');
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
