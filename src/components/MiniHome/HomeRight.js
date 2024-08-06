import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Miniroom from '../../assets/shop3.gif';
import Miniroom from "../../assets/miniroom(2).gif";
import Minime from "../../assets/shop1.gif";
import Minnime from "../../assets/minime(23).gif";
import { managePosts } from "../../redux/tempData";
import { useDispatch, useSelector } from "react-redux";
import { createBFComment } from "../../redux/miniCommentSlice";

const update = [
  "New Post1",
  "New Post1",
  "New Post1",
  "New Post1",
  "New Post1",
];

const HomeRight = ({ me, userHome, categories, isUpdate, setIsUpdate }) => {
  const dispatch = useDispatch();
  const [newWelcomeComment, setNewWelcomeComment] = useState("");
  const { success: commentSuccess } = useSelector((state) => state.miniComment);

  const handleCommentChange = (e) => {
    setNewWelcomeComment(e.target.value);
  };

  console.log("userHome", userHome.sub_img[0]);

  const handleCommentClick = () => {
    if (newWelcomeComment.trim() === "") return;
    if (userHome?.owner !== me?._id) {
      dispatch(
        createBFComment({
          miniHomeId: userHome?._id,
          // friendId: userHome?.owner,
          friendId: me?._id, //남기는 사람 기준. 즉, 내가 글쓴이임
          text: newWelcomeComment,
        })
      );
      setNewWelcomeComment("");
    }
  };

  return (
    <div>
      <div className="grid items-center grid-cols-2 gap-4">
        <div>
          <div className="text-[#38b6d8] text-[0.7rem] font-semibold">
            Update news
          </div>
          <hr className="border-[#ccc]" />
          <div>
            {update.slice(0, 4).map((update, index) => {
              return (
                <ul key={index} className="text-[0.8rem] list-disc ml-4 ">
                  <li className="mt-1">{update}</li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[0.1rem] mt-4 items-center">
          {managePosts.map((post, index) => {
            return (
              <div
                key={index}
                className="text-[0.7rem] bg-[#e0e0e0] h-full flex justify-between items-center px-2 py-1 rounded-sm"
              >
                <div>{post.name}</div>
                <div className="text-[#2c509a]">
                  {post.new}/{post.total}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-[#38b6d8] text-[0.7rem] font-semibold mt-4">
        Miniroom
      </div>
      <hr className="border-[#ccc]" />
      <div className="relative">
        <img
          src={userHome?.sub_img[1].img_url}
          alt=""
          className="object-cover w-full my-2 "
        />
        <img
          src={userHome?.sub_img[0].img_url}
          alt="Minime"
          className="object-cover my-2 absolute top-1/2 left-1/2 w-[70px]"
        />
      </div>
      <div className="text-[#38b6d8] text-[0.7rem] font-semibold ">
        Welcome Comments
      </div>
      <hr className="border-[#ccc]  mb-1" />

      {userHome?.owner !== me?._id && (
        <div className="w-full bg-[#ddd] p-2 flex items-center rounded-md">
          <div className="basis-1/6 text-[#38b6d8] text-[0.6rem] font-semibold text-center">
            Mates say
          </div>
          <input
            type="text"
            placeholder="Enter comments to your mate!"
            value={newWelcomeComment || ""}
            onChange={handleCommentChange}
            className="w-full text-sm px-2 py-1 mx-2 bg-white text-[0.8rem]"
          />
          <button
            onClick={handleCommentClick}
            className="basis-1/6 text-[0.8rem] border border-white text-[#bbb] hover:text-[#666] rounded-md py-1"
          >
            Enter
          </button>
        </div>
      )}

      {userHome?.best_friend_comment.length === 0 && (
        <div className="flex items-center justify-center text-[#bbb] my-4 text-[0.8rem] mx-2 ">
          <div>No comments yet</div>
        </div>
      )}

      {userHome?.best_friend_comment.map((comment, index) => {
        return (
          <div key={index} className="text-[0.8rem] mx-2 ">
            <div className="flex items-center my-1">
              <div>
                {comment.text} ({comment.friend_nick_name}
                <Link className="text-[#2c509a] ml-2">
                  {comment.friend_name}
                </Link>
                )
              </div>
              <div className="text-[0.6rem] text-[#959595] ml-2">
                2024.03.28
              </div>
            </div>
            <hr className="border-[#ddd]" />
          </div>
        );
      })}
    </div>
  );
};

export default HomeRight;
