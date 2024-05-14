import React, { useState } from 'react';
import Image1 from '../assets/minime(2).gif';
import Image2 from '../assets/miniroom1.gif';
import Image3 from '../assets/minime(10).gif';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllCartsByUser, fetchCartItems } from '../redux/cartSlice';
import { Buttons } from '../components';

const Cart = ({ me }) => {
  const dispatch = useDispatch();
  const { item, list } = useSelector((state) => state.cart);

  // console.log('me', me?._id);

  useEffect(() => {
    dispatch(fetchAllCartsByUser({ userId: me?._id }));
    dispatch(fetchCartItems({ cartId: list[0]?._id }));
  }, [dispatch]);
  console.log('item', item);

  const [cartItems, setCartItems] = useState(item?.shop_items || null);
  console.log('list', list[0]);

  const [selectedItems, setSelectedItems] = useState([
    ...Array(cartItems?.length).keys(),
  ]); // 모든 아이템을 선택된 상태로 시작

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
    if (selectedItems.length === cartItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...Array(cartItems?.length).keys()]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedCartItems = cartItems?.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setCartItems(updatedCartItems);
    setSelectedItems([]);
  };

  const totalPrice = selectedItems?.reduce(
    (acc, index) => acc + cartItems[index]?.item_price,
    0
  );
  const totalItems = selectedItems.length;
  const availablePoints = me?.point;

  return (
    <div className='w-full h-[100vh] flex flex-col py-16 px-10 2xl:px-40'>
      <div className='text-3xl font-bold mb-4'>Cart</div>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <input
            type='checkbox'
            checked={selectedItems.length === cartItems?.length}
            onChange={handleSelectAll}
            className='mr-2'
          />
          <label className=''>Select All</label>
        </div>
        <Buttons
          onClick={handleDeleteSelected}
          className='px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]'
          title='Delete Selected'
        />
      </div>
      <div className='flex flex-col'>
        {cartItems?.map((item, index) => (
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
      <div className='mt-8'>
        <h2 className='text-xl font-semibold'>Payment Information</h2>
        <p>Items Qty: {totalItems}</p>
        <p>Total Price: ${formatPrice(totalPrice)}</p>
        <p>Available Points: ${formatPrice(availablePoints)}</p>
        <p>Remaining Balance: ${formatPrice(availablePoints - totalPrice)}</p>
      </div>

      <div className='my-4 flex gap-4'>
        <Buttons
          className='px-4 py-2 rounded hover:bg-blue-600 ml-2'
          title='Checkout'
        />
      </div>
    </div>
  );
};

export default Cart;
