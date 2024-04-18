import React from 'react';
import { Buttons, Header } from '../components';
import { AiOutlineHome } from 'react-icons/ai';
import BgImg from '../assets/pattern.png';
import BgPattern from '../assets/pattern8.png';
import Minnime from '../assets/minimi2.png';

const Home = () => {
  const openPopup = () => {
    // Define the URL and window features for the popup
    const popupUrl = 'http://localhost:3000/minihome';
    const popupFeatures = 'width=1100,height=600';

    // Open the popup window
    window.open(popupUrl, '_blank', popupFeatures);
  };

  const miniInfo = [
    { name: 'Today visitors', qty: '7' },
    { name: 'New posts', qty: '2' },
    { name: 'New Requests', qty: '0' },
    { name: 'Gift box', qty: '0' },
    // { name: 'My maple', qty: '180' },
  ];

  return (
    <>
      <div class='waveSection'>
        {/* <div className='w-full px-24 py-6'>
          <div className='text-ascent-1 '>Click to Open window popup</div>
          <button
            onClick={openPopup}
            className='flex items-center gap-2 text-sm text-white font-semibold px-4 md:px-6 py-1 md:py-2 bg-[#F37125] rounded-lg hover:bg-[#f4823f] shadow-lg'
          >
            <div className='text-xl'>
              <AiOutlineHome />
            </div>
            Go to Minihome
          </button>
        </div> */}
        <div class='wave'></div>
      </div>
      <div
        className='w-full h-[55%] bg-primary px-24 py-6 z-10 mt-[10rem] mb-[5rem]
        flex gap-16'
      >
        {/* grid grid-cols-2 gap-10' */}
        <div className='flex-1 h-full border-2 border-[#dadada] rounded-lg py-5 shadow-lg'>
          <div className='flex justify-center text-xl font-semibold border-b-4 border-[#F37125] pb-4 mx-16'>
            JOY's Miniworld
          </div>
          <div className='flex items-center '>
            <div className='flex flex-1 items-center justify-center drop-shadow-xl my-8'>
              <img src={Minnime} alt='Minnime' className='w-24' />
            </div>
            <div className=' flex-1 text-sm'>
              {miniInfo?.map((info, index) => {
                return (
                  <div key={index} className='flex justify-between mr-20 my-1'>
                    <div>{info.name}</div>
                    <div>{info.qty}</div>
                  </div>
                );
              })}
              <div className='flex justify-between mr-20 mt-6'>
                <div>My cheese</div>
                <div>🧀180</div>
              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-center -mt-2 mb-2'>
            {/* <div className='text-ascent-1 '>Click to Open window popup</div> */}
            <button
              onClick={openPopup}
              className='flex items-center gap-2 text-sm text-white font-semibold px-4 md:px-6 py-1 md:py-2 bg-[#F37125] rounded-lg hover:bg-[#f4823f] shadow-lg'
            >
              <div className='text-xl'>
                <AiOutlineHome />
              </div>
              Go to Minihome
            </button>
          </div>
        </div>
        <div className='flex-[2] h-full border rounded-md  py-5'>
          banner card
        </div>
      </div>
      <div
        className='w-full h-[40em] px-24 py-6 z-10 '
        style={{
          backgroundImage: `url('${BgPattern}')`,
          backgroundSize: '15%',
        }}
      ></div>
    </>
  );
};

export default Home;
