import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categorySlice';
import { createItem } from '../../redux/itemSlice';
import ProductUploadForm from './ProductUploadForm';
import { BiSolidDownArrow } from 'react-icons/bi';

const ProductUpload = ({ onUpload }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [formData, setFormData] = useState({
    item_name: '',
    category: selectedCategoryId || '',
    item_price: '',
    description: '',
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
    <div>
      <h3 className='text-lg font-semibold mb-2'>Product Upload</h3>

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='item_name' className='block font-semibold mb-1'>
            Name:
          </label>
          <input
            type='text'
            id='item_name'
            name='item_name'
            value={formData.item_name}
            onChange={handleChange}
            className='border border-gray-300 px-2 py-1 rounded w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='category' className='block font-semibold mb-1'>
            Category:
          </label>
          <div className='relative'>
            <div
              onClick={toggleDropdown}
              className='cursor-pointer flex items-center justify-between border border-[#bbb] px-2 py-1 rounded w-full'
            >
              <span>{selectedCategory || 'Select a category'}</span>
              <BiSolidDownArrow />
            </div>
            {isOpen && (
              <div className='absolute z-10 w-full bg-white border border-[#bbb] rounded mt-1 max-h-60 overflow-auto'>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => handleSelect(category)}
                    className='px-2 py-1 hover:bg-gray-100 cursor-pointer'
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='item_price' className='block font-semibold mb-1'>
            Price:
          </label>
          <input
            type='number'
            id='item_price'
            name='item_price'
            value={formData.item_price}
            onChange={handleChange}
            className='border border-gray-300 px-2 py-1 rounded w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block font-semibold mb-1'>
            Description:
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='border border-gray-300 px-2 py-1 rounded w-full'
            required
          />
        </div>
        {/* <div className='mb-4'>
        <label htmlFor='image' className='block font-semibold mb-1'>
          Image:
        </label>
        <input
          type='file'
          id='image'
          name='image'
          onChange={handleImageChange}
          className='border border-gray-300 px-2 py-1 rounded w-full'
          required
        />
      </div> */}
        <button
          type='submit'
          className='bg-black text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
