import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NoticeModal from "../Modal/NoticeModal";
import AddedPoint from "../Modal/AddedPoint";

const Sidebar = ({ isSideOpen, toggle, me }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSideOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSideOpen]);

  // const openModal = () => {
  //   // toggle();
  //   setModalOpen(true);
  // };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white text-black grid items-center transition-transform duration-300 z-50 ${
        isSideOpen ? "transform translate-y-0" : "transform -translate-y-full"
      } `}
      // onClick={toggle}
    >
      <div
        onClick={toggle}
        className="absolute top-[24px] right-[24px] bg-transparent text-black text-xl cursor-pointer"
      >
        <FaTimes />
      </div>
      <div className="grid items-center w-full grid-cols-1 px-10 py-20 text-black cursor-pointer">
        <div className="grid items-center justify-center w-full grid-cols-1 cursor-pointer">
          <Link
            to="/"
            onClick={toggle}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={toggle}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            Shop
          </Link>

          <Link
            to="/account"
            onClick={toggle}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            My Account
          </Link>

          <Link
            to="/mate/find"
            onClick={toggle}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            My Mate
          </Link>

          <Link
            to="/cart"
            onClick={toggle}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            Cart
          </Link>

          <Link
            to="/user/history"
            onClick={toggle}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            Order History
          </Link>

          <div
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            My Point
          </div>

          <Link
            to=""
            onClick={toggle}
            className="flex items-center justify-center p-4 m-auto mt-16 rounded-lg w-fit hover:font-semibold"
          >
            Log out
          </Link>
        </div>
      </div>
      {modalOpen && (
        <NoticeModal closeModal={closeModal}>
          <AddedPoint closeModal={closeModal} navigate={navigate} me={me} />
        </NoticeModal>
      )}
    </div>
  );
};

export default Sidebar;
