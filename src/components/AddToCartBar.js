import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCartsByUser, fetchCartItems } from '../redux/cartSlice';
import { AiOutlineClose } from 'react-icons/ai';
import Buttons from './Buttons';

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
  const [selectedCart, setSelectedCart] = useState('');
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [localCartItems, setLocalCartItems] = useState(tempCartItems || []);

  useEffect(() => {
    if (me) {
      dispatch(fetchAllCartsByUser({ userId: me?._id }));
    }
  }, [dispatch, me]);

  useEffect(() => {
    if (list.length > 0 && selectedCart) {
      const cart = list.find((cart) => cart._id === selectedCart);
      if (cart) {
        setSelectedCartItems(cart.shop_items);
      }
    }
  }, [selectedCart, list]);

  // console.log('list', list);

  useEffect(() => {
    localStorage.setItem('tempCartItems', JSON.stringify(localCartItems));
  }, [localCartItems]);

  // console.log('localCartItems', localCartItems);

  const handleSelectAll = () => {
    if (selectedCartItems?.length === localCartItems?.length) {
      setSelectedCartItems([]);
    } else {
      setSelectedCartItems([...Array(selectedCartItems?.length).keys()]);
    }
  };

  const handleCheckboxChange = (index) => {
    if (selectedCartItems.includes(index)) {
      setSelectedCartItems(selectedCartItems.filter((item) => item !== index));
    } else {
      setSelectedCartItems([...selectedCartItems, index]);
    }
  };

  // console.log('selectedCartItems', selectedCartItems);

  const handleRemoveItem = (index) => {
    const updatedCartItems = localCartItems?.filter(
      (_, index) => !selectedCartItems.includes(index)
    );
    setLocalCartItems(updatedCartItems);
    setSelectedCartItems([]);
  };

  const handleSelectCartChange = (e) => {
    setSelectedCart(e.target.value);
  };

  return (
    <>
      <div className='fixed top-0 right-0 w-[40vw] md:w-[30vw] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out'>
        <div className='flex flex-col h-fit max-h-[1/2] p-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Cart</h2>
            <button
              onClick={() => setCartSidebarOpen(false)}
              className='text-xl'
            >
              &times;
            </button>
          </div>
          <div className='h-fit flex-grow overflow-y-auto'>
            {localCartItems.length === 0 ? (
              <div className='text-center text-gray-500'>
                Your cart is empty
              </div>
            ) : (
              <>
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex items-center '>
                    <input
                      type='checkbox'
                      checked={
                        selectedCartItems.length === localCartItems?.length
                      }
                      onChange={handleSelectAll}
                      className='mr-2'
                    />
                    <label className='text-[0.8rem]'>Select All</label>
                  </div>
                  <Buttons
                    onClick={handleRemoveItem}
                    containerStyles='text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]'
                    title='Delete Selected'
                  />
                </div>
                {localCartItems.map((item, index) => (
                  <div
                    key={index}
                    className='h-fit flex items-center justify-between mb-4'
                  >
                    <input
                      type='checkbox'
                      checked={selectedCartItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <div>{item.item_name}</div>
                    <div>🧀 {item.item_price}</div>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className='text-red-500'
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className='mt-4'>
            <select
              className='w-full bg-[#ddd] p-2 rounded'
              value={selectedCart}
              onChange={handleSelectCartChange}
            >
              <option value=''>Select cart</option>
              <option value='new'>New Cart</option>
              {list.map((cart, index) => (
                <option key={cart._id} value={cart._id}>
                  cart {index + 1}
                </option>
              ))}
            </select>
          </div>
          {selectedCart && selectedCart !== 'new' && (
            <div className='mt-4'>
              {selectedCartItems.length === 0 ? (
                <div className='text-center text-[#bbb]'>
                  No items in this cart
                </div>
              ) : (
                selectedCartItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between mb-4'
                  >
                    <div>{item.item_name}</div>
                    <div>🧀 {item.item_price}</div>
                  </div>
                ))
              )}
              <div className='mt-4'>
                <button
                  onClick={handleSaveCart}
                  className='w-full bg-black text-white py-2 rounded mb-2'
                >
                  Add to Selected Cart
                </button>
                <button
                  onClick={() => setCartSidebarOpen(false)}
                  className='w-full bg-gray-300 py-2 rounded'
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
