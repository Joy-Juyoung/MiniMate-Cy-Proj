import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems, fetchAllItemsByCategory } from '../redux/itemSlice';
import { fetchCategories } from '../redux/categorySlice';
import { createCart } from '../redux/cartSlice';
import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components';
import AddToCartBar from '../components/AddToCartBar';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list: items,
    loading: itemsLoading,
    all,
  } = useSelector((state) => state.item);
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
    // navigate('/cart');
    setCartSidebarOpen(false);
  };

  return (
    <div className='w-full h-full min-h-screen bg-[#fff9e7] flex pb-28 sm:pb-12 pt-12 px-10 sm:px-20 md:px-40'>
      <div className='w-full h-full flex flex-col '>
        <div className='font-bold text-3xl md:text-4xl mb-4 md:mb-8 '>SHOP</div>
        <div className='w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center'>
          {categoriesLoading ? (
            <Loading />
          ) : (
            <>
              <div
                className={`cursor-pointer w-full h-full text-sm text-center px-5 py-2 rounded-lg border ${
                  selectedCategory === null
                    ? ' bg-black text-white shadow-md border-white'
                    : 'border-[#ddd] bg-white shadow-md hover:bg-[#00000052]'
                } flex items-center justify-center`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </div>
              {categories
                .filter((category) =>
                  category.name.toLowerCase().includes('private')
                )
                .map((category) => (
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
        <div className='w-full h-full my-12'>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-stretch gap-8 md:gap-4 lg:gap-8'>
            {itemsLoading ? (
              <span className='dots-container'></span>
            ) : (
              (selectedCategory === null ? all : items).map((item, index) => (
                <div
                  key={index}
                  className='cursor-pointer text-sm w-full flex flex-col items-center justify-between shadow-md bg-white border border-[#ccc] rounded-lg hover:scale-[1.05] ease-in-out duration-300'
                >
                  <img
                    src={item.item_img}
                    alt={item.item_name}
                    className='w-full h-[10rem] object-contain rounded-lg mt-4'
                  />
                  <div className='w-full flex flex-col justify-between flex-grow px-4 py-3'>
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
          <AddToCartBar
            me={me}
            tempCartItems={tempCartItems}
            error={error}
            handleSaveCart={handleSaveCart}
            handleCreateCart={handleCreateCart}
            setCartSidebarOpen={setCartSidebarOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;
