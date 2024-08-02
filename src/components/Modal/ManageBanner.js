import React, { useEffect, useState, useRef } from "react";
import Banner from "../../assets/main(5).jpg";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createBannerText } from "../../redux/miniHomeSlice";

const ManageBanner = ({ closeModal, me, userHome }) => {
  const dispatch = useDispatch();
  const [isHistoryEdit, setIsHistoryEdit] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const [textError, setTextError] = useState(false);
  const textareaRef = useRef(null);

  //   useEffect(() => {
  //     if (text) {
  //       dispatch(createBannerText({ miniHomeId: userHome._id, text }));
  //     }
  //   }, [dispatch]);

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = () => {
    if (isHistoryEdit) {
      if (!text) {
        // setTextError(true);
        textareaRef.current?.focus();
      } else {
        dispatch(createBannerText({ miniHomeId: userHome._id, text }));
      }
    } else {
      setIsHistoryEdit(true);
    }
  };

  const handleBack = () => {
    setIsHistoryEdit(false);
    setFile("");
    setText("");
    // setTextError(false);
  };

  return (
    <div className="px-6 py-4 m-3 border border-dashed rounded-md border-[#268db2]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-md text-[#268db2]">Banner History</h2>
        <button
          onClick={() => {
            setIsHistoryEdit(false);
            closeModal();
          }}
          className="text-[0.8rem]"
        >
          <FaTimes />
        </button>
      </div>
      {!isHistoryEdit ? (
        <div
          className={`h-[350px] overflow-y-auto overflow-x-hidden pr-2 my-3`}
        >
          <div className="h-full border-t border-[#bbb] w-[180px] py-3">
            <p className=" text-[0.6rem]">2024-07-03</p>
            <div className="h-[200px] py-1">
              <img
                src={Banner}
                alt="banner"
                className="flex items-center justify-center object-cover object-top h-full"
              />
            </div>
            <p className="text-[0.8rem]">
              Welcome to My Home, this is my history. Look at my super
              cooooooool cat
            </p>
          </div>

          <div className="h-full border-t border-[#bbb] w-[180px] py-3">
            <p className=" text-[0.6rem]">2024-07-03</p>
            <div className="h-[200px] py-1">
              <img
                src={Banner}
                alt="banner"
                className="flex items-center justify-center object-cover object-top h-full"
              />
            </div>
            <p className="text-[0.8rem]">
              Welcome to My Home, this is my history. Look at my super
              cooooooool cat
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[350px] overflow-y-auto overflow-x-hidden my-3">
          <div className="h-full border-t border-[#bbb] w-[180px] py-3">
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
                // setTextError(false);
              }}
              placeholder="Write the message..."
              className="w-full h-[120px] rounded-md p-2 text-[0.7rem] border"
            />
          </div>
        </div>
      )}

      <div
        className={`flex items-center ${
          isHistoryEdit ? "justify-between" : "justify-center"
        }`}
      >
        <button
          onClick={handleBack}
          className={`w-[60px] border border-[#268db2] rounded-md py-2 text-[0.7rem] ${
            !isHistoryEdit && "hidden"
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
