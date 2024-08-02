import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems, fetchAllItemsByCategory } from "../redux/itemSlice";
import { fetchCategories } from "../redux/categorySlice";
import { fetchUserItems } from "../redux/userSlice";
import { createCart } from "../redux/cartSlice";
import { GoPlus } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { Loading } from "../components";
import AddToCartBar from "../components/AddToCartBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = () => {
  const dispatch = useDispatch();
  const {
    list: items,
    loading: itemsLoading,
    all,
  } = useSelector((state) => state.item);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { me, userItems } = useSelector((state) => state.user);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [tempCartItems, setTempCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllItems());
    if (me) {
      dispatch(fetchUserItems({ userId: me._id }));
    }
  }, [dispatch, me]);

  useEffect(() => {
    if (cartSidebarOpen) {
      const storedTempCartItems =
        JSON.parse(localStorage.getItem("tempCartItems")) || [];
      setTempCartItems(storedTempCartItems);
    }
  }, [cartSidebarOpen]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      dispatch(fetchAllItemsByCategory({ categoryId }));
    } else {
      dispatch(fetchAllItems());
    }
  };

  const handleAddToTempCart = (item) => {
    if (userItems.some((userItem) => userItem.item_img === item.item_img)) {
      toast.error("You already own this item.");
      setCartSidebarOpen(false);
    } else if (tempCartItems.some((cartItem) => cartItem._id === item._id)) {
      toast.warning("Item is already in the cart");
      setCartSidebarOpen(false);
    } else {
      const updatedTempCartItems = [...tempCartItems, item];
      setTempCartItems(updatedTempCartItems);
      localStorage.setItem(
        "tempCartItems",
        JSON.stringify(updatedTempCartItems)
      );
      setError("");
      setCartSidebarOpen(true);
    }
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
    localStorage.removeItem("tempCartItems");
    setCartSidebarOpen(false);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#fff9e7] flex pb-28 sm:pb-12 pt-12 px-10 sm:px-20 md:px-40">
      <div className="flex flex-col w-full h-full ">
        <div className="mb-4 text-3xl font-bold md:text-4xl md:mb-8 ">SHOP</div>
        <div className="grid items-center w-full h-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categoriesLoading ? (
            <Loading />
          ) : (
            <>
              <div
                className={`cursor-pointer w-full h-full text-sm text-center px-5 py-2 rounded-lg border ${
                  selectedCategory === null
                    ? " bg-black text-white shadow-md border-white"
                    : "border-[#ddd] bg-white shadow-md hover:bg-[#00000052]"
                } flex items-center justify-center`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </div>
              {categories
                .filter((category) => category.kind.toLowerCase() === "shop")
                .map((category) => (
                  <div
                    key={category._id}
                    className={`cursor-pointer w-full text-sm text-center px-5 py-2 rounded-lg border ${
                      selectedCategory === category._id
                        ? " bg-black text-white shadow-md border-white"
                        : "border-[#ddd] bg-white shadow-md hover:bg-[#00000052]"
                    }`}
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    {category.name}
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="w-full h-full my-12">
          <div className="grid items-stretch w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-8">
            {itemsLoading ? (
              <span className="dots-container"></span>
            ) : (selectedCategory === null ? all : items).filter(
                (item) => item.item_img !== null && item.category !== null
              ).length === 0 ? (
              <div className="w-full py-4 text-[#bbb]">
                Sorry, this page is empty.
              </div>
            ) : (
              (selectedCategory === null ? all : items)
                .filter(
                  (item) => item.item_img !== null && item.category !== null
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer text-sm w-full flex flex-col items-center justify-between shadow-md bg-white border border-[#ccc] rounded-lg hover:scale-[1.05] ease-in-out duration-300"
                  >
                    <img
                      src={item.item_img}
                      alt={item.item_name}
                      className="w-full h-[10rem] object-contain rounded-lg mt-4"
                    />
                    <div className="flex flex-col justify-between flex-grow w-full px-4 py-3">
                      <div className="flex justify-between w-full item-center">
                        <div className="item-name">{item.item_name}</div>
                        <div className="item-price">🧀 {item.item_price}</div>
                      </div>
                      <button
                        className="w-full text-[0.8rem] flex items-center justify-center bg-[#f5f5f5] rounded-lg py-2 mt-2 text-black hover:bg-hightColor hover:text-white"
                        onClick={() => handleAddToTempCart(item)}
                      >
                        <GoPlus className="mr-1" size={15} /> Add to cart
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
            setTempCartItems={setTempCartItems}
            tempCartItems={tempCartItems}
            error={error}
            handleSaveCart={handleSaveCart}
            handleCreateCart={handleCreateCart}
            setCartSidebarOpen={setCartSidebarOpen}
          />
        )}

        <button
          className={`${cartSidebarOpen && "hidden"}
            fixed p-4 hover:text-hightColor transform -translate-y-1/2 bg-secondary rounded-full shadow-lg right-0 top-1/2 `}
          style={{ zIndex: 1000 }}
          onClick={() => setCartSidebarOpen(true)}
        >
          <FaShoppingCart size={24} />
        </button>
        <ToastContainer
          position="bottom-center" // 하단 중앙에 위치하도록 설정
          autoClose={5000} // 자동으로 닫히는 시간 설정 (밀리초)
          // hideProgressBar // 진행 바 숨김
          newestOnTop // 최신 토스트가 위에 오도록 설정
          closeOnClick // 클릭 시 닫히도록 설정
          rtl={false} // 오른쪽에서 왼쪽으로 읽는 방향 설정 (여기서는 false)
          pauseOnFocusLoss // 포커스가 사라질 때 일시 정지 설정
          draggable // 드래그 가능하도록 설정
          pauseOnHover // 호버 시 일시 정지 설정
        />
      </div>
    </div>
  );
};

export default Shop;
