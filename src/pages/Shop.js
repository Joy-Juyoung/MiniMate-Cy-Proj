import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems, fetchAllItemsByCategory } from '../redux/itemSlice';
import { fetchCategories } from '../redux/categorySlice';
import { createCart } from '../redux/cartSlice';
import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list: items,
    loading: itemsLoading,
    all,
  } = useSelector((state) => state.item);
  // const { list: categories, loading: categoriesLoading } = useSelector((state) => state.category);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  const { me } = useSelector((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [tempCartItems, setTempCartItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllItems());
  }, [dispatch]);

  // useEffect(() => {
  //   if (selectedCategory === null) {
  //     dispatch(fetchAllItems());
  //   }
  // }, [dispatch, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      dispatch(fetchAllItemsByCategory({ categoryId }));
    } else {
      dispatch(fetchAllItems());
    }
  };

  const handleAddToTempCart = (item) => {
    if (tempCartItems.some((cartItem) => cartItem._id === item._id)) {
      setError('Item is already in the cart');
    } else {
      setTempCartItems([...tempCartItems, item]);
      setError('');
    }
    setCartSidebarOpen(true);
  };

  const handleSaveCart = () => {
    setCartSidebarOpen(false);
  };

  const handleCreateCart = () => {
    const cartData = {
      user: me._id,
      shop_items: tempCartItems.map((item) => item._id),
      total_price: tempCartItems.reduce(
        (total, item) => total + item.item_price,
        0
      ),
      total_qty: tempCartItems.length,
    };
    dispatch(createCart({ cartData }));
    setTempCartItems([]);
    navigate('/cart');
  };

  return (
    <div className='w-full h-[100vh] bg-[#ffffffba] flex py-16 px-10 sm:px-20 md:px-40'>
      <div className='w-full flex flex-col '>
        <div className='font-bold text-3xl md:text-4xl md:mb-2 '>SHOP</div>
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8'>
          {categoriesLoading ? (
            <div>Loading categories...</div>
          ) : (
            <>
              <div
                className={`cursor-pointer w-full text-sm text-center px-5 py-2 rounded-lg border ${
                  selectedCategory === null
                    ? ' bg-black text-white shadow-md border-white'
                    : 'border-[#ddd] bg-white shadow-md hover:bg-[#00000052]'
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </div>
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`cursor-pointer w-full text-sm text-center px-5 py-2 rounded-lg border ${
                    selectedCategory === category._id
                      ? ' bg-black text-white shadow-md border-white'
                      : 'border-[#ddd] bg-white shadow-md hover:bg-[#00000052]'
                  }`}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </div>
              ))}
            </>
          )}
        </div>
        <div className='w-full my-14'>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-center gap-8 md:gap-4 lg:gap-8'>
            {itemsLoading ? (
              <div>Loading items...</div>
            ) : (
              (selectedCategory === null ? all : items).map((item, index) => (
                <div
                  key={index}
                  className='cursor-pointer text-sm w-full flex flex-col items-center justify-center shadow-md bg-white border border-[#ccc] rounded-lg hover:border-hightColor hover:text-hightColor hover:scale-[1.05] ease-in-out duration-300'
                >
                  <img
                    src={item.item_img}
                    alt={item.item_name}
                    className='w-full h-[10rem] object-contain rounded-lg py-4'
                  />
                  <div className='w-full px-4 py-3'>
                    <div className='w-full flex item-center justify-between'>
                      <div className='item-name'>{item.item_name}</div>
                      <div className='item-price'>🧀 {item.item_price}</div>
                    </div>
                    <button
                      className='w-full text-[0.8rem] flex items-center justify-center bg-[#f5f5f5] rounded-lg py-2 mt-2 text-black hover:bg-hightColor hover:text-white'
                      onClick={() => handleAddToTempCart(item)}
                    >
                      <GoPlus className='mr-1' size={15} /> Add to cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {cartSidebarOpen && (
          <>
            <div className='fixed top-0 right-0 w-1/4 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out'>
              <div className='flex flex-col h-full p-4'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-bold'>Cart</h2>
                  <button
                    onClick={() => setCartSidebarOpen(false)}
                    className='text-xl'
                  >
                    &times;
                  </button>
                </div>
                <div className='flex-grow overflow-y-auto'>
                  {tempCartItems.length === 0 ? (
                    <div className='text-center text-gray-500'>
                      Your cart is empty
                    </div>
                  ) : (
                    tempCartItems.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between mb-4'
                      >
                        <div>{item.item_name}</div>
                        <div>🧀 {item.item_price}</div>
                      </div>
                    ))
                  )}
                </div>
                {error && <div className='text-red-500'>{error}</div>}
                <div className='mt-4'>
                  <button
                    onClick={handleSaveCart}
                    className='w-full bg-black text-white py-2 rounded mb-2'
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCreateCart}
                    className='w-full bg-hightColor text-white py-2 rounded'
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div
              className='fixed inset-0 bg-black opacity-50 z-40'
              onClick={() => setCartSidebarOpen(false)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
