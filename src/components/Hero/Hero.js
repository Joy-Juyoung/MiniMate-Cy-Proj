import React, { useEffect, useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import Buttons from "../Buttons";
import { FaArrowRight } from "react-icons/fa6";
import { miniInfo, myHome } from "../../redux/tempData";
import { useNavigate } from "react-router-dom";

const Hero = ({ me }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // console.log('me', me);

  const openPopup = () => {
    if (!popupRef.current || popupRef.current.closed) {
      if (me) {
        const userDomain = me?.domain;
        // const popupUrl = `http://localhost:3000/${userDomain}/home`;
        // const popupUrl = `https://minimate-cy.netlify.app/${userDomain}/home`;
        const popupUrl = `${userDomain}/home`;
        const popupWidth = 1100;
        const popupHeight = 600;

        // 브라우저 창의 위치와 크기 가져오기
        const screenLeft =
          window.screenLeft !== undefined
            ? window.screenLeft
            : window.screen.left;
        const screenTop =
          window.screenTop !== undefined ? window.screenTop : window.screen.top;

        const screenWidth = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : window.screen.width;

        // 팝업 창을 화면의 가로 중앙과 세로 상단에 위치시키기 위한 좌표 계산
        const left = screenLeft + screenWidth / 2 - popupWidth / 2;
        const top = screenTop + 0; // 세로 상단에 위치

        const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;
        popupRef.current = window.open(popupUrl, "_blank", popupFeatures);
      }
    } else {
      popupRef.current.focus();
    }
  };

  return (
    <div className="h-[50vh] px-10 sm:px-20 md:px-40 flex items-center">
      <div className="flex flex-col items-center justify-center w-full h-full ">
        <div className="flex flex-col items-center w-full ">
          <div className="w-full text-3xl font-bold text-center font-acme md:text-5xl sm:text-4xl md:mb-2 ">
            Create your own Mini Home
          </div>

          <div className="hidden w-full mt-2 text-sm text-center lg:w-1/2 md:text-md md:mt-3 sm:flex">
            Discover your perfect match, and personalize your own mini room
            haven with a unique name and a brand-new skin!
          </div>
        </div>

        {!me ? (
          <div className="flex items-center justify-center w-full my-3 sm:my-8">
            <Buttons
              onClick={() => navigate("/login")}
              title="GET START"
              iconRight={<FaArrowRight />}
              iconStyles="text-xl font-semibold "
              containerStyles="flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md border border-2 font-semibold  
            rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center w-full ">
              <img
                src={
                  !me?.minime_img
                    ? me?.gender === "male"
                      ? MinniMale
                      : MinniFemale
                    : me?.minime_img
                }
                alt="Minime"
                className="w-[20rem] h-[15rem] drop-shadow-xl object-contain"
              />
            </div>
            <div className="flex items-center justify-center w-full my-3 sm:my-4">
              <Buttons
                onClick={openPopup}
                title="Go to MINI HOME"
                iconLeft={<AiOutlineHome />}
                iconStyles="text-xl font-semibold "
                containerStyles="flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md  border border-2 font-semibold  
              rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
