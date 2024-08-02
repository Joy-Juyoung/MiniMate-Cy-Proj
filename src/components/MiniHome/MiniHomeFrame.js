import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BgImg from "../../assets/pattern.png";
import OuterBox from "../../assets/outerbox.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { myHome, navItems } from "../../redux/tempData";
import Buttons from "../Buttons";
import { IoMdArrowDropright } from "react-icons/io";
import { useEffect } from "react";
import {
  fetchMinihome,
  fetchMinihomeByUsername,
} from "../../redux/miniHomeSlice";
import { fetchCategories } from "../../redux/categorySlice";
import { fetchUserItems } from "../../redux/userSlice";

const MiniHomeFrame = ({
  LeftContent,
  RightContent,
  me,
  userHome,
  categories,
}) => {
  const { domain } = useParams();
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-[#afafaf]"
      style={{
        backgroundImage: `url('${BgImg}')`,
        backgroundSize: "10%",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full h-[90%] flex">
        <div
          className="w-[845px] h-full ml-6 rounded-lg relative "
          style={{
            backgroundImage: `url('${OuterBox}')`,
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <div className="absolute right-0 top-20">
            {categories
              .filter((category) => category.kind === "Minihome Nav")
              .map((nav) => {
                return (
                  <div
                    key={nav._id}
                    onClick={() =>
                      navigate(`/${domain}/${nav.name.toLowerCase()}`)
                    }
                    className={`flex flex-col items-center justify-center cursor-pointer w-[4.3rem] mb-1 py-2 text-[0.8rem] rounded-md rounded-l-none border border-[#000] border-l-[0] ${
                      nav === nav.name
                        ? "bg-[#eeeeee] text-[#000]"
                        : "bg-[#38b6d8] text-[#fff]"
                    }`}
                  >
                    {nav.name}
                  </div>
                );
              })}
          </div>
          <div className="w-[728px] flex flex-row gap-3 mx-9 my-10">
            {/* Left */}
            <div className="h-6 basis-1/4">
              <div className="h-full flex items-center justify-center text-[0.6rem] px-4">
                <div className="flex items-center justify-between h-full">
                  <p>today view</p>
                  <p className="text-[#ff3737] ml-1 text-[0.8rem]">
                    {userHome?.total_view}
                  </p>
                </div>
                {/* <p className="mx-2">|</p>
                <div className="flex items-center justify-between">
                  <p>total</p>
                  <p className="ml-1 text-[0.8rem]">{myHome.total}</p>
                </div> */}
              </div>
              <div className="relative w-full h-[440px] border border-1 border-[#ccc] rounded-md">
                <div className="absolute w-full h-[440px] top-0 left-0 px-4 py-2">
                  {LeftContent}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="h-6 basis-3/4">
              <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center h-full ">
                  <div className="mr-2 text-sm">{userHome?.main_text}</div>
                  <Buttons
                    title="Edit"
                    containerStyles="h-fit -ml-1 text-[0.6rem] text-[#666]"
                    iconLeft={<IoMdArrowDropright size={15} />}
                    iconStyles="text-hightColor -mr-1"
                  />
                </div>

                <div className="text-[0.6rem]">{userHome?.url}</div>
              </div>
              <div className="relative overflow-y-auto w-full h-[440px] border border-1 border-[#ccc] rounded-md flex flex-col px-4 py-2">
                <div className="absolute top-0 left-0 w-full px-4 py-2">
                  {RightContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHomeFrame;
