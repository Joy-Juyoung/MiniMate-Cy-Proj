import React from "react";
import { IoMdSettings } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

// const foldername = ["Miniroom", "Minime", "Font"];
const foldername = ["Miniroom", "Minime"];

const MiniSettingLeft = ({
  title,
  listStyles,
  userHome,
  me,
  selectedFolder,
  setSelectedFolder,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
    navigate(`${location.pathname}?folder=${folderName}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-[#38b6d8] font-semibold text-[0.7rem]">SETTING</div>
      <hr className="text-[#38b6d8] font-semibold my-1" />

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col text-[0.8rem] my-1">
          {foldername.map((folder, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer my-1 ${
                selectedFolder === folder ? "font-semibold" : ""
              }`}
              onClick={() => handleFolderClick(folder)}
            >
              <IoMdSettings className={`${listStyles} mr-2 text-[#999]`} />
              <div className="w-full ">{folder}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniSettingLeft;
