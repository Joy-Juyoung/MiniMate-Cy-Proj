import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import AddedPoint from '../Modal/AddedPoint';
import NoticeModal from '../Modal/NoticeModal';

const DropdownMenu = ({ isOpen, toggleDropdown, navigate, me }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const listItemStyle = 'hover:bg-[#f5f5f5]  py-2 px-6 cursor-pointer';

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
    navigate('/');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
            My Account
          </li>
          <li className={listItemStyle}>
            <button
              onClick={() => {
                toggleDropdown(false);
                navigate('/mate');
              }}
            >
              My Mate
            </button>
          </li>
          <li className={listItemStyle}>
            <button onClick={openModal}>My Point</button>
          </li>
          <li className={listItemStyle}>
            <button onClick={handleLogout}>Log Out</button>
          </li>

          {modalOpen && (
            <NoticeModal closeModal={closeModal}>
              <AddedPoint closeModal={closeModal} navigate={navigate} me={me} />
            </NoticeModal>
          )}
        </ul>
      </div>
    )
  );
};

export default DropdownMenu;
