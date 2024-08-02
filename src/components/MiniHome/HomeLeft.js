import React, { useEffect, useState } from "react";
import { mateList } from "../../redux/tempData";
import Banner from "../../assets/main(5).jpg";
import { Link } from "react-router-dom";
import { RiArrowDownSFill } from "react-icons/ri";
import Buttons from "../Buttons";
import { IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../redux/userSlice";
import NoticeModal from "../Modal/NoticeModal";
import ManageBanner from "../Modal/ManageBanner";

const HomeLeft = ({ me, userHome, categories }) => {
  const dispatch = useDispatch();
  const [mateListOpen, toggleMateList] = useState(false);
  const [bannerOpen, toggleBannerOpen] = useState(false);
  // const { me } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchMe());
  // }, [dispatch]);

  // console.log("me", me);

  if (!me) {
    return <div>Loading...</div>; // 혹은 적절한 로딩 표시
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* banner */}
      <div className="w-full h-[40%] flex flex-col justify-between">
        <img
          src={Banner || userHome?.banner_photo}
          alt=""
          className="flex items-center justify-center object-cover object-top h-full"
        />
      </div>
      <div className="w-full h-[33%] flex flex-col justify-between">
        <div className="h-full text-[0.8rem] pt-2">
          {userHome?.banner_text_history[0].text}
        </div>
        <div className="flex items-center">
          <Buttons
            title="History & Manage"
            containerStyles="h-fit flex justify-start -ml-1 mr-2 mb-1 text-[0.6rem] text-[#666]"
            iconLeft={<IoMdArrowDropright size={15} />}
            iconStyles="text-hightColor -mr-1"
            onClick={() => {
              toggleBannerOpen(true);
            }}
          />
          {/* <Buttons
            title="History"
            containerStyles="h-fit -ml-1 text-[0.6rem] text-[#666]"
            iconLeft={<IoMdArrowDropright size={15} />}
            iconStyles="text-hightColor -mr-1"
          /> */}
        </div>
      </div>

      {bannerOpen && (
        <NoticeModal
          userHome={userHome}
          closeModal={() => {
            toggleBannerOpen(false);
          }}
        >
          <ManageBanner
            closeModal={() => toggleBannerOpen(false)}
            me={me}
            userHome={userHome}
          />
        </NoticeModal>
      )}

      <hr className="w-full h-[2%] border-[#ccc] -mx-2" />

      {/* my info */}
      <div className="h-[25%] ">
        <div className="w-full h-[100%] flex flex-col text-sm justify-end py-2">
          <div className="flex items-center w-full">
            <div className="font-semibold text-[0.7rem]">{me.username}</div>
            <div className="mx-1">·</div>
            <div className="text-[0.6rem]">
              {me.gender === "male" ? "M" : "F"}
            </div>
            <div className="mx-1">·</div>
            <div className="text-[0.6rem]">
              {me.birth.substring(0, me.birth.indexOf("T"))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-2 text-sm ">
            <div className="flex w-full">
              <div
                className={`w-fit rounded-lg rounded-b-none text-[0.7rem] px-2 py-1
            border border-1 border-[#bbb] bg-[#ddd] cursor-pointer
            ${me.domain && "hidden"}
            `}
              >
                Owner
              </div>
              <div
                className={`w-fit rounded-lg rounded-b-none text-[0.7rem] px-2 py-1
             cursor-pointer
            ${
              !me.domain
                ? "text-[#bbb] border border-1 border-[#bbb] border-b-[#ddd] bg-[#fff]"
                : " border border-1 border-[#bbb] bg-[#ddd]"
            }
            `}
              >
                Me
              </div>
            </div>

            {/* mate list */}
            <div
              className="relative w-full -mt-1 p-2 text-[0.7rem] rounded-md bg-[#ddd] border border-[#bbb] border-t-[#ddd] "
              onClick={() => toggleMateList(!mateListOpen)}
            >
              <div className="w-full pl-1 bg-[#bde2ff] flex items-center justify-between cursor-pointer">
                <div className="">My Mates -------</div>
                <RiArrowDownSFill
                  size={20}
                  className="border  bg-[#bbb] rounded-sm"
                />
                {mateListOpen && (
                  <div className="absolute w-full h-20 overflow-y-auto bg-white rounded-md shadow-md top-8 -left-0">
                    {me.best_friends.map((mate, index) => {
                      return (
                        <ul key={index} className="w-filt">
                          <li className="hover:bg-[#f5f5f5] p-2">
                            <Link to="">
                              {mate.friend.username} ({mate.friend_nick_name})
                            </Link>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
