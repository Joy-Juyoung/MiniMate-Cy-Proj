import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';

const DropdownMenu = ({ isOpen, toggleDropdown, navigate }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const listItemStyle = 'hover:bg-[#f5f5f5]  py-2 px-6 cursor-pointer';

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    isOpen && (
      <div className='absolute top-8 right-0 bg-white shadow-md rounded-md text-sm py-2'>
        <ul className='w-[150px]'>
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              navigate('/account');
            }}
          >
            Account
          </li>
          <li className={listItemStyle}>
            <button>My Cheese</button>
          </li>
          <li className={listItemStyle}>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      </div>
    )
  );
};

export default DropdownMenu;
