import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopItem, shopCategory } from '../redux/tempData';
import { GoPlus } from 'react-icons/go';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('Minime');
  // const [activeCategory, setActiveCategory] = useState(0);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // console.log(selectedCategory);

  const handleAddToCart = () => {
    navigate('/cart');
  };

  return (
    <div className='w-full h-[100vh] bg-[#ffffffba] flex py-16 px-10 2xl:px-40 '>
      <div className='w-full flex flex-col '>
        <div className='font-bold text-3xl md:text-4xl md:mb-2 '>SHOP</div>
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8'>
          {shopCategory.map((category, index) => (
            <div
              key={index}
              className={`cursor-pointer w-full text-sm text-center px-5 py-2 rounded-lg border ${
                selectedCategory === category.name
                  ? ' bg-black text-white shadow-md border-white'
                  : 'border-[#ddd] bg-white shadow-md hover:bg-[#00000052]'
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className='w-full my-14'>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-8'>
            {selectedCategory &&
              (shopItem.filter((item) => item.category === selectedCategory)
                .length === 0 ? (
                <div className='empty'>This is Empty</div>
              ) : (
                shopItem
                  .filter((item) => item.category === selectedCategory)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='cursor-pointer text-sm w-full flex flex-col items-center justify-center shadow-md bg-white border border-[#ccc] rounded-lg hover:border-hightColor hover:text-hightColor hover:scale-[1.05] ease-in-out duration-300'
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-full h-[10rem] object-contain  rounded-lg py-4'
                        />
                        <div className='w-full px-4 py-3'>
                          <div className='w-full flex item-center justify-between'>
                            <div className='item-name'>{item.name}</div>
                            <div className='item-price'>🧀 {item.cheese}</div>
                          </div>
                          <button
                            className='w-full text-[0.8rem] flex items-center justify-center bg-[#f5f5f5] rounded-lg py-2 mt-2 text-black hover:bg-hightColor hover:text-white'
                            onClick={handleAddToCart}
                          >
                            <GoPlus className='mr-1' size={15} /> Add to cart
                          </button>
                        </div>
                      </div>
                    );
                  })
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
