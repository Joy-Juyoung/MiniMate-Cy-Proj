import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createHistory,
  deleteCart,
  fetchAllCartsByUser,
  fetchCartItems,
  updateCart,
} from '../redux/cartSlice';
import { Buttons } from '../components';
import { BiSolidDownArrow } from 'react-icons/bi';
import { updateMe } from '../redux/userSlice';

const Cart = ({ me, tokenFromStorage }) => {
  const dispatch = useDispatch();
  const { item, list, loading } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCart, setSelectedCart] = useState('');
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // console.log('list', list);

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

  const handleSelectCartChange = (cartId) => {
    setSelectedCart(cartId);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (selectedCart) {
      dispatch(fetchCartItems({ cartId: selectedCart })).then((action) => {
        setCartItems(action.payload.shop_items);
      });
    }
  }, [dispatch, selectedCart]);

  const handleCheckboxChange = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === selectedCartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(selectedCartItems.map((_, index) => index));
    }
  };

  const handleDeleteSelected = async () => {
    // const updatedCartItems = selectedCartItems.filter(
    //   (_, index) => !selectedItems.includes(index)
    // );
    // setCartItems(updatedCartItems);
    // setSelectedItems([]);
    const itemIdsToDelete = selectedItems.map(
      (index) => selectedCartItems[index]._id
    );
    const remainingItems = selectedCartItems.filter(
      (item) => !itemIdsToDelete.includes(item._id)
    );

    if (remainingItems.length === 0) {
      await dispatch(deleteCart(selectedCart));
      setSelectedCart('');
      setSelectedCartItems([]);
    } else {
      const cartData = {
        user: me._id,
        shop_items: remainingItems.map((item) => item._id),
        total_price: remainingItems.reduce(
          (acc, item) => acc + item.item_price,
          0
        ),
        total_qty: remainingItems.length,
      };
      await dispatch(updateCart({ cartId: selectedCart, cartData }));
      setSelectedCartItems(remainingItems);
    }

    setSelectedItems([]);
  };

  const handleCheckout = () => {
    if (totalPrice <= me.point) {
      // const updatedUserInfo = {
      //   ...me,
      //   point: me.point - totalPrice,
      // };
      // dispatch(updateMe({ userData: updatedUserInfo }));
      const selectedCartID = {
        cartId: selectedCart,
      };
      dispatch(createHistory({ cartId: selectedCartID }));
    } else {
      alert('Insufficient points');
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-US');
  };

  const totalPrice = selectedItems.reduce(
    (acc, index) => acc + selectedCartItems[index]?.item_price,
    0
  );
  const totalItems = selectedItems.length;
  const availablePoints = me?.point || 0;

  return (
    <div className='w-full h-full flex flex-col py-16 px-10 sm:px-20 md:px-40'>
      <div className='text-3xl font-bold mb-4'>Cart</div>

      <div className='mt-4 w-full'>
        <div className='relative'>
          <button
            className='w-full px-4 border border-[#ddd] p-2 rounded flex justify-between items-center'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>
              {selectedCart
                ? `Cart ${
                    list.findIndex((cart) => cart._id === selectedCart) + 1
                  }`
                : 'Select cart'}
            </span>
            <BiSolidDownArrow />
          </button>
          {showDropdown && (
            <div className='absolute w-full bg-white border border-[#ddd] rounded mt-1'>
              {list.map((cart, index) => (
                <div
                  key={cart._id}
                  onClick={() => handleSelectCartChange(cart._id)}
                  className='flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-[#f5f5f5]'
                >
                  <div className='flex items-center'>
                    <span>cart {index + 1}</span>
                    <span className='text-[0.7rem] mx-2 text-[#666]'>
                      (Qty {list[index].shop_items.length})
                    </span>
                  </div>
                  <span>
                    {cart.updatedAt.substring(0, cart.updatedAt.indexOf('T'))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!selectedCart ? (
        <div className='my-20 text-center text-[#bbb]'>Select your cart</div>
      ) : (
        <div>
          <div className='flex justify-between items-center my-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={selectedItems.length === selectedCartItems.length}
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
          <div className='flex flex-col'>
            <div>
              {selectedCartItems.length === 0 ? (
                <div className='text-center text-[#bbb]'>
                  No items in this cart
                </div>
              ) : (
                selectedCartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className='border-b border-[#aaa] py-3 flex items-center gap-8'
                  >
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      className='mr-2'
                    />
                    <img
                      src={item.item_img || 'placeholder-image-url'}
                      alt={item.item_name}
                      className='w-24 h-24 mb-2'
                    />
                    <div className='w-full h-full flex justify-between items-center'>
                      <div>
                        <p className='text-[0.7rem]'>
                          {item.category?.name || 'No Category'}
                        </p>
                        <p className='text-lg font-semibold text-[1rem]'>
                          {item.item_name}
                        </p>
                      </div>
                      <p className='text-[1rem] mt-2'>
                        ${formatPrice(item.item_price)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className='w-full flex flex-col items-end my-8 rounded-md text-[0.9rem]'>
            <div className='w-1/2 flex flex-col items-end bg-white p-4 shadow-lg'>
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
                containerStyles='text-[0.8rem] px-4 py-2 rounded bg-black text-white'
                title='Checkout'
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
