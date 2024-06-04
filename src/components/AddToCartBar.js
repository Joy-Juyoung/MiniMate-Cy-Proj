import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCartsByUser, fetchCartItems } from '../redux/cartSlice';

const AddToCartBar = ({
  tempCartItems,
  error,
  handleSaveCart,
  handleCreateCart,
  setCartSidebarOpen,
  me,
}) => {
  const dispatch = useDispatch();
  const { item, list, loading } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(item.shop_items || []);

  useEffect(() => {
    if (me) {
      dispatch(fetchAllCartsByUser({ userId: me?._id }));
    }
  }, [dispatch, me]);

  useEffect(() => {
    if (cartItems) {
      dispatch(fetchCartItems({ cartId: list[0]?._id }));
    }
  }, [dispatch]);

  // console.log('me', me);
  console.log('list', list);
  console.log('item', item.shop_items);

  return (
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
  );
};

export default AddToCartBar;
