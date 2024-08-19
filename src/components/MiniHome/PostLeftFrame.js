import React, { useEffect, useRef, useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { IoMdSettings, IoMdSave, IoMdClose } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import {
  createPhotoFolder,
  deletePhotoFolder,
  updatePhotoFolder,
} from "../../redux/miniFolderSlice";
import { useLocation, useNavigate } from "react-router-dom";

const PostLeftFrame = ({
  title,
  listStyles,
  userHome,
  me,
  selectedFolder,
  setSelectedFolder,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract folder from the URL query parameter
  // const queryParams = new URLSearchParams(location.search);
  // const folderFromUrl = queryParams.get("folder");

  // // Set initial state based on URL or default to "public"
  // const [selectedFolder, setSelectedFolder] = useState(
  //   folderFromUrl || "public"
  // );

  const addRef = useRef();
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [folderScope, setFolderScope] = useState("public");

  // useEffect(() => {
  //   if (folderFromUrl) {
  //     setSelectedFolder(folderFromUrl);
  //   }
  // }, [folderFromUrl]);

  // const handleFolderClick = (folderName) => {
  //   setSelectedFolder(folderName);
  //   navigate(`${location.pathname}?folder=${folderName}`);
  // };
  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
    navigate(`${location.pathname}?folder=${folderName}`);
  };

  const handleAddFolder = () => {
    if (isAddFolder && folderName && folderScope) {
      dispatch(
        createPhotoFolder({
          miniHomeId: userHome?._id,
          folder_name: folderName,
          privacy_scope: folderScope,
        })
      );
      resetForm();
    } else {
      setIsAddFolder(!isAddFolder);
    }
  };

  const handleEditFolder = (folder) => {
    setFolderName(folder.folder_name);
    setFolderScope(folder.privacy_scope);
    setEditingFolderId(folder._id);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingFolderId && folderName && folderScope) {
      dispatch(
        updatePhotoFolder({
          miniHomeId: userHome?._id,
          folderId: editingFolderId,
          folder_name: folderName,
          privacy_scope: folderScope,
        })
      );
      resetForm();
    }
  };

  const handleDeleteFolder = () => {
    dispatch(
      deletePhotoFolder({
        miniHomeId: userHome?._id,
        folderId: editingFolderId,
      })
    );
    resetForm();
  };

  const resetForm = () => {
    setFolderName("");
    setFolderScope("");
    setIsAddFolder(false);
    setIsEditing(false);
    setEditingFolderId(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-[#38b6d8] font-semibold text-[0.7rem]">PHOTO</div>
      <hr className="text-[#38b6d8] font-semibold my-1" />

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col text-[0.8rem] my-1">
          <div
            className={`flex items-center cursor-pointer ${
              selectedFolder === "public" ? "font-semibold" : ""
            }`}
            onClick={() => handleFolderClick("public")}
          >
            <FaFolder className="text-[#ead33c] mr-2" />
            <div className="w-full ">public</div>
          </div>
          <hr className="text-[#bbb] border-dashed font-semibold my-2" />
          {userHome?.photo_folder
            ?.slice()
            .reverse()
            .map((folder) => (
              <div
                key={folder._id}
                className={`flex items-center cursor-pointer my-1 ${
                  selectedFolder === folder.folder_name ? "font-semibold" : ""
                }`}
                onClick={() => handleFolderClick(folder.folder_name)}
              >
                <FaFolder
                  className={`${listStyles} mr-2 ${
                    folder?.privacy_scope === "public"
                      ? "text-[#ead33c]"
                      : "text-[#bbb]"
                  }`}
                />
                <div className="w-full ">{folder?.folder_name}</div>
                {me?._id === userHome?.owner && (
                  <IoMdSettings
                    className="ml-2 text-[0.8rem] cursor-pointer text-[#999]"
                    onClick={() => handleEditFolder(folder)}
                  />
                )}
              </div>
            ))}
        </div>

        <div>
          {(isAddFolder || isEditing) && (
            <>
              {isEditing ? (
                <div className="flex text-[0.6rem]">
                  <div>Selected folder:</div>{" "}
                  <div className="mx-1">
                    <strong>{folderName}</strong>
                  </div>
                </div>
              ) : (
                <div className="flex text-[0.6rem]">
                  <div>Add new folder</div>{" "}
                </div>
              )}
              <div className="flex w-full items-center text-[0.8rem] my-1">
                <FaFolder className={`${listStyles} mr-2 text-[#ead33c]`} />
                <input
                  type="text"
                  className="border rounded-md border-[#bbb] w-full px-1 py-[0.1rem]"
                  ref={addRef}
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  required
                />
              </div>
              <div className="text-[0.7rem] my-1 text-[#666]">Visibility:</div>
              <div className="flex text-[0.6rem]">
                <label htmlFor="public" className="flex">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    id="public"
                    checked={folderScope === "public"}
                    onChange={(e) => setFolderScope(e.target.value)}
                  />
                  <p className="mx-1">Public</p>
                </label>

                <label htmlFor="Private" className="flex">
                  <input
                    type="radio"
                    name="visibility"
                    value="Private"
                    id="Private"
                    checked={folderScope === "Private"}
                    onChange={(e) => setFolderScope(e.target.value)}
                  />
                  <p className="mx-1">Private</p>
                </label>
              </div>
              {isEditing && (
                <button
                  onClick={() => setIsDeleting(!isDeleting)}
                  className="text-[0.6rem] bg-[#bbb] hover:bg-[#999] py-1 px-2 rounded-md my-2 hover:text-white"
                >
                  Delete folder
                </button>
              )}

              {isDeleting && (
                <div className="text-[0.6rem] ">
                  <p>Are you sure you want to delete it?</p>
                  <div className="flex gap-2 my-1">
                    <button
                      onClick={handleDeleteFolder}
                      className="px-2 py-1 text-white bg-black border rounded-md cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setIsDeleting(!isDeleting)}
                      className="px-2 py-1 border rounded-md cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {me?._id === userHome?.owner && (
          <div className="flex items-center justify-center text-[0.7rem] text-[#999]">
            {!isEditing && !isAddFolder ? (
              <div
                className="flex items-center cursor-pointer hover:underline underline-offset-2"
                onClick={handleAddFolder}
              >
                <GoPlus className="mr-1 font-bold text-[0.8rem]" /> Add Folder
              </div>
            ) : (
              <div className="flex gap-4">
                <div
                  className="flex items-center cursor-pointer hover:underline underline-offset-2"
                  onClick={() => {
                    setIsEditing(false);
                    setIsAddFolder(false);
                    resetForm();
                  }}
                >
                  <IoMdClose className="mr-1 font-bold text-[0.8rem]" /> Cancel
                </div>
                <div
                  className={`flex items-center cursor-pointer hover:underline underline-offset-2 ${
                    isEditing || (isAddFolder && "text-hightColor")
                  }`}
                  onClick={isEditing ? handleSaveEdit : handleAddFolder}
                >
                  <IoMdSave className={`mr-1 font-bold text-[0.8rem]`} /> Save
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostLeftFrame;
