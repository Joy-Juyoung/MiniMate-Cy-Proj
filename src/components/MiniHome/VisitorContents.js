import React, { useState } from "react";

const VisitorContents = ({ me }) => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <button className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-2 ">
          Setting
        </button>
      </div>
      {/* Text */}
      <div className="w-full px-4 pt-4 bg-[#e6e6e6] shadow-md rounded-md flex flex-col items-center justify-center">
        <div className="flex items-center w-full">
          <div className="mr-2 p-2 h-[120px] w-[120px] bg-white border-dashed border-2 border-[#aaa] rounded-md flex items-center justify-center">
            <img src={me.minime_img} alt="" className="w-[6rem]" />
          </div>
          <textarea
            value={text}
            placeholder="Write something..."
            className="w-full h-[120px] rounded-md p-2 text-[0.7rem]  border-dashed border-2 border-[#aaa] "
          />
        </div>
        <div className="flex justify-end cursor-pointer">
          <button className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-4 ">
            Write
          </button>
        </div>
      </div>

      {/* list */}
      <div className="my-6">
        <div className="flex items-center justify-between bg-[#e6e6e6] p-1">
          <div>
            <span className="mr-2 text-[0.6rem]">NO.index</span>
            <span className="text-[0.8rem] text-[#38b6d8]">
              name(domain Link)
            </span>
          </div>
          <div className="text-[0.6rem]">(2024.05.24 04:55)</div>
        </div>
        <div className="flex items-center w-full my-2">
          <div className="bg-white mr-2 p-2 h-[120px] w-[120px] rounded-md flex items-center justify-center">
            <img src={me.minime_img} alt="" className="w-[6rem]" />
          </div>
          <textarea
            value={text}
            placeholder="Hi Hello"
            className="w-full h-[120px] rounded-md p-2 text-[0.7rem] bg-white "
          />
        </div>
        <div className="flex flex-col  bg-[#e6e6e6] p-1 text-[0.8rem]">
          <div className="flex gap-2">
            <div className="text-[#38b6d8]">name:</div>
            <div>Comment 2312sfdsf</div>
            <div className="text-[0.6rem]">(2024.05.24 04:55)</div>
          </div>
        </div>
        <div className="w-full bg-[#ddd] p-2 flex items-center rounded-md">
          {/* <div className="basis-1/6 text-[#38b6d8] text-[0.6rem] font-semibold text-center">
            Comment
          </div> */}
          <input
            type="text"
            placeholder="Enter comments to your mate!"
            className="w-full text-sm px-2 py-1 mr-2 bg-white text-[0.8rem] "
          />
          <button className="basis-1/6 text-[0.8rem] border border-white text-white hover:text-[#666] rounded-md py-1">
            Enter
          </button>
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

export default VisitorContents;
