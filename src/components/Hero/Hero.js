import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import Minnime from '../../assets/minimi2.png';
import Minnime from '../../assets/minime(23).gif';
import Buttons from '../Buttons';
import { FaArrowRight } from 'react-icons/fa6';
import { miniInfo, myHome } from '../../redux/tempData';

const Hero = () => {
  const navigate = useNavigate(); // navigate 변수명 수정
  const { user } = useSelector((state) => state.user);

  const openPopup = () => {
    if (user) {
      const userDomain = myHome.domain;
      const userEmail = user.email;
      const popupUrl = `http://localhost:3000/minihome/${
        !userDomain ? userEmail : userDomain
      }/home`;
      const popupFeatures = 'width=1100,height=600';
      window.open(popupUrl, '_blank', popupFeatures);
    }
  };

  return (
    <div className='relative h-full'>
      <div
        className='absolute inset-0 w-full h-full'
        style={{
          background: 'linear-gradient(to left bottom, #f5f5f5, #f5f5f5)',
          clipPath: 'polygon(0% 100%, 0% 100%, 100% 85%, 100% 100%)',
        }}
      ></div>
      <div
        className='w-full flex flex-col items-center justify-center pt-10 pb-10 md:pb-40'
        style={{ height: !user ? '70vh' : '80vh', zIndex: 1 }}
      >
        <div className='w-full flex flex-col items-center '>
          <div className='w-full font-acme font-bold text-center text-3xl md:text-5xl sm:text-4xl md:mb-2 '>
            Create your own Mini Home
          </div>

          <div className='w-full lg:w-1/2 text-center text-sm md:text-md mt-2 md:mt-3 hidden sm:flex'>
            Discover your perfect match, and personalize your own mini room
            haven with a unique name and a brand-new skin!
          </div>
        </div>

        {!user ? (
          <div className='w-full flex items-center justify-center my-3 sm:my-8'>
            <Buttons
              onClick={() => navigate('/register')}
              title='GET START'
              iconRight={<FaArrowRight />}
              iconStyles='text-xl font-semibold '
              containerStyles='flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md border border-2 font-semibold  
            rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor'
            />
          </div>
        ) : (
          <>
            <div className='w-full flex items-center justify-center my-3 sm:my-8'>
              <Buttons
                onClick={openPopup}
                title='Go to Minihome'
                iconLeft={<AiOutlineHome />}
                iconStyles='text-xl font-semibold '
                containerStyles='flex items-center gap-2 p-3 md:p-4 text-sm sm:text-md  border border-2 font-semibold  
              rounded-xl bg-hightColor border-hightColor text-white shadow-md hover:bg-white hover:text-hightColor'
              />
            </div>

            <div className='w-full flex gap-4 flex-col lg:flex-row items-center justify-center '>
              <div className='basis-1/2 flex items-center justify-center lg:justify-end'>
                <img
                  src={Minnime}
                  alt='Minime'
                  className='w-[20rem] drop-shadow-xl'
                />
              </div>
              <div
                className='basis-1/2 hidden lg:flex items-center justify-start
              text-sm rounded-2xl'
              >
                <div className='w-[15rem] bg-white py-6 px-4 rounded-2xl flex flex-col justify-between '>
                  {miniInfo?.map((info, index) => {
                    return (
                      <div key={index} className='flex justify-between my-1'>
                        <div className=''>{info.name}</div>
                        <div className='font-semibold'>{info.qty}</div>
                      </div>
                    );
                  })}
                  <div className='flex justify-between mt-6'>
                    <div>My cheese</div>
                    <div className='font-semibold'>🧀180</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
