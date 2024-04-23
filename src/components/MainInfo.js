import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import Minnime from '../assets/minimi2.png';
import Minime from '../assets/minime3.gif';
import BgPattern from '../assets/pattern3.png';

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
    <div className='absolute w-full my-2' style={{ zIndex: '1' }}>
      <div className='flex flex-col items-center'>
        <div className='font-bold text-5xl mb-2 font-acme text-[#f7f7f7] drop-shadow-3xl'>
          Costomize
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
            className='flex items-center gap-2 text-md text-white font-semibold px-4 py-2 mt-6 bg-[#F37125] rounded-lg hover:bg-[#f4823f] shadow-lg'
          >
            <div className='text-xl'>
              <AiOutlineHome />
            </div>
            Go to Minihome
          </button>
        </div>
      </div>

      <div className='flex items-center justify-center mt-6 mb-2'>
        <div>
          <div className='flex items-center justify-center mt-6 mb-2'>
            <img
              src={Minnime}
              alt='Minime'
              className='w-[120px] drop-shadow-xl'
            />
          </div>
        </div>

        {/* <div
        className='absolute w-full h-full top-10'
        style={{
          backgroundImage: `url('${BgPattern}')`,
          backgroundSize: '25%',
          opacity: '30%',
          zIndex: '-2',
        }}
      ></div> */}
        {/* <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center w-[320px] h-[320px] border-none bg-[#fff] rounded-[50%] drop-shadow-xl'>
            <div className='text-sm flex flex-col'>
              {miniInfo?.map((info, index) => {
                return (
                  <div
                    key={index}
                    className='w-full flex justify-between mr-20 my-1'
                  >
                    <div>{info.name}</div>
                    <div>{info.qty}</div>
                  </div>
                );
              })}
              <div className='w-full flex justify-between mr-20 mt-6'>
                <div>My cheese</div>
                <div>🧀180</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MainInfo;
