// HomeLeft.js
import React, { useRef, useState } from "react";
import BannerDefault from "../../assets/defaultUI.png";
import { IoMdArrowDropright } from "react-icons/io";
import { RiArrowDownSFill } from "react-icons/ri";
import Buttons from "../Buttons";
import NoticeModal from "../Modal/NoticeModal";
import ManageBanner from "../Modal/ManageBanner";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { openPopup } from "../utils";

const HomeLeft = ({ me, userHome, updateUserHome, user }) => {
  const linkRef = useRef(null);
  const userRef = useRef(null);
  const [mateListOpen, toggleMateList] = useState(false);
  const [bannerOpen, toggleBannerOpen] = useState(false);
  const [clickMe, setClickMe] = useState(false);

  const linkToFind = () => {
    openPopup("/mate/find", linkRef);
  };

  const handleClickList = (name) => {
    // const popupUrl = `http://localhost:3000/${name}/home`;
    const popupUrl = `https://minimate-cy.netlify.app/${name}/home`;
    openPopup(popupUrl, userRef);
  };

  if (!user) {
    return <div>Loading...</div>; // 혹은 적절한 로딩 표시
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* banner */}
      <div className="w-full h-[40%] flex flex-col justify-between">
        <img
          src={userHome?.banner_photo || BannerDefault}
          alt="Banner"
          className="flex items-center justify-center object-cover object-top h-full"
        />
      </div>
      <div className="w-full h-[33%] flex flex-col justify-between">
        <div className="h-full text-[0.8rem] pt-2">
          {userHome?.banner_text_history[0]?.text}
        </div>
        {user?.domain === me?.domain && (
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
          </div>
        )}
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
            user={user}
            userHome={userHome}
            updateUserHome={updateUserHome}
          />
        </NoticeModal>
      )}

      <hr className="w-full h-[2%] border-[#ccc] -mx-2" />

      {/* my info */}
      <div className="h-[25%] ">
        <div className="w-full h-[100%] flex flex-col text-sm justify-end py-2">
          <div className="flex items-center w-full">
            <div className="font-semibold text-[0.7rem]">{user?.username}</div>
            <div className="mx-1">·</div>
            <div className="text-[0.6rem]">
              {user?.gender === "male" ? "M" : "F"}
            </div>
            <div className="mx-1">·</div>
            <div className="text-[0.6rem]">
              {user?.birth.substring(0, me?.birth.indexOf("T"))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-2 text-sm ">
            <div className="flex w-full">
              <div
                className={`w-fit rounded-lg rounded-b-none text-[0.7rem] px-2 py-1
            border border-1 border-[#bbb] bg-[#ddd] cursor-pointer 
            ${user?.domain === me?.domain && "hidden"}      
             ${
               user?.domain !== me?.domain &&
               clickMe &&
               "text-[#bbb] border border-1 border-[#bbb] border-b-[#ddd] bg-[#fff]"
             }      
            `}
                onClick={() => {
                  setClickMe(false);
                }}
              >
                Owner
              </div>
              <div
                className={`w-fit rounded-lg rounded-b-none text-[0.7rem] px-2 py-1
            border border-1 border-[#bbb] bg-[#ddd] cursor-pointer 
            ${
              user?.domain !== me?.domain &&
              !clickMe &&
              "text-[#bbb] border border-1 border-[#bbb] border-b-[#ddd] bg-[#fff]"
            }
            ${
              (user?.domain !== me?.domain && clickMe) ||
              (user?.domain === me?.domain &&
                " border border-1 border-[#bbb] bg-[#ddd]")
            }
         
            `}
                onClick={() => {
                  setClickMe(true);
                }}
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
                <div className="">Mate List -------</div>
                <RiArrowDownSFill
                  size={20}
                  className="border bg-[#bbb] rounded-sm"
                />
                {mateListOpen && (
                  <div className="absolute w-full overflow-y-auto bg-white rounded-md shadow-md top-8 -left-0">
                    {clickMe ? (
                      <>
                        {me?.best_friends.length === 0 ? (
                          <>
                            <div className="p-4 ">
                              <p>You have 0 mate</p>
                              <p
                                onClick={linkToFind}
                                className="flex items-center gap-1 underline text-[#2253cf] cursor-pointer"
                              >
                                <span>Go to find mate</span>
                                <FaArrowUpRightFromSquare size={10} />
                              </p>
                            </div>
                          </>
                        ) : (
                          me?.best_friends.map((mate, index) => {
                            return (
                              <ul key={index} className="">
                                <li
                                  className="hover:bg-[#f5f5f5] p-2"
                                  onClick={() =>
                                    handleClickList(mate.friend.username)
                                  }
                                >
                                  {mate?.friend.username} (
                                  {mate?.friend_nick_name})
                                </li>
                              </ul>
                            );
                          })
                        )}
                      </>
                    ) : (
                      <>
                        {user?.best_friends.length === 0 ? (
                          <>
                            <div className="p-4 ">
                              <p>You have 0 mate</p>
                              <p
                                onClick={linkToFind}
                                className="flex items-center gap-1 underline text-[#2253cf] cursor-pointer"
                              >
                                <span>Go to find mate</span>
                                <FaArrowUpRightFromSquare size={10} />
                              </p>
                            </div>
                          </>
                        ) : (
                          user?.best_friends.map((mate, index) => {
                            return (
                              <ul key={index} className="">
                                <li
                                  className="hover:bg-[#f5f5f5] p-2"
                                  onClick={() =>
                                    handleClickList(mate?.friend.username)
                                  }
                                >
                                  {mate?.friend.username} (
                                  {mate?.friend_nick_name})
                                </li>
                              </ul>
                            );
                          })
                        )}
                      </>
                    )}
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
