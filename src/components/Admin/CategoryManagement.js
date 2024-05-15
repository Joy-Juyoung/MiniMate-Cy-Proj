// components/CategoryManagement.js

import React, { useState } from 'react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category A' },
    { id: 2, name: 'Category B' },
    { id: 3, name: 'Category C' },
  ]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') {
      setError('카테고리 이름을 입력해주세요.');
      return;
    }
    if (
      categories.some((category) => category.name === newCategoryName.trim())
    ) {
      setError('이미 존재하는 카테고리입니다.');
      return;
    }

    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName.trim(),
    };
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setError('');
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>Category Management</h2>
      {/* Category List */}
      <div className='border border-gray-200 p-4 rounded shadow mb-4'>
        <h3 className='text-lg font-semibold mb-2'>Category List</h3>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className='flex items-center justify-between border-b border-gray-200 py-2'
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className='text-red-500 hover:text-red-700'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Add Category */}
      <div className='mb-4'>
        <h3 className='text-lg font-semibold mb-2'>Add Category</h3>
        <div className='flex'>
          <input
            type='text'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder='Enter category name'
            className='border border-gray-300 px-2 py-1 rounded mr-2 w-64'
          />
          <button
            onClick={handleAddCategory}
            className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'
          >
            Add
          </button>
        </div>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </div>
    </div>
  );
};

export default CategoryManagement;
