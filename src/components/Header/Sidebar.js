import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NoticeModal from "../Modal/NoticeModal";
import AddedPoint from "../Modal/AddedPoint";
import Buttons from "../Buttons";
import { logoutUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = ({ isSideOpen, toggle, me }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("me", me);

  useEffect(() => {
    if (isSideOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSideOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.reload();
    navigate("/");
    toggle();
  };

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

          <Link
            to="/user/account"
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

          <div
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center justify-center py-4 hover:bg-[#f5f5f5] border-b-2 border-[#f5f5f5]"
          >
            My Point
          </div>

          {!me ? (
            <Buttons
              onClick={() => {
                navigate("/login");
                toggle();
              }}
              title="Log In"
              containerStyles="w-fit m-auto mt-16 text-sm font-semibold px-4 py-2 border-2 rounded-xl hover:bg-black hover:text-white bg-white text-black"
            />
          ) : (
            <Buttons
              onClick={handleLogout}
              title="Log Out"
              containerStyles="w-fit m-auto mt-16 text-sm font-semibold px-4 py-2 border-2 rounded-xl hover:bg-black hover:text-white bg-white text-black"
            />
          )}
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
