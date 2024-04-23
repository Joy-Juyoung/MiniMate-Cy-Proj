import React from 'react';
import Together2 from '../assets/together2.svg';
import Footer from '../components/Footer';
import MainInfo from '../components/MainInfo';
import Shop1 from '../assets/shop1.gif';
import Shop2 from '../assets/shop2.gif';
import Shop3 from '../assets/shop5.gif';
import Shop4 from '../assets/shop6.gif';

const Home = () => {
  const shopItem = [
    { image: Shop1, name: 'minime one', cheese: '30' },
    { image: Shop2, name: 'minime one', cheese: '30' },
    { image: Shop3, name: 'minime one', cheese: '30' },
    { image: Shop4, name: 'minime one', cheese: '30' },
  ];

  return (
    <div className='font-work min-w-[1100px]'>
      <div className='waveSection bg-[#f7d24f] min-h-[150px] pt-6 min-w-[1100px]'>
        <div className='wave after:bg-[#f7d24f] before:bg-[#fff]'></div>
        <MainInfo />
      </div>
      <div className='bg-[#fff] h-[600px]'></div>

      <div className='waveSection bg-[#fff] min-w-[1100px]'>
        <div className='wave after:bg-[#fff] before:bg-[#DC94D4]'></div>

        <div className='absolute min-w-[1100px] flex flex-col items-center justify-center gap-10 pt-[100px]'>
          <div className='mt-10'>
            <div className='font-semibold text-2xl text-center'>BEST ITEMS</div>
            <div className='text-sm text-center'>Most popular on this week</div>
          </div>

          <div className='w-full flex items-center justify-between mt-6'>
            {shopItem.map((item, index) => {
              return (
                <div
                  key={index}
                  className='w-full flex items-center justify-between'
                >
                  <div className='w-full flex flex-col items-center justify-center'>
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
        </div>
      </div>
      <div className='bg-[#DC94D4] h-[650px] '></div>

      <div className='waveSection bg-[#DC94D4]'>
        <div className='wave after:bg-[#DC94D4] before:bg-[#fff]'></div>
      </div>
      <div className='bg-[#fff] h-[200px] '></div>

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
      <Footer />
    </div>
    // </div>
  );
};

export default Home;
