import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import Minnime from '../assets/minimi2.png';
import Minime from '../assets/minime3.gif';
import BgPattern from '../assets/pattern3.png';
import BgImg from '../assets/pattern.png';
import Buttons from './Buttons';

const Hero = () => {
  const openPopup = () => {
    const popupUrl = 'https://minimate-cy.netlify.app/minihome';
    const popupFeatures = 'width=1100,height=600';

    window.open(popupUrl, '_blank', popupFeatures);
  };
  const miniInfo = [
    { name: 'Today visitors', qty: '7' },
    { name: 'New posts', qty: '2' },
    { name: 'New Requests', qty: '0' },
    { name: 'Gift box', qty: '0' },
  ];

  return (
    <div className='w-full h-[80vh] flex flex-col items-center justify-center gap-10 pt-10 pb-40 px-10 2xl:px-40'>
      <div className='w-full flex flex-col items-center '>
        <div className='font-acme font-bold text-3xl md:text-5xl sm:text-4xl md:mb-2 '>
          {/* font-acme drop-shadow-3xl  */}
          Make your Mini Home
        </div>

        <div className='font-poppins text-sm md:text-sm mt-2 md:mt-3'>
          Find your mate, connect with unique name.
          <br />
          Customize your miniroom with new skin.
        </div>
        <div className='w-full flex items-center justify-center'>
          <Buttons
            onClick={openPopup}
            title='Go to Minihome'
            iconLeft={<AiOutlineHome />}
            iconStyles='text-xl font-semibold '
            containerStyles='flex items-center gap-2 p-3 md:p-4 mt-6 md:mt-6 text-md  border border-2 font-semibold  
            rounded-xl bg-hightColor border-hightColor text-white shadow-md'
          />
        </div>
      </div>

      <div className='relative w-full flex items-center justify-center md:mt-8 '>
        <div className='flex ml-24 w-[20rem] h-[15rem] border-none rounded-[20%] rounded-l-none bg-bgColor shadow-lg'></div>

        <div className='absolute w-full m-auto left-0 right-0 flex gap-2 items-center justify-center'>
          <div className='flex items-center justify-center mt-2 mb-2'>
            <img
              src={Minnime}
              alt='Minime'
              className='w-[80%] sm:w-[7rem] md:w-[9rem] drop-shadow-xl'
            />
          </div>
          <div className='flex w-1/6 flex-col justify-between text-sm mr-4 '>
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
    </div>
  );
};

export default Hero;
