import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserItems } from "../../redux/userSlice";
import { createMiniItems } from "../../redux/miniItemSlice";

const MiniSettingRight = ({ userHome, me }) => {
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
      <div className="flex items-center justify-between px-2 py-1 my-2">
        <h2 className="font-semibold">Custom</h2>
      </div>

      <hr className="text-[#bbb] mb-4" />

      {selectedItem && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-[0.7rem] font-semibold mb-2">Selected Item</h3>
            <img
              src={selectedItem.item_img}
              alt={selectedItem.item_name}
              className="w-28"
            />
            <p>{selectedItem.item_name}</p>
          </div>
          <div className="flex gap-2">
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
        </div>
      )}
      <hr className={`text-[#bbb] my-2 ${selectedItem == null && "hidden"}`} />

      <div className="h-full text-[0.8rem] ">
        <div className="grid grid-cols-3 gap-8">
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
        </div>
        <hr className="text-[#bbb] my-4" />
        <div className="grid h-full grid-cols-2 gap-8 ">
          {skinItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center justify-center w-full h-full"
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
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniSettingRight;
