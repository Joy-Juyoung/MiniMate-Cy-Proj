import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems, deleteItem, updateItem } from "../../redux/itemSlice";
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

  const handleDeleteItems = (itemId) => {
    dispatch(deleteItem({ itemId }));
  };

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  const openModalForImageUpload = (productId) => {
    setSelectedProduct(productId);
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
    setNewItemCategory(categoryId);
  };

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-16 sm:px-20 md:px-40">
      <AdminSidebar />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Product Management</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleUploadForm}
              className={`px-4 py-2 rounded text-[0.7rem] ${
                showUploadForm ? "bg-[#ddd] text-black" : "bg-black text-white"
              }`}
            >
              {showUploadForm ? "Close Upload Form" : "Upload Product"}
            </button>
          </div>
        </div>

        {showUploadForm && <ProductUpload onUpload={toggleUploadForm} />}

        <div
          className={`overflow-y-auto bg-white shadow-md mt-4 ${
            showUploadForm ? "h-[40vh]" : "h-[55vh]"
          }`}
        >
          <table className="relative w-full text-left border-collapse text-[0.8rem] table-fixed">
            <thead className="sticky top-0 h-[50px]">
              <tr className="bg-[#eee] border-b border-[#bbb] rounded-lg text-[#343434]">
                <th className="p-2 pl-4 md:pl-8 w-[10%]">ID</th>
                <th className="p-2 w-[15%]">IMAGE</th>
                <th className="p-2 w-[25%]">ITEM NAME</th>
                <th className="p-2 w-[25%]">CATEGORY</th>
                <th className="p-2 w-[10%]">PRICE</th>
                <th className="p-2 pr-8 w-[15%]"></th>
              </tr>
            </thead>
            <tbody>
              {all
                .filter((item) =>
                  item.item_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <tr
                    key={product._id}
                    className={`border-t border-[#bbb] ${
                      selectedProduct === product._id ? "bg-[#fff7dc]" : ""
                    }`}
                  >
                    <td className="p-2 pl-4 md:pl-8">
                      {product._id.slice(-5)}
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col  justify-center items-center min-h-[5rem] ">
                        <img
                          src={product.item_img}
                          alt={product.item_name}
                          className={`max-w-[9rem] max-h-[6rem] min-h-[5rem] transition-transform duration-200 hover:scale-[1.8]
                             ${product.item_img === null && "hidden"}`}
                        />
                        {/* {selectedProduct === product._id && ( */}
                        <button
                          className={`flex items-center justify-center gap-2 w-full max-w-[9rem]   rounded-lg py-2 px-4 text-[0.7rem] mt-2
                            ${
                              product.item_img !== null &&
                              selectedProduct === product._id
                                ? "flex bg-none text-black border border-[#ddd] hover:bg-white"
                                : "bg-hightColor text-white"
                            }
                            ${
                              product.item_img !== null &&
                              selectedProduct !== product._id &&
                              "hidden"
                            }                        
                            `}
                          onClick={() => openModalForImageUpload(product._id)}
                        >
                          <MdOutlineFileUpload className="text-[1.2rem]" />
                          <span>
                            {product.item_img !== null &&
                            selectedProduct === product._id
                              ? "Re-Upload"
                              : "Upload Image"}
                          </span>
                        </button>
                        {/* )} */}
                      </div>
                    </td>
                    <td className="p-2">
                      {selectedProduct === product._id ? (
                        <input
                          type="text"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          className="border border-[#bbb] p-1 rounded-lg w-full"
                        />
                      ) : (
                        product.item_name
                      )}
                    </td>
                    <td className="p-2">
                      {selectedProduct === product._id ? (
                        <select
                          name="items"
                          className="w-full p-1 bg-white border border-[#bbb] rounded-lg mt-1 max-h-60 overflow-auto"
                          onChange={(e) => handleSelect(e.target.value)}
                          value={newItemCategory}
                        >
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        product.category?.name
                      )}
                    </td>
                    <td className="p-2">
                      {selectedProduct === product._id ? (
                        <input
                          type="text"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(e.target.value)}
                          className="border border-[#bbb] p-1 rounded-lg w-full"
                        />
                      ) : (
                        `$${product.item_price}`
                      )}
                    </td>
                    <td className="p-2 pr-8">
                      {selectedProduct === product._id ? (
                        <div className="flex items-center gap-2">
                          <button
                            className="w-full bg-black text-white rounded-lg py-2 px-2 text-[0.7rem]"
                            onClick={() =>
                              handleUpdate(
                                product._id,
                                newItemName,
                                newItemPrice,
                                newItemCategory
                              )
                            }
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditClick}
                            className="w-full border border-[#bbb] rounded-lg py-2 px-1 text-[0.7rem]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleEditClick(
                                product._id,
                                product.item_name,
                                product.item_price,
                                product.category?._id
                              )
                            }
                            className="w-full border rounded-lg py-2 px-4 text-[0.7rem]"
                          >
                            {/* <FaRegEdit className="text-[1rem]" /> */}
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteItems(product._id)}
                            className="w-full bg-[#ddd]  rounded-lg py-2 px-4 text-[0.7rem] "
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
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
