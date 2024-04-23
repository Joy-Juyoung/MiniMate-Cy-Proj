import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import Minnime from '../assets/minimi2.png';
import Minime from '../assets/minime3.gif';
import BgPattern from '../assets/pattern3.png';
import BgImg from '../assets/pattern.png';

const MainInfo = () => {
  const openPopup = () => {
    const popupUrl = 'http://localhost:3000/minihome';
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
    <div
      className='absolute w-full flex flex-col items-center justify-center gap-10'
      style={{ zIndex: '1' }}
    >
      {/* <div className='flex flex-col items-center bg-[#f7d24f] rounded-[50%] p-3'> */}
      <div className='flex flex-col items-center mt-10'>
        <div className='font-bold text-5xl mb-2 font-acme text-[#f7f7f7] drop-shadow-3xl'>
          Costomize your own home
        </div>
        <div className='font-bold text-5xl mb-2 font-acme text-[#f7f7f7] drop-shadow-3xl'>
          your own home
        </div>
        <div className='text-sm font-acme mt-4'>
          Find your mate, connect with unique nickname
        </div>
        <div className='w-full flex items-center justify-center'>
          <button
            onClick={openPopup}
            className='flex items-center gap-2 text-md text-white font-semibold p-4 mt-6 bg-[#000] rounded-2xl hover:bg-[#F37125] shadow-lg'
          >
            <div className='text-xl'>
              <AiOutlineHome />
            </div>
            Go to Minihome
          </button>
        </div>
      </div>

      <div className='relative'>
        <div
          className='absolute w-full h-full border-none rounded-[50%]'
          style={{
            backgroundImage: `url('${BgImg}')`,
            backgroundSize: '30%',
            zIndex: '-1',
          }}
        ></div>
        <div className='flex items-center gap-6 py-8 px-16'>
          <div className='w-full flex items-center justify-center mt-2 mb-2'>
            <img
              src={Minnime}
              alt='Minime'
              className='w-[120px] drop-shadow-xl'
            />
          </div>
          <div className='w-full flex flex-col justify-between text-sm mr-4'>
            {miniInfo?.map((info, index) => {
              return (
                <div key={index} className='flex justify-between my-1'>
                  <div>{info.name}</div>
                  <div>{info.qty}</div>
                </div>
              );
            })}
            <div className='w-full flex justify-between mt-6'>
              <div>My cheese</div>
              <div>🧀180</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
