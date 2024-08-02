import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  fetchAllCartsByUser,
  fetchCartItems,
  updateCart,
} from "../redux/cartSlice";
import { Buttons } from "../components";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { createHistory, fetchHistory } from "../redux/historySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ me, tokenFromStorage }) => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.cart);
  // const { history } = useSelector((state) => state.history);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCart, setSelectedCart] = useState("");
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [pointAlert, setPointAlert] = useState(false);

  useEffect(() => {
    if (me) {
      dispatch(fetchAllCartsByUser({ userId: me?._id }));
      dispatch(fetchHistory());
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
    setPointAlert(false);
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
    const itemIdsToDelete = selectedItems.map(
      (index) => selectedCartItems[index]._id
    );
    const remainingItems = selectedCartItems.filter(
      (item) => !itemIdsToDelete.includes(item._id)
    );

    if (remainingItems.length === 0) {
      await dispatch(deleteCart(selectedCart));
      setSelectedCart("");
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
    setDeleteMode(false);
  };

  const handleCheckout = async () => {
    if (totalCartItemPrice <= me.point) {
      setPointAlert(false);
      const selectedCartID = {
        cartId: selectedCart,
      };
      const resultAction = await dispatch(
        createHistory({ cartId: selectedCartID })
      );
      if (createHistory.fulfilled.match(resultAction)) {
        toast.success("Checkout successful!");
        // Update cart state after successful checkout
        dispatch(fetchAllCartsByUser({ userId: me?._id }));
        dispatch(fetchHistory());
        setSelectedCart("");
        setSelectedCartItems([]);
        setSelectedItems([]);
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } else {
      setPointAlert(true);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US");
  };

  // const totalPrice = selectedItems.reduce(
  //   (acc, index) => acc + selectedCartItems[index]?.item_price,
  //   0
  // );
  const totalCartItemPrice = selectedCartItems.reduce(
    (acc, item) => acc + item.item_price,
    0
  );

  // const totalItems = selectedItems.length;
  const availablePoints = me?.point || 0;

  useEffect(() => {
    if (availablePoints >= 0) {
      setPointAlert(false);
    }
  }, [availablePoints]);

  return (
    <div className="flex flex-col w-full h-full px-10 py-16 sm:px-20 md:px-40">
      <div className="mb-4 text-3xl font-bold">Cart</div>

      <div className="w-full mt-4">
        <div className="relative">
          <button
            className="w-full px-4 border border-[#ddd] p-2 rounded flex justify-between items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>
              {selectedCart
                ? `Cart ${
                    list.findIndex((cart) => cart._id === selectedCart) + 1
                  }`
                : "Select cart"}
            </span>
            {showDropdown ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
          </button>
          {showDropdown && (
            <div className="absolute w-full bg-white border border-[#ddd] rounded mt-1">
              {list.map((cart, index) => (
                <div
                  key={cart._id}
                  onClick={() => handleSelectCartChange(cart._id)}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-[#f5f5f5]"
                >
                  <div className="flex items-center">
                    <span>cart {index + 1}</span>
                    <span className="text-[0.7rem] mx-2 text-[#666]">
                      (Qty {list[index].shop_items.length})
                    </span>
                  </div>
                  <span>
                    {cart.updatedAt.substring(0, cart.updatedAt.indexOf("T"))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!selectedCart ? (
        <div className="my-20 text-center text-[#bbb]">Select your cart</div>
      ) : (
        <div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              {deleteMode && (
                <>
                  <input
                    type="checkbox"
                    checked={selectedItems.length === selectedCartItems.length}
                    onChange={handleSelectAll}
                    className="mr-2"
                  />
                  <label className="text-[0.8rem]">Select All</label>
                </>
              )}
            </div>
            {!deleteMode ? (
              <Buttons
                onClick={() => setDeleteMode(true)}
                containerStyles="text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]"
                title="Delete"
              />
            ) : (
              <div className="flex gap-2">
                <Buttons
                  onClick={() => setDeleteMode(false)}
                  containerStyles="text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]"
                  title="Cancel"
                />
                <Buttons
                  onClick={handleDeleteSelected}
                  containerStyles="text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]"
                  title="Delete Selected"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div>
              {selectedCartItems.length === 0 ? (
                <div className="text-center text-[#bbb]">
                  No items in this cart
                </div>
              ) : (
                selectedCartItems.map((cartItem, index) => (
                  <div
                    key={cartItem._id}
                    className="border-b border-[#aaa] py-3 flex items-center gap-8"
                  >
                    {deleteMode ? (
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className="mr-2"
                      />
                    ) : (
                      <span className="mr-2">{index + 1}</span>
                    )}
                    <img
                      src={cartItem.item_img || "placeholder-image-url"}
                      alt={cartItem.item_name}
                      className="w-24 h-24 mb-2"
                    />
                    <div className="flex items-center justify-between w-full h-full">
                      <div>
                        <p className="text-[0.7rem]">
                          {cartItem.category?.name || "No Category"}
                        </p>
                        <p className="text-lg font-semibold text-[1rem]">
                          {cartItem.item_name}
                        </p>
                      </div>
                      <p className="text-[1rem] mt-2">
                        ${formatPrice(cartItem.item_price)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-end my-8 rounded-md text-[0.9rem]">
            <div className="flex flex-col items-end w-1/2 p-4 bg-white shadow-lg">
              <div className="w-full mb-4 text-lg font-semibold">
                Payment Information
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Items Qty:</p>
                <p>{selectedCartItems?.length}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Total Price:</p>
                <p>${formatPrice(totalCartItemPrice)}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <p>Available Points:</p>
                <p>${formatPrice(availablePoints)}</p>
              </div>
              {pointAlert && (
                <p className="text-[#f64949fe] text-[0.7rem] mt-1">
                  Your points are insufficient by
                  <strong>
                    {" "}
                    ${formatPrice(-1 * (availablePoints - totalCartItemPrice))}
                  </strong>
                  . Please recharge and try again.
                </p>
              )}
            </div>
            <div className="flex gap-4 my-4">
              <Buttons
                containerStyles="text-[0.8rem] px-4 py-2 rounded bg-black text-white"
                title="Checkout"
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
