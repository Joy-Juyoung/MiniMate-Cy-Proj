import React, { useEffect, useState, useRef } from "react";
import Banner from "../../assets/main(5).jpg";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createBannerText, deleteBannerText } from "../../redux/miniHomeSlice";
import Buttons from "../Buttons";
import { RiDeleteBin2Fill } from "react-icons/ri";

const ManageBanner = ({ closeModal, me, userHome, updateUserHome }) => {
  const dispatch = useDispatch();
  const [isHistoryUpload, setIsHistoryUpload] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const textareaRef = useRef(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = () => {
    if (isHistoryUpload) {
      if (!text) {
        textareaRef.current?.focus();
      } else {
        dispatch(createBannerText({ miniHomeId: userHome?._id, text }))
          .then
          // () => {
          //   updateUserHome();
          // }
          ();
        setIsHistoryUpload(false);
      }
    } else {
      setIsHistoryUpload(true);
      setIsDeleted(false);
    }
  };

  const handleBack = () => {
    setIsHistoryUpload(false);
    setFile("");
    setText("");
    setIsDeleted(false);
  };

  const handleDeleteHistory = (id) => {
    dispatch(
      deleteBannerText({ miniHomeId: userHome?._id, textHistoryId: id })
    ).then(() => {
      // updateUserHome();
    });
    setIsDeleted(false);
  };

  return (
    <div className="w-[250px] p-4 m-3 border border-dashed rounded-md border-[#268db2]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="font-bold mr-1 text-md text-[#268db2]">
            Banner History
          </h2>
          <div className="w-fit text-[0.6rem] p-1 rounded-md bg-[#f5f5f5]">
            Total {userHome?.banner_text_history.length}
          </div>
        </div>

        <button
          onClick={() => {
            setIsHistoryUpload(false);
            closeModal();
          }}
          className="text-[0.8rem]"
        >
          <FaTimes />
        </button>
      </div>

      {!isHistoryUpload ? (
        <div
          className={`h-[350px] overflow-y-auto overflow-x-hidden pr-2 my-3 border-t border-[#bbb]`}
        >
          {userHome?.banner_text_history?.map((history) => {
            return (
              <div
                key={history?._id}
                className="h-full border-b border-[#bbb] w-[180px] py-3"
              >
                <p className=" text-[0.6rem]">{history?.createdAt}</p>
                <div className="h-[200px] py-1">
                  <img
                    src={Banner}
                    alt="banner"
                    className="flex items-center justify-center object-cover object-top h-full"
                  />
                </div>
                <div className="flex flex-col justify-between h-[37%]">
                  <p className="text-[0.8rem]">{history?.text}</p>
                  <div className="text-[0.6rem] flex items-center mb-1">
                    <Buttons
                      title="Delete History"
                      containerStyles={`${
                        isDeleted && "text-hightColor"
                      } h-fit flex justify-start items-center text-[#666]`}
                      iconLeft={<RiDeleteBin2Fill size={15} />}
                      iconStyles="text-hightColor mr-1 "
                      onClick={() => {
                        setIsDeleted(true);
                      }}
                    />
                    {isDeleted && (
                      <div className="flex items-center justify-between">
                        <p>Are you sure? </p>
                        <div className="flex gap-2">
                          <span
                            onClick={() => handleDeleteHistory(history?._id)}
                            className="px-2 py-1 text-white bg-black border rounded-md cursor-pointer"
                          >
                            Yes
                          </span>
                          <span
                            onClick={() => setIsDeleted(false)}
                            className="px-2 py-1 border rounded-md cursor-pointer"
                          >
                            No
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-[350px] w-full overflow-y-auto overflow-x-hidden my-3">
          <div className="h-full  w-full border-t border-[#bbb] py-3">
            <div className="flex flex-col items-center w-full h-[200px] py-1 text-sm">
              <input type="file" onChange={handleFile} className="w-full" />
              {file && (
                <img
                  src={file}
                  alt=""
                  className="object-cover object-top w-full h-full my-2"
                />
              )}
            </div>
            <textarea
              ref={textareaRef}
              value={text || ""}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="Write the message..."
              className="w-full h-[120px] rounded-md p-2 text-[0.7rem] border"
            />
          </div>
        </div>
      )}

      <div
        className={`flex items-center ${
          isHistoryUpload ? "justify-between" : "justify-center"
        }`}
      >
        <button
          onClick={handleBack}
          className={`w-[60px] border border-[#268db2] rounded-md py-2 text-[0.7rem] ${
            !isHistoryUpload && "hidden"
          }`}
        >
          Back
        </button>

        <button
          onClick={handleUpload}
          className="w-[60px] bg-[#268db2] text-white rounded-md py-2 text-[0.7rem]"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ManageBanner;
