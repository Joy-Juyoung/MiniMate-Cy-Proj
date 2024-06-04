import React, { useEffect, useRef } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

// import Minnime from '../../assets/minimi2.png';
import Minnime from '../../assets/minime(23).gif';
import MinniFemale from '../../assets/minimi2.png';
import MinniMale from '../../assets/minimi1.png';
import Buttons from '../Buttons';
import { FaArrowRight } from 'react-icons/fa6';
import { miniInfo, myHome } from '../../redux/tempData';
import { useNavigate } from 'react-router-dom';

const Hero = ({ me }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  console.log('me', me);

  const openPopup = () => {
    if (!popupRef.current || popupRef.current.closed) {
      if (me) {
        const userDomain = me?.domain;
        // const userTempDomain = me.email.substring(0, me.email.indexOf('@'));
        // const userEmail = me.email;
        const popupUrl = `http://localhost:3000/${userDomain}/home`;
        const popupFeatures = 'width=1100,height=600';
        popupRef.current = window.open(popupUrl, '_blank', popupFeatures);
      }
    } else {
      // If the popup is already open, focus on it
      popupRef.current.focus();
    }
  };

  return (
    <div className='h-[50vh] px-10 sm:px-20 md:px-40 flex items-center'>
      {/* <div
        className='absolute inset-0 w-full h-full'
        style={{
          background: 'linear-gradient(to left bottom, #f5f5f5, #f5f5f5)',
          clipPath: 'polygon(0% 100%, 0% 100%, 100% 85%, 100% 100%)',
        }}
      ></div> */}
      {/* <div
        className='w-full flex flex-col items-center justify-center pt-10 pb-10 md:pb-40'
        style={{ height: !me ? '70vh' : '80vh', zIndex: 1 }}
      > */}
      <div className='w-full h-full flex flex-col items-center justify-center '>
        <div className='w-full flex flex-col items-center '>
          <div className='w-full font-acme font-bold text-center text-3xl md:text-5xl sm:text-4xl md:mb-2 '>
            Create your own Mini Home
          </div>

          <div className='w-full lg:w-1/2 text-center text-sm md:text-md mt-2 md:mt-3 hidden sm:flex'>
            Discover your perfect match, and personalize your own mini room
            haven with a unique name and a brand-new skin!
          </div>
        </div>

        {!me ? (
          <div className='w-full flex items-center justify-center my-3 sm:my-8'>
            <Buttons
              onClick={() => navigate('/login')}
              title='GET START'
              iconRight={<FaArrowRight />}
              iconStyles='text-xl font-semibold '
              containerStyles='flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md border border-2 font-semibold  
            rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor'
            />
          </div>
        ) : (
          <>
            <div className='w-full flex items-center justify-center '>
              <img
                // src={Minnime || MinniFemale}
                src={
                  !me?.minime_img
                    ? me?.gender === 'male'
                      ? MinniMale
                      : MinniFemale
                    : me?.minime_img
                }
                alt='Minime'
                className='w-[20rem] h-[15rem] drop-shadow-xl object-contain'
              />
            </div>
            <div className='w-full flex items-center justify-center my-3 sm:my-4'>
              <Buttons
                onClick={openPopup}
                title='Go to MINI HOME'
                iconLeft={<AiOutlineHome />}
                iconStyles='text-xl font-semibold '
                containerStyles='flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md  border border-2 font-semibold  
              rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
