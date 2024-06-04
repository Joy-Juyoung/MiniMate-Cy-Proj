import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllItems, deleteItem, selectItem } from '../../redux/itemSlice'; // selectItem을 추가해요
import ProductUpload from './ProductUpload';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { list, all } = useSelector((state) => state.item);

  // Fetch items on component mount
  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);
  console.log('all', all);

  // Handler for deleting selected items
  const handleDeleteItems = () => {
    // Get IDs of selected items
    const selectedItems = all.filter((item) => item.selected);
    const itemIds = selectedItems.map((item) => item._id);
    // Dispatch delete action
    dispatch(deleteItem({ itemId: itemIds }));
  };

  // Handler for toggling upload form visibility
  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  // Handler for toggling item selection
  const toggleItemSelection = (itemId) => {
    dispatch(
      selectItem({
        itemId,
        selected: !all.find((item) => item._id === itemId).selected,
      })
    );
  };

  return (
    <div className='h-full '>
      <h2 className='text-xl font-semibold mb-2'>Product Management</h2>
      {/* Product Search */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 px-2 py-1 rounded'
        />
      </div>
      {/* Product Upload Button */}
      <div className='mb-4'>
        <button
          onClick={toggleUploadForm}
          className='bg-black text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          {showUploadForm ? 'Close Upload Form' : 'Upload Product'}
        </button>
      </div>
      {/* Product Upload Form */}
      {showUploadForm && <ProductUpload onUpload={toggleUploadForm} />}
      {/* Product List */}
      <div className='border border-gray-200 p-4 rounded shadow'>
        <h3 className='text-lg font-semibold mb-2'>Product List</h3>
        <div className='flex items-center justify-between mb-2'>
          <button
            onClick={handleDeleteItems}
            className='border border-black px-4 py-2 rounded hover:bg-red-600'
          >
            Delete Selected
          </button>
        </div>
        <ul>
          {all
            .filter((item) =>
              item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <li key={product._id} className='border-b border-gray-200 py-2'>
                <input
                  type='checkbox'
                  checked={product.selected}
                  onChange={() => toggleItemSelection(product._id)}
                  className='mr-2'
                />
                {product.item_name} - {product.category?.name} - $
                {product.item_price}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManagement;
