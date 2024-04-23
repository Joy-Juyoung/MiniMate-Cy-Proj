import React from 'react';
import Together2 from '../assets/together2.svg';
import Footer from '../components/Footer';
import MainInfo from '../components/MainInfo';
import Shop1 from '../assets/shop1.gif';
import Shop2 from '../assets/shop2.gif';
import Shop3 from '../assets/shop5.gif';
import Shop4 from '../assets/shop6.gif';
import { Buttons } from '../components';
import { Link } from 'react-router-dom';

const Home = () => {
  const shopItem = [
    { image: Shop1, name: 'minime one', cheese: '30' },
    { image: Shop2, name: 'minime one', cheese: '30' },
    { image: Shop3, name: 'minime one', cheese: '30' },
    { image: Shop4, name: 'minime one', cheese: '30' },
  ];

  return (
    <div className='font-work min-w-[1100px]'>
      <div className='waveSection bg-[#f1ecc0] min-h-[150px] pt-6 min-w-[1100px]'>
        <div className='wave after:bg-[#f1ecc0] before:bg-[#fff]'></div>
        <MainInfo />
      </div>
      <div className='bg-[#fff] h-[600px]'></div>

      <div className='waveSection bg-[#fff] min-w-[1100px]'>
        <div className='wave after:bg-[#fff] before:bg-[#ffcea0]'></div>

        <div className='absolute min-w-[1100px] flex flex-col items-center justify-center gap-10 pt-[100px]'>
          <div className='mt-6'>
            <div className='font-semibold text-2xl text-center'>BEST ITEMS</div>
            <div className='text-sm text-center'>Most popular on this week</div>
          </div>

          <div className='w-full flex items-center justify-between mt-4 gap-8'>
            {shopItem.map((item, index) => {
              return (
                <div
                  key={index}
                  className='w-full flex items-center justify-between'
                >
                  <div className='w-full flex flex-col items-center justify-center py-4 bg-[#fff7f246] rounded-3xl'>
                    <img
                      src={item.image}
                      alt=''
                      className='h-[200px] object-cover'
                    />
                    <div className='flex gap-4 mt-4'>
                      <div className='text-sm text-center'>{item.name}</div>
                      <div className='text-sm text-center'>🧀{item.cheese}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link className='font-semibold p-4 mt-6 bg-[#000] text-white rounded-3xl hover:bg-[#fff] hover:border hover:border-1 hover:text-[#000]'>
            SHOP NOW
          </Link>
        </div>
      </div>
      <div className='bg-[#ffcea0] h-[800px] '></div>

      <div className='waveSection bg-[#ffcea0]'>
        <div className='wave after:bg-[#ffcea0] before:bg-[#fff]'></div>
      </div>
      <div className='bg-[#fff] h-[100px] '></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
