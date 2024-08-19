import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserItems } from "../../redux/userSlice";
import { createMiniItems } from "../../redux/miniItemSlice";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Miniroom from "../../assets/room.jpg";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import { MdDoubleArrow } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const MiniSettingRight = ({ userHome, me, selectedFolder }) => {
  const dispatch = useDispatch();
  const { userItems } = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemData, setItemData] = useState({
    img_url: "",
    category: "",
    item_name: "",
    x_location: "",
    y_location: "",
    enable: false,
  });

  // console.log("userHome", userHome);

  useEffect(() => {
    dispatch(fetchUserItems({ userId: me?._id }));
  }, [dispatch, me]);

  const uniqueItems = userItems.reduce((acc, current) => {
    const x = acc.find((item) => item.item_name === current.item_name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const skinItems = uniqueItems.filter((item) => item.category === "Miniroom");
  const minimeItems = uniqueItems.filter((item) => item.category === "Minime");
  const tempItems = uniqueItems.filter(
    (item) => item.category === selectedFolder
  );

  const handleSelection = (item) => {
    setSelectedItem(item);
    setItemData({
      img_url: item.item_img,
      category: item.category,
      item_name: item.item_name,
      x_location: "",
      y_location: "",
      enable: true,
    });
  };

  const handleSettingRoom = () => {
    dispatch(
      createMiniItems({ miniHomeId: userHome._id, miniItemData: itemData })
    );
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  if (!userItems || !minimeItems || !skinItems) {
    return <div>Loading...</div>; // 혹은 적절한 로딩 표시
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center font-semibold text-[#38b6d8] py-1 my-1">
        <span className="text-[0.7rem] flex items-center">
          Setting
          <MdKeyboardDoubleArrowRight size={16} />
        </span>
        <span className="mx-1">
          {selectedFolder?.toUpperCase() || "Miniroom"}
        </span>
      </div>

      <hr className="text-[#bbb] mb-2" />

      <div className="flex items-center w-full">
        <div className="flex flex-col w-full">
          <div className="bg-[#ddd] px-2 py-1 my-2 font-semibold text-[0.8rem] flex items-center">
            <span>Current {selectedFolder}</span>
          </div>
          <img
            src={
              userHome?.sub_img?.find(
                (img) =>
                  img?.img_url !== null && img?.category === selectedFolder
              )?.img_url ||
              (selectedFolder === "Minime" &&
                (me?.gender === "male" ? MinniMale : MinniFemale)) ||
              (selectedFolder === "Miniroom" ? Miniroom : undefined)
            }
            alt={userHome?.sub_img?.item_name}
            // className="object-cover w-full my-2 h-[140px]"
            className={` w-full h-[140px] my-2  ${
              selectedFolder === "Miniroom" && "object-cover"
            } ${selectedFolder === "Minime" && "object-contain"}`}
          />
          <p className="text-[0.8rem] mb-2 text-center">
            {userHome?.sub_img?.find(
              (img) => img?.img_url !== null && img?.category === selectedFolder
            )?.item_name || "Loading..."}
          </p>
        </div>
        <MdDoubleArrow className="mx-2" size={40} />
        {selectedItem ? (
          <div className="flex flex-col w-full">
            <div className="bg-[#ddd] px-2 py-1 my-2 font-semibold text-[0.8rem] flex items-center">
              <span>Selected {selectedFolder}</span>
            </div>
            <img
              src={selectedItem?.item_img}
              alt={selectedItem?.item_name}
              // className="object-cover w-full my-2 h-[140px]"
              className={` w-full h-[140px] my-2 ${
                selectedFolder === "Miniroom" && "object-cover"
              } ${selectedFolder === "Minime" && "object-contain"}`}
            />
            <p className="text-[0.8rem] mb-2 text-center">
              {selectedItem?.item_name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="bg-[#ddd] px-2 py-1 my-2 font-semibold text-[0.8rem] flex items-center">
              <span>Selected {selectedFolder}</span>
            </div>
            <div className="object-cover w-full my-2 h-[140px] border border-[#bbb]"></div>
            <p className="text-[0.8rem] mb-2 text-[#bbb] text-center">
              Please selected below
            </p>
          </div>
        )}
      </div>
      {selectedItem && (
        <div className="flex justify-center gap-2">
          <button
            className="bg-[#bbb] my-2 text-white text-[0.7rem] px-3 py-2 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-hightColor my-2 text-white text-[0.7rem] px-3 py-2 rounded-md"
            onClick={handleSettingRoom}
          >
            Apply
          </button>
        </div>
      )}
      <hr className={`text-[#bbb] my-2 ${selectedItem == null && "hidden"}`} />

      <div className="bg-[#ddd] px-2 py-1 my-2 font-semibold text-[0.8rem] flex items-center">
        <span>Select {selectedFolder}</span>
      </div>
      <div className="h-full text-[0.8rem] ">
        <div className="grid h-full grid-cols-2 gap-4 my-2">
          {tempItems?.map((item) => (
            <div
              key={item?._id}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <label htmlFor={item?._id} className="flex items-center">
                <input
                  type="radio"
                  id={item?._id}
                  name="selectedItem"
                  value={item._id}
                  onChange={() => handleSelection(item)}
                  checked={selectedItem?._id === item?._id}
                />
                <p className="mx-1">{item?.item_name}</p>
              </label>
              <img
                src={item?.item_img}
                alt={item?.item_name}
                className={` w-full h-[140px] ${
                  selectedFolder === "Miniroom" && "object-cover"
                } ${selectedFolder === "Minime" && "object-contain"}`}
              />
            </div>
          ))}
        </div>
        {/* <hr className="text-[#bbb] my-4" /> */}
        {/* <div className="grid grid-cols-3 gap-8">
          {minimeItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center justify-center w-32"
            >
              <label htmlFor={item._id} className="flex items-center">
                <input
                  type="radio"
                  id={item._id}
                  name="selectedItem"
                  value={item._id}
                  onChange={() => handleSelection(item)}
                  checked={selectedItem?._id === item._id}
                />
                <p className="mx-1">{item.item_name}</p>
              </label>
              <img
                src={item.item_img}
                alt={item.item_name}
                className="w-full"
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MiniSettingRight;
