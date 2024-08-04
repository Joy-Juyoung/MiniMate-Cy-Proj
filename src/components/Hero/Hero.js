// Hero.js
import React, { useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import Buttons from "../Buttons";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openPopup } from "../utils";

const Hero = ({ me }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openUserPopup = () => {
    // const popupUrl = `http://localhost:3000/${me?.username}/home`;
    const popupUrl = `https://minimate-cy.netlify.app/${me?.username}/home`;
    openPopup(popupUrl, popupRef);
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
                onClick={openUserPopup}
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
