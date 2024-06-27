import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemImages } from "../../redux/itemSlice";

const ImageUploadForm = ({ itemId, onCancel }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    await dispatch(updateItemImages({ itemId: itemId, images: formData }));
    onCancel(); // Clear the form upon completion
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ImageUploadForm;
