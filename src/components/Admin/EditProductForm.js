import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../redux/itemSlice';

const EditProductForm = ({ product, onClose, onSave }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    item_name: product.item_name,
    category: product.category._id,
    item_price: product.item_price,
    description: product.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({ itemId: product._id, itemData: formData }));
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type='submit'>Save Changes</button>
    </form>
  );
};

export default EditProductForm;
