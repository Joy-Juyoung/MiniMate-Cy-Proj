import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categorySlice';
import { createItem } from '../../redux/itemSlice';

const ProductUploadForm = ({ onSubmit, setNextUploadForm, nextUploadForm }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // setFormData((prevState) => ({
    //   ...prevState,
    //   category: categoryId,
    // })); // Pass the selected category _id to the parent component
    setIsOpen(false);
  };

  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    item_price: '',
    description: '',
  });

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
    // onSubmit(formData);
    dispatch(createItem({ itemData: formData }));
    // setNextUploadForm(!nextUploadForm);
  };

  return (
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
          className='border border-[#bbb] px-2 py-1 rounded w-full'
          required
        />
      </div>
      {/* <div className='mb-4'> */}
      {/* <label className='block font-semibold mb-1'>Category:</label> */}
      <div className='relative'>
        <div
          onClick={toggleDropdown}
          className='cursor-pointer border border-[#bbb] px-2 py-1 rounded w-full'
        >
          {selectedCategory || 'Select a category'}
        </div>
        {isOpen && (
          <div className='absolute z-10 w-full bg-white border border-[#bbb] rounded mt-1 max-h-60 overflow-auto'>
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleSelect(category._id)}
                className='px-2 py-1 hover:bg-gray-100 cursor-pointer'
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* </div> */}
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
          className='border border-[#bbb] px-2 py-1 rounded w-full'
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
          className='border border-[#bbb] px-2 py-1 rounded w-full'
          required
        />
      </div>
      <button
        type='submit'
        className='bg-black text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Upload
      </button>
    </form>
  );
};

export default ProductUploadForm;
