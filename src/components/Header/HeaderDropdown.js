import React from "react";
import Buttons from "../Buttons";
import DropdownMenu from "./DropdownMenu";
import { FaRegCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const HeaderDropdown = ({
  isOpen,
  toggleDropdown,
  navigate,
  dispatch,
  dropdownRef,
  me,
}) => {
  const location = useLocation();
  return (
    <div ref={dropdownRef}>
      {!me ? (
        <Buttons
          onClick={() => navigate("/login")}
          title="Log In"
          containerStyles="text-sm font-semibold px-4 py-2 border-2 rounded-xl bg-black text-white hover:bg-white hover:text-black"
        />
      ) : (
        <>
          <div className="relative">
            <FaRegCircleUser
              // className='text-hightColor'

              className={`cursor-pointer ${
                isOpen || location.pathname.startsWith("/user")
                  ? "text-hightColor"
                  : ""
              }`}
              onClick={() => toggleDropdown(!isOpen)}
            />
            <DropdownMenu
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
              navigate={navigate}
              me={me}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderDropdown;
