// components/ProductUploadForm.js

import React, { useState } from 'react';

const ProductUploadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label htmlFor='name' className='block font-semibold mb-1'>
          Name:
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='border border-gray-300 px-2 py-1 rounded w-full'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='category' className='block font-semibold mb-1'>
          Category:
        </label>
        <input
          type='text'
          id='category'
          name='category'
          value={formData.category}
          onChange={handleChange}
          className='border border-gray-300 px-2 py-1 rounded w-full'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='price' className='block font-semibold mb-1'>
          Price:
        </label>
        <input
          type='number'
          id='price'
          name='price'
          value={formData.price}
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
      <div className='mb-4'>
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
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Upload
      </button>
    </form>
  );
};

export default ProductUploadForm;
