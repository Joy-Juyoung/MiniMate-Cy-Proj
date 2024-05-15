import React, { useState, useEffect } from 'react';
import Image1 from '../assets/minime(2).gif';
import Image2 from '../assets/miniroom1.gif';
import Image3 from '../assets/minime(10).gif';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCartsByUser, fetchCartItems } from '../redux/cartSlice';
import { Buttons } from '../components';

const Cart = ({ me }) => {
  const dispatch = useDispatch();
  const { item, list } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(item?.shop_items || []);
  useEffect(() => {
    dispatch(fetchAllCartsByUser({ userId: me?._id }));
  }, [dispatch, me]);

  useEffect(() => {
    if (list && list.length > 0) {
      dispatch(fetchCartItems({ cartId: list[0]._id }));
    }
  }, [dispatch, list]);

  // console.log(cartItems);

  const [selectedItems, setSelectedItems] = useState(
    Array.isArray(cartItems) ? [...Array(cartItems.length).keys()] : []
  );

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-US');
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(cartItems.length).keys()]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedCartItems = cartItems.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setCartItems(updatedCartItems);
    setSelectedItems([]);
  };

  const totalPrice = selectedItems.reduce(
    (acc, index) => acc + cartItems[index].item_price,
    0
  );
  const totalItems = selectedItems.length;
  const availablePoints = me?.point || 0;

  return (
    <div className='w-full h-[100vh] flex flex-col py-16 px-10 2xl:px-40'>
      <div className='text-3xl font-bold mb-4'>Cart</div>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center '>
          <input
            type='checkbox'
            checked={selectedItems.length === cartItems?.length}
            onChange={handleSelectAll}
            className='mr-2'
          />
          <label className='text-[0.8rem]'>Select All</label>
        </div>
        <Buttons
          onClick={handleDeleteSelected}
          containerStyles='text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]'
          title='Delete Selected'
        />
      </div>
      <div className='flex flex-col '>
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className='border-b border-[#aaa] py-3 flex items-center gap-8 '
          >
            <input
              type='checkbox'
              checked={selectedItems.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className='mr-2'
            />
            <img src={Image1} alt={item.item_name} className='w-24 h-24 mb-2' />
            <div className='w-full h-full flex justify-between items-center'>
              <div>
                <p className='text-[0.7rem]'>{item.category.name}</p>
                <p className='text-lg font-semibold text-[1rem]'>
                  {item.item_name}
                </p>
              </div>
              <p className='text-[1rem] mt-2'>
                ${formatPrice(item.item_price)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex flex-col items-end my-8 rounded-md text-[0.9rem]'>
        <div className='w-1/3 flex flex-col items-end bg-white p-4'>
          <div className='w-full text-lg font-semibold mb-4'>
            Payment Information
          </div>
          <div className='w-full flex items-center justify-between'>
            <p>Items Qty:</p>
            <p>{totalItems}</p>
          </div>
          <div className='w-full flex items-center justify-between'>
            <p>Total Price:</p>
            <p>${formatPrice(totalPrice)}</p>
          </div>
          <div className='w-full flex items-center justify-between'>
            <p>Available Points:</p>
            <p>${formatPrice(availablePoints)}</p>
          </div>
          <div className='w-full flex items-center justify-between'>
            <p>Remaining Balance:</p>
            <p>${formatPrice(availablePoints - totalPrice)}</p>
          </div>
        </div>

        <div className='my-4 flex gap-4'>
          <Buttons
            containerStyles='text-[0.8rem] px-4 py-2 rounded bg-black text-white '
            title='Checkout'
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
