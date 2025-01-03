import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItemImages } from '../../redux/itemSlice';
import Buttons from '../Buttons';

const UploadImage = ({ onUpload, closeModal, selectedProduct }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('images', file);

      console.log('formData', formData);
      dispatch(
        updateItemImages({ itemId: selectedProduct._id, images: formData })
      );
      closeModal();
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>Upload Image</h2>
      <p className='text-sm mb-4'>Upload the image for the product.</p>

      <form onSubmit={handleSubmit}>
        <div className='w-full flex items-center justify-between border border-[#ddd] rounded-md p-3'>
          <div className='font-semibold mr-2'>File:</div>
          <input type='file' onChange={handleFileChange} />
        </div>

        <div className='w-full flex justify-between mt-4'>
          <Buttons
            onClick={closeModal}
            containerStyles='flex items-center justify-center px-4 py-2 text-sm border border-2 rounded-xl bg-[#bbb] border-[#bbb] shadow-md'
            title='Cancel'
          />
          <Buttons
            type='submit'
            containerStyles='flex items-center justify-center px-4 py-2 text-sm border border-2 rounded-xl bg-black border-black text-white shadow-md'
            title='Upload'
          />
        </div>
      </form>
    </>
  );
};

export default UploadImage;
