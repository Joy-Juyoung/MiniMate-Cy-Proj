import React, { useEffect } from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdSave } from "react-icons/io";
import TempPhoto from "../../assets/pic1.jpg";
import EditPost from "./EditPost";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import PhotoContents from "./PhotoContents";
import { useDispatch, useSelector } from "react-redux";
import { fetchMiniPhotosByFolder } from "../../redux/miniPhotoSlice";

const PostRightFrame = ({ selectedFolder, me, userHome, selectedFolderId }) => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.miniPhoto);
  const [isUpload, setIsUpload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");

  // {me?._id === userHome?.owner}
  // console.log(me?._id);

  useEffect(() => {
    dispatch(fetchMiniPhotosByFolder({ folderId: selectedFolderId }));
  }, [dispatch, selectedFolderId]);
  // console.log("photos", photos);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleUpload = () => {
    // Upload using selectedFile and text
    console.log("Selected File:", selectedFile);
    console.log("Text:", text);

    setIsUpload(!isUpload);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center font-semibold text-[#38b6d8] py-1 my-1">
          <span className="text-[0.7rem] flex items-center">
            PHOTO
            <MdKeyboardDoubleArrowRight size={16} />
          </span>
          <span className="mx-1">
            {selectedFolder?.toUpperCase() || "Public"}
          </span>
        </div>
        {me?._id === userHome?.owner && (
          <>
            {isUpload ? (
              <button
                onClick={handleUpload}
                className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-2 "
              >
                <IoMdSave className="mr-1" />
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsUpload(!isUpload)}
                className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-2 "
              >
                <GoPlus className="mr-1" />
                Upload
              </button>
            )}
          </>
        )}
      </div>

      <hr className="text-[#bbb] mb-2" />

      {/* {isEdit && <EditPost />} */}

      {isUpload ? (
        <div className="h-full">
          <input type="file" onChange={handleFileChange} className="my-2" />
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Write something..."
            className="w-full h-32 border border-[#bbb] rounded-md p-2 my-2"
          />
          <hr className="text-[#bbb]" />
        </div>
      ) : (
        <>
          {isEdit ? (
            <EditPost setIsEdit={setIsEdit} isEdit={isEdit} />
          ) : (
            <>
              {photos.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-[#bbb]">
                  No Photos yet
                </div>
              ) : (
                <PhotoContents setIsEdit={setIsEdit} isEdit={isEdit} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostRightFrame;
