import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice";
import { createItem } from "../../redux/itemSlice";
import ProductUploadForm from "./ProductUploadForm";
import { BiSolidDownArrow } from "react-icons/bi";

const ProductUpload = ({ onUpload }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [formData, setFormData] = useState({
    item_name: "",
    category: selectedCategoryId || "",
    item_price: "",
    description: "",
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (category) => {
    setSelectedCategory(category.name);
    setSelectedCategoryId(category._id);
    setFormData((prevState) => ({ ...prevState, category: category._id }));
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(formData);
    dispatch(createItem({ itemData: formData }));
  };

  return (
    <div className="px-6 py-4 mb-4 border border-[#bbb] rounded-md">
      <h2 className="text-[1rem] font-semibold mb-4">Product Upload</h2>

      <form onSubmit={handleSubmit}>
        <div className="text-[0.8rem] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="mb-4 ">
            <label htmlFor="item_name" className="block mb-1 font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="item_name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-[#bbb] rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-1 font-semibold">
              Category:
            </label>
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center justify-between border border-[#bbb] px-2 py-1 rounded w-full"
              >
                <span>{selectedCategory || "Select a category"}</span>
                <BiSolidDownArrow />
              </div>
              {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-[#bbb] rounded mt-1 max-h-60 overflow-auto">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      onClick={() => handleSelect(category)}
                      className="px-2 py-1 cursor-pointer hover:bg-[#bbb]"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="item_price" className="block mb-1 font-semibold">
              Price:
            </label>
            <input
              type="number"
              id="item_price"
              name="item_price"
              value={formData.item_price}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-[#bbb] rounded"
              required
            />
          </div>
          {/* <div className='mb-4'>
            <label htmlFor='description' className='block mb-1 font-semibold'>
              Description:
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full px-2 py-1 border border-gray-300 rounded'
              required
            />
          </div> */}
        </div>
        <div className="flex justify-end w-full ">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-black rounded
          text-[0.7rem] "
          >
            Upload Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
