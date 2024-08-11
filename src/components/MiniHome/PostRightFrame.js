import React from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdSave } from "react-icons/io";
import TempPhoto from "../../assets/pic1.jpg";
import EditPost from "./EditPost";

const PostRightFrame = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");

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
        <h2 className="font-semibold">PHOTO</h2>
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
            <EditPost setIsEdit={setIsEdit} />
          ) : (
            <div className="w-full h-full text-[0.8rem]">
              <div className="bg-[#ddd] px-2 py-1 font-semibold">
                Photo Title
              </div>
              <div className="flex justify-between px-2 py-1 bg-[#e9e9e9]">
                <div className="">Photo Writer</div>
                <div className="">Scrap Qty 7</div>
              </div>
              <div className="flex items-center justify-center w-full h-full p-2">
                <img
                  src={TempPhoto}
                  alt="TempPhoto"
                  className="flex items-center justify-center"
                />
              </div>
              <div className="">
                난...ㄱㅏ끔... 눈물을 흘린ㄷㅏ.... ㄱㅏ끔은 눈물을 참을 수 없는
                ㄴㅐ가 별루ㄷㅏ... 맘이 ㅇㅏㅍㅏ서.... 소ㄹㅣ치며...울 수
                있ㄷㅏ는건.... 좋은 ㄱㅓㅇㅑ...... ㅁㅓ...꼭 슬ㅍㅓㅇㅑ만 우는
                건 ㅇㅏ니잖ㅇㅏ...^^ 난...눈물ㅇㅣ....좋다..... ㅇㅏ니...
                ㅁㅓ리가 ㅇㅏ닌..... 맘으로.....우는 ㄴㅐㄱㅏ 좋ㄷㅏ.....
              </div>
              <div className="mt-2 ">
                <div className="flex justify-end px-2 py-1 bg-[#e9e9e9] text-[0.7rem]">
                  <button
                    className="hover:underline underline-offset-2"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Edit
                  </button>

                  <div className="mx-1">|</div>
                  <button className="hover:underline underline-offset-2">
                    Move
                  </button>
                  <div className="mx-1">|</div>
                  <button className="hover:underline underline-offset-2">
                    Delete
                  </button>
                </div>
                <div className="bg-[#ddd] p-2 flex flex-col">
                  <div className="flex items-center">
                    <div className="text-[#2c509a]">Name</div>
                    <div className="mx-2 ">Hahahah</div>
                    <div className="text-[0.6rem] text-[#959595]">
                      (2024.02.24 02:14)
                    </div>
                  </div>
                  <hr className="text-[#bbb] my-2" />
                  <div className="flex items-center w-full">
                    <div className="flex text-[0.7rem] text-[#959595]">
                      Comment
                    </div>
                    <input
                      className="flex w-full ml-2 rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="flex justify-end mt-2 text-[0.7rem]">
                    <button className="mx-1 text-[#959595] hover:bg-[#eee] px-2 py-1 rounded-2xl">
                      Cancel
                    </button>
                    <button className="mx-1 bg-[#bbb] hover:bg-[#eee] px-2 py-1 rounded-2xl">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
              <hr className="text-[#bbb]  my-2" />
              <div>
                <div className="flex justify-center items-center text-[#e83e3e] text-[0.8rem] font-semibold">
                  1
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostRightFrame;
