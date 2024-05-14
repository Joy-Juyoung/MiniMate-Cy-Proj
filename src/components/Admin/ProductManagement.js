// components/ProductManagement.js

import React, { useState } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      category: 'Category A',
      price: 100,
      description: 'This is product 1.',
      image: 'product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category B',
      price: 200,
      description: 'This is product 2.',
      image: 'product2.jpg',
    },
  ]);

  // Fetch products from backend or dummy data

  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>Product Management</h2>
      {/* Product List */}
      <div className='border border-gray-200 p-4 rounded shadow'>
        <h3 className='text-lg font-semibold mb-2'>Product List</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id} className='border-b border-gray-200 py-2'>
              {product.name} - {product.category} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
      {/* Product Upload */}
      {/* Image Upload */}
    </div>
  );
};

export default ProductManagement;
