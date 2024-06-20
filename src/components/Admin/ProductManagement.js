import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems, deleteItem, updateItem } from "../../redux/itemSlice"; // selectItem을 추가해요
import NoticeModal from "../Modal/NoticeModal";
import UploadImge from "../Modal/UploadImage";
import AdminSidebar from "./AdminSidebar";
import ProductUpload from "./ProductUpload";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { fetchCategories } from "../../redux/categorySlice";

const ProductManagement = ({ me }) => {
  const dispatch = useDispatch();
  const { list, all } = useSelector((state) => state.item);
  const { categories } = useSelector((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [isEditItem, setIsEditItem] = useState(false);

  useEffect(() => {
    dispatch(fetchAllItems());
    dispatch(fetchCategories());
  }, [dispatch, list, openImageModal]);
  // console.log("categories ", categories);

  const handleDeleteItems = () => {
    dispatch(deleteItem({ itemId: selectedProduct }));
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  const toggleItemSelection = (itemId) => {
    setSelectedProduct(itemId);
  };

  const openModalForImageUpload = (product) => {
    setSelectedProduct(product);
    setOpenImageModal(true);
  };

  const closeModal = () => {
    setOpenImageModal(false);
  };

  const handleEditClick = (itemId, itemName, itemPrice, categoryId) => {
    setIsEditItem(!isEditItem);
    setSelectedProduct(itemId);
    setNewItemName(itemName);
    setNewItemPrice(itemPrice);
    setNewItemCategory(categoryId);
  };

  const handleUpdate = (itemId, itemName, itemPrice, categoryId) => {
    // if (
    //   !newItemName ||
    //   newItemName.trim() === "" ||
    //   !newItemPrice ||
    //   !newItemCategory ||
    //   newItemCategory.trim() === ""
    // )
    //   return;
    dispatch(
      updateItem({
        itemId,
        itemData: {
          item_name: itemName,
          item_price: itemPrice.toString(),
          category: categoryId,
        },
      })
    );
    setNewItemName("");
    setSelectedProduct(null);
  };

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-16 sm:px-20 md:px-40">
      <AdminSidebar />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Product Management</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDeleteItems}
              className="border border-black px-4 py-2 rounded text-[0.7rem]"
            >
              Delete Selected
            </button>
            <button
              onClick={toggleUploadForm}
              className={` px-4 py-2 rounded text-[0.7rem] ${
                showUploadForm
                  ? "bg-[#ddd] text-black "
                  : "bg-black text-white "
              }`}
            >
              {showUploadForm ? "Close Upload Form" : "Upload Product"}
            </button>
          </div>
        </div>

        {showUploadForm && <ProductUpload onUpload={toggleUploadForm} />}

        <div
          className={`overflow-y-auto bg-white shadow-md mt-4
          ${showUploadForm ? "h-[40vh]" : "h-[55vh]"}`}
        >
          <table className="relative w-full text-left border-collapse text-[0.8rem] ">
            <thead className="sticky top-0 h-[50px]">
              <tr className="bg-[#eee] border-b border-[#bbb]  rounded-lg text-[#343434]">
                <th className="p-2 pl-8 ">#</th>
                <th className="p-2 ">IMAGE</th>
                <th className="p-2 ">ITEM NAME</th>
                <th className="p-2 ">CATEGORY</th>
                <th className="p-2 ">PRICE</th>
                <th className="p-2 pr-8 "></th>
              </tr>
            </thead>
            {all
              .filter((item) =>
                item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <tbody key={product._id}>
                  {selectedProduct === product._id ? (
                    <tr className="border-t border-[#bbb]">
                      <td className="p-2 pl-8 ">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={() => toggleItemSelection(product._id)}
                          className="mr-2"
                          disabled
                        />
                      </td>
                      <td className="flex items-center p-2">
                        <img
                          src={product.item_img}
                          alt={product.item_name}
                          className="w-[3rem] h-[3rem]"
                        />
                        <MdOutlineFileUpload
                          onClick={() => openModalForImageUpload(product)}
                          className=" text-[1.4rem] ml-2"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          className="border border-[#bbb] p-1 rounded-lg"
                        />
                      </td>

                      <td className="p-2">
                        {/* <input
                          type="text"
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="border border-[#bbb] p-1 rounded-lg"
                        /> */}
                        <div>
                          {/* <div
                            onClick={toggleDropdown}
                            className="cursor-pointer border border-[#bbb] px-2 py-2 rounded w-full"
                          >
                            {selectedCategory || "Select a category"}
                          </div> */}
                          {/* {isOpen && ( */}
                          <select
                            name="items"
                            className=" w-full bg-white border border-[#bbb] 
                            rounded mt-1 max-h-60 overflow-auto "
                          >
                            {categories.map((category) => (
                              <option
                                key={category._id}
                                onClick={() => handleSelect(category._id)}
                                className="px-2 py-2 cursor-pointer hover:bg-[#ddd]"
                              >
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {/* )} */}
                        </div>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(e.target.value)}
                          className="border border-[#bbb] p-1 rounded-lg"
                        />
                      </td>
                      <td className="w-[150px] p-2 pr-8">
                        <button
                          className={`w-full bg-black text-white rounded-lg 
                      py-2 px-2 text-[0.7rem] `}
                          onClick={() =>
                            handleUpdate(
                              product._id,
                              product.item_name,
                              product.item_price,
                              product.category?._id
                            )
                          }
                        >
                          Save
                        </button>

                        <button
                          onClick={handleEditClick}
                          className="w-full mt-2 border border-[#bbb] rounded-lg py-2 px-1 text-[0.7rem]"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr className="border-t border-[#bbb]">
                      <td className="p-2 pl-8 ">
                        <input
                          type="checkbox"
                          checked={product.selected}
                          onChange={() => toggleItemSelection(product._id)}
                          className="mr-2"
                        />
                      </td>
                      <td className="p-2">
                        <img
                          src={product.item_img}
                          alt={product.item_name}
                          className="w-[3rem] h-[3rem]"
                        />
                      </td>
                      <td className="p-2">{product.item_name}</td>
                      <td className="p-2">{product.category?.name}</td>
                      <td className="p-2">${product.item_price}</td>
                      <td className="w-[180px] p-2 pr-8 ">
                        <button
                          className={`flex items-center justify-between gap-2 w-full bg-[#ddd] rounded-lg 
                      py-2 px-4 text-[0.7rem] ${
                        !product.item_img
                          ? "bg-black text-white"
                          : "cursor-not-allowed text-[#888]"
                      }`}
                          onClick={() => openModalForImageUpload(product)}
                          disabled={!!product.item_img}
                        >
                          <MdOutlineFileUpload className=" text-[1rem]" />
                          <span>Upload Image</span>
                        </button>

                        <button
                          onClick={() =>
                            handleEditClick(
                              product._id,
                              product.item_name,
                              product.item_price,
                              product.category?.name
                            )
                          }
                          className="flex items-center justify-between w-full mt-2 border border-[#bbb] rounded-lg py-2 px-4 text-[0.7rem]"
                        >
                          <FaRegEdit className=" text-[1rem]" />
                          <span>Edit Item</span>
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
          </table>

          {openImageModal && (
            <NoticeModal closeModal={closeModal}>
              <UploadImge
                closeModal={() => setOpenImageModal(false)}
                selectedProduct={selectedProduct}
                me={me}
              />
            </NoticeModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
