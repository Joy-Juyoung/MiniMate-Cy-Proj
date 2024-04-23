import React from 'react';
import Together2 from '../assets/together2.svg';
import Footer from '../components/Footer';
import MainInfo from '../components/MainInfo';

const Home = () => {
  return (
    <div className='font-work'>
      {/* Banner */}
      <div className='waveSection bg-[#f1ce44] min-h-[400px]'>
        <div className='wave after:bg-[#f1ce44] before:bg-[#fff]'></div>
        <MainInfo />
      </div>

      <div className='bg-[#fff] h-[200px]'></div>

      <div className='waveSection bg-[#fff]'>
        <div className='wave after:bg-[#fff] before:bg-[#DC94D4]'></div>
      </div>

      <div className='bg-[#DC94D4] h-[600px] '></div>

      <div className='waveSection bg-[#DC94D4]'>
        <div className='wave after:bg-[#DC94D4] before:bg-[#fff]'></div>
      </div>

      {/* AD */}
      {/* <div className='w-full h-full flex items-center justify-center bg-[#FFF] px-24 py-6'>
        <div className='w-full grid grid-cols-2 gap-6 py-10'>
          <div className='w-full flex items-center justify-center'>
            20% offer for your BGM
          </div>
          <img
            src={Together2}
            alt=''
            className='w-[70%] flex items-center justify-center'
          />
        </div>
      </div> */}

      {/* Shop */}
      {/* <div className='w-full flex items-center justify-center bg-[#FFF0B3] px-24 py-10'>
        <div className='w-full flex justify-between'>
          <div className='w-[300px] h-[300px] p-10 border-none bg-[#fff] rounded-[50%]'></div>
          <div className='w-[300px] h-[300px] p-10 border-none bg-[#fff] rounded-[50%]'></div>
          <div className='w-[300px] h-[300px] p-10 border-none bg-[#fff] rounded-[50%]'></div>
          <div className='w-[300px] h-[300px] p-10 border-none bg-[#fff] rounded-[50%]'></div>
        </div>
      </div> */}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
    // </div>
  );
};

export default Home;
