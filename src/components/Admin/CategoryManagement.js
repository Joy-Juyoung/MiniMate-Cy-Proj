import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../../redux/categorySlice';
import Buttons from '../Buttons';
import AdminSidebar from './AdminSidebar';

const CategoryManagement = ({ me }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryKind, setNewCategoryKind] = useState('');
  const [newKind, setNewKind] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [duplicateError, setDuplicateError] = useState(false);
  const [showAddFields, setShowAddFields] = useState(false); // State to manage the visibility of add fields
  const [searchKind, setSearchKind] = useState(''); // State for search by Kind

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleUpdate = (categoryId, newName, newKind) => {
    if (!newName || newName.trim() === '' || !newKind || newKind.trim() === '')
      return;
    dispatch(
      updateCategory({
        categoryId,
        categoryData: { name: newName, kind: newKind },
      })
    );
    setNewName('');
    setSelectedCategoryId(null);
  };

  const handleCreate = () => {
    if (newCategoryName.trim() === '' || newCategoryKind.trim() === '') return;
    if (isDuplicateCategory(newCategoryName)) {
      setDuplicateError(true);
      return;
    }
    dispatch(
      createCategory({
        categoryData: { name: newCategoryName, kind: newCategoryKind },
      })
    );
    setNewCategoryName('');
    setNewCategoryKind('');
    setDuplicateError(false);
    setShowAddFields(false); // Hide add fields after successful creation
  };

  const handleInputChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleKindChange = (e) => {
    setNewCategoryKind(e.target.value);
  };

  const handleEditClick = (categoryId, categoryName, categoryKind) => {
    setSelectedCategoryId(categoryId);
    setNewName(categoryName);
    setNewKind(categoryKind);
  };

  const isDuplicateCategory = (name) => {
    return categories.some((category) => category.name === name);
  };

  // Filter categories by Kind
  const filteredCategories = categories.filter((category) =>
    category.kind.toLowerCase().includes(searchKind.toLowerCase())
  );

  return (
    <div className='w-full h-full flex flex-col py-16 px-10 sm:px-20 md:px-40'>
      <AdminSidebar />
      <div>
        <h2 className='text-xl font-semibold mb-2'>Category Management</h2>
        {/* Search by Kind */}
        <div className='mb-4 flex items-center justify-between'>
          <input
            type='text'
            placeholder='Search by Kind'
            value={searchKind}
            onChange={(e) => setSearchKind(e.target.value)}
            className='border border-gray-300 px-2 py-1 rounded'
          />
          {!showAddFields && (
            <button
              onClick={() => setShowAddFields(true)} // Show add fields when button is clicked
              className='bg-black text-white px-4 py-2 rounded text-[0.7rem]'
            >
              Add Category
            </button>
          )}
        </div>
        {/* Add Category */}
        <div className='mb-4 flex w-full justify-between items-center'>
          {/* <h3 className='text-lg font-semibold mb-2'>Add Category</h3> */}
          {showAddFields && (
            <div className='flex'>
              <label>
                Category Kind:
                <input
                  type='text'
                  placeholder='Enter new category kind'
                  value={newCategoryKind}
                  onChange={handleKindChange}
                  className='border border-gray-300 px-2 py-2 rounded mx-2 w-64'
                />
              </label>

              <label>
                Category Name:
                <input
                  type='text'
                  placeholder='Enter new category name'
                  value={newCategoryName}
                  onChange={handleInputChange}
                  className='border border-gray-300 px-2 py-2 rounded mx-2 w-64'
                />
              </label>
              <button
                onClick={handleCreate}
                className='bg-black text-white px-4 py-2 rounded text-[0.7rem]'
              >
                Add
              </button>

              <button
                onClick={() => setShowAddFields(false)}
                className='bg-[#ddd] px-4 py-1 rounded text-[0.7rem] ml-2'
              >
                Exit
              </button>
            </div>
          )}

          {duplicateError && (
            <p className='text-[#c82828] mt-2'>Category already exists!</p>
          )}
          {error && <p className='text-[#fefefe] mt-2'>{error}</p>}
        </div>
        {/* Category List */}
        <div className='h-[50vh] border border-[#bbb] p-4 rounded shadow mb-4 overflow-y-auto'>
          <h3 className='text-lg font-semibold mb-2'>Category List</h3>
          <ul>
            {filteredCategories &&
              filteredCategories.map((category) => (
                <li
                  key={category?._id}
                  className='flex items-center justify-between border-b last:border-none border-[#bbb] py-2'
                >
                  {selectedCategoryId === category._id ? (
                    <div className='w-full flex items-center justify-between'>
                      <div className='flex flex-col'>
                        <div className='flex items-center '>
                          <p>Kind: </p>
                          <input
                            type='text'
                            value={newKind}
                            onChange={(e) => setNewKind(e.target.value)}
                            className='border border-[#bbb] p-1 rounded-lg ml-2'
                          />
                        </div>
                        <div className='flex items-center '>
                          <p>Name: </p>
                          <input
                            type='text'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className='border border-[#bbb] p-1 rounded-lg mt-2 ml-2'
                          />
                        </div>
                      </div>
                      <Buttons
                        onClick={() =>
                          handleUpdate(category._id, newName, newKind)
                        }
                        title='Confirm'
                        containerStyles='text-[0.8rem] px-4 py-2 rounded bg-hightColor text-white'
                      />
                    </div>
                  ) : (
                    <div className='w-full flex justify-between items-center'>
                      <div>
                        <p>Kind: {category.kind}</p>
                        <p>Name: {category.name}</p>
                      </div>
                      <div className='flex gap-4'>
                        <Buttons
                          onClick={() => handleDelete(category?._id)}
                          title='Delete'
                          containerStyles='text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]'
                        />
                        <Buttons
                          onClick={() =>
                            handleEditClick(
                              category._id,
                              category.name,
                              category.kind
                            )
                          }
                          title='Edit'
                          containerStyles='text-[0.8rem] px-4 py-2 rounded hover:bg-[#bbb] bg-[#ddd]'
                        />
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
