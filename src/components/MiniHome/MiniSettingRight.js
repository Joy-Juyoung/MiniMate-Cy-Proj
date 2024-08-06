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

  if (!userItems) {
    return <div>Loading...</div>; // 혹은 적절한 로딩 표시
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between px-2 py-1 my-2">
        <h2 className="font-semibold">Setting</h2>
      </div>

      <hr className="text-[#bbb] mb-4" />

      {selectedItem && (
        <div className="mt-4">
          <h3>Selected Item</h3>
          <img
            src={selectedItem.item_img}
            alt={selectedItem.item_name}
            className="w-28"
          />
          <p>{selectedItem.item_name}</p>
        </div>
      )}
      <button onClick={handleSettingRoom}>Apply</button>
      <hr className="text-[#bbb] my-4" />
      <div className="h-full text-[0.8rem]">
        <div className="grid grid-cols-2 gap-8">
          {skinItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center justify-center w-full"
            >
              <input
                type="radio"
                id={item._id}
                name="selectedItem"
                value={item._id}
                onChange={() => handleSelection(item)}
                checked={selectedItem?._id === item._id}
              />
              <label htmlFor={item._id}>
                <img
                  src={item.item_img}
                  alt={item.item_name}
                  className="object-cover w-full h-full"
                />
                <p>{item.item_name}</p>
              </label>
            </div>
          ))}
        </div>
        <hr className="text-[#bbb] my-4" />
        <div className="grid grid-cols-3 gap-8">
          {minimeItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center justify-center w-32"
            >
              <input
                type="radio"
                id={item._id}
                name="selectedItem"
                value={item._id}
                onChange={() => handleSelection(item)}
                checked={selectedItem?._id === item._id}
              />
              <label htmlFor={item._id}>
                <img
                  src={item.item_img}
                  alt={item.item_name}
                  className="w-full"
                />
                <p>{item.item_name}</p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniSettingRight;
