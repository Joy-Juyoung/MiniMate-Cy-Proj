import React from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdSave } from "react-icons/io";
import Photo from "../../assets/pic1.jpg";
import TempPhoto from "../../assets/pic1.jpg";

const PhotoContents = ({ setIsEdit, isEdit }) => {
  return (
    <div className="w-full h-full text-[0.8rem]">
      <div className="bg-[#ddd] px-2 py-1 mt-2 font-semibold">Photo Title</div>
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
      <div className="">Contents Text</div>
      <div className="mt-2 ">
        <div className="flex justify-end px-2 py-1 bg-[#e9e9e9] text-[0.7rem]">
          <button
            className="hover:underline underline-offset-2"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </button>

          <div className="mx-1">|</div>
          <button className="hover:underline underline-offset-2">Move</button>
          <div className="mx-1">|</div>
          <button className="hover:underline underline-offset-2">Delete</button>
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
            <div className="flex text-[0.7rem] text-[#959595]">Comment</div>
            <input className="flex w-full ml-2 rounded-sm" type="text" />
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
  );
};

export default PhotoContents;
