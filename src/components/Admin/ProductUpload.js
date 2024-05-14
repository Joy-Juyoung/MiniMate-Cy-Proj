// components/ProductUpload.js

import React from 'react';
import ProductUploadForm from './ProductUploadForm';

const ProductUpload = ({ onUpload }) => {
  const handleUpload = (formData) => {
    // Handle upload logic, like sending data to backend
    onUpload(formData);
  };

  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>Product Upload</h3>
      <ProductUploadForm onSubmit={handleUpload} />
    </div>
  );
};

export default ProductUpload;
