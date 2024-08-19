import React, { useState } from "react";

const EditPost = ({ setIsEdit, isEdit }) => {
  const [text, setText] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleEdit = () => {
    // Upload using selectedFile and text
    // console.log("Text:", text);

    setIsEdit(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="h-full text-[0.7rem] flex flex-col">
      {/* <input type="file" onChange={handleFileChange} className="my-2" /> */}
      <label>
        <span>Title: </span>
        <input
          type="text"
          placeholder="Title..."
          className="px-2 py-1 rounded-md border border-[#bbb]"
        />
      </label>
      <label>
        <span>File: </span>
        <input
          type="file"
          onChange={handleFileChange}
          className="mx-2 mt-4 mb-2"
        />
      </label>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Write something..."
        className="w-full h-32 border border-[#bbb] rounded-md p-2 my-2"
      />

      <div className="flex justify-end w-full">
        <button
          className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-2 "
          onClick={() => setIsEdit(!isEdit)}
        >
          Cancel
        </button>
        <button
          className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-2 "
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditPost;
