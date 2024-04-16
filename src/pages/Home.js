import React from 'react';
import { Buttons, Header } from '../components';
import { AiOutlineHome } from 'react-icons/ai';
import BgImg from '../assets/pattern.png';

const Home = () => {
  const openPopup = () => {
    // Define the URL and window features for the popup
    const popupUrl = 'http://localhost:3000/minihome';
    const popupFeatures = 'width=1100,height=600';

    // Open the popup window
    window.open(popupUrl, '_blank', popupFeatures);
  };

  return (
    <div className='w-full bg-bgColor h-screen overflow-hidden'>
      <Header />
      <div className='w-full px-6 py-6'>
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
      </div>
    </div>
  );
};

export default Home;
