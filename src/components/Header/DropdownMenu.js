import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import AddedPoint from "../Modal/AddedPoint";
import NoticeModal from "../Modal/NoticeModal";

const DropdownMenu = ({ isOpen, toggleDropdown, navigate, me }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const listItemStyle = "hover:bg-[#f5f5f5]  py-2 px-6 cursor-pointer";

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    isOpen && (
      <div className="absolute right-0 py-2 text-sm bg-white rounded-md shadow-md top-8">
        <ul className="w-[150px]">
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              navigate("user/mate");
            }}
          >
            My Mate
          </li>
          <hr className="border border-[#eee] my-2" />
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              navigate("user/account");
            }}
          >
            My Account
          </li>
          <li
            className={listItemStyle}
            onClick={() => {
              toggleDropdown(false);
              navigate("user/history");
            }}
          >
            My History
          </li>

          <li className={listItemStyle} onClick={openModal}>
            My Point
          </li>
          <hr className="border border-[#eee] my-2" />
          <li className={listItemStyle} onClick={handleLogout}>
            Log Out
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
