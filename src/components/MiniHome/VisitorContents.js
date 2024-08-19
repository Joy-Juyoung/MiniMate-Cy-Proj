import React, { useEffect, useState } from "react";
import Miniroom from "../../assets/room.jpg";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVisitorBook,
  createVisitorBook,
  createBookComment,
} from "../../redux/miniVisitorSlice";
import { fetchOneUser } from "../../redux/userSlice";

const VisitorContents = ({ me, userHome, user }) => {
  const dispatch = useDispatch();
  const { book, comment } = useSelector((state) => state.miniVisitor);
  const [text, setText] = useState("");
  const [commentText, setCommentText] = useState("");

  // console.log("user", user);
  console.log("book", book);

  useEffect(() => {
    if (userHome?.owner) {
      dispatch(fetchVisitorBook({ miniHomeId: userHome?._id }));
      dispatch(fetchOneUser({ userId: book?.friendId }));
    }
  }, [dispatch, userHome?.owner]);

  const handleBookChange = (e) => {
    setText(e.target.value);
  };

  const handleWriteClick = () => {
    if (text.trim()) {
      dispatch(
        createVisitorBook({
          miniHome: userHome?._id,
          // friendId: userHome?.owner,
          friendId: me?._id, //writer
          content: text,
        })
      ).then(() => {
        setText("");
        dispatch(fetchVisitorBook({ miniHomeId: userHome?.owner }));
      });
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = (id) => {
    if (id) {
      dispatch(
        createBookComment({
          bookId: id,
          friendId: me?._id, // 작성자
          text: commentText,
        })
      ).then(() => {
        setCommentText("");
        dispatch(fetchVisitorBook({ miniHomeId: userHome?._id }));
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#38b6d8] py-1 my-1">VISITOR BOOK</h2>
      </div>
      <hr className="text-[#bbb] mb-4" />

      {/* Text */}
      <div className="w-full px-4 pt-4 bg-[#e6e6e6] shadow-md rounded-md flex flex-col items-center justify-center">
        <div className="flex items-center w-full">
          <div className="mr-2 p-2 h-[120px] w-[120px] bg-white border-dashed border-2 border-[#aaa] rounded-md flex items-center justify-center">
            <img
              src={
                me?.minime_img ||
                (me?.gender === "male" ? MinniMale : MinniFemale)
              }
              alt={me?.username}
              className="object-contain w-full h-full"
            />
          </div>
          <textarea
            value={text}
            placeholder="Write something..."
            onChange={handleBookChange}
            className="w-full h-[120px] rounded-md p-2 text-[0.8rem] border-dashed border-2 border-[#aaa]"
          />
        </div>
        <div className="flex justify-end cursor-pointer">
          <button
            onClick={handleWriteClick}
            className="flex items-center border border-[#bbb] rounded-md bg-[#ddd] text-[0.7rem] py-1 px-2 my-4"
          >
            Write
          </button>
        </div>
      </div>

      {Array.isArray(book) && book?.length === 0 ? (
        <div className="my-6 text-[#bbb] text-[0.8rem] text-center mt-14">
          Nothing visitor book yet
        </div>
      ) : (
        <div className="">
          {Array.isArray(book) &&
            book?.map((entry, index) => (
              <div
                key={index}
                className="flex flex-col w-full my-6 bg-[#e6e6e6]  rounded-md"
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="">
                    <span className="mr-2 text-[0.6rem]">
                      NO.{book?.length - index}
                    </span>
                    <span className="text-[0.8rem] text-[#38b6d8]">
                      {entry?.friend_name}
                    </span>
                  </div>
                  <div className="text-[0.6rem]">
                    {entry?.createdAt.split(".")[0]}
                  </div>
                </div>
                <hr className="text-[#bbb] mx-4 mb-1" />
                <div className="flex px-4 py-2">
                  <div className=" bg-[#f5f5f5] mr-2 p-2 h-[120px] w-[120px] rounded-md flex items-center justify-center">
                    <img
                      src={
                        entry.friend_img ||
                        (user?.gender === "male" ? MinniMale : MinniFemale)
                      }
                      alt={entry.username}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="w-full h-[120px] rounded-md p-2 text-[0.8rem] bg-[#f5f5f5] overflow-y-auto">
                    {entry.content}
                  </div>
                </div>
                {/* <div> */}
                {entry.comment.length !== 0 && (
                  <>
                    <hr className="text-[#bbb] mx-4 mt-1" />
                    <div className="flex flex-col  bg-[#e6e6e6] px-4 py-2 text-[0.8rem] ">
                      {entry.comment.map((comm) => {
                        return (
                          <div
                            key={comm?._id}
                            className="flex items-center gap-2"
                          >
                            <div className="text-[#38b6d8]">
                              {comm?.friend_name}:
                            </div>
                            <div>{comm?.text}</div>
                            <div className="text-[0.6rem]">
                              ({comm?.createdAt.split(".")[0]})
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                <div className="w-full bg-[#ddd] px-4 py-4 flex items-center rounded-md">
                  <input
                    type="text"
                    placeholder="Enter comments..."
                    value={commentText || ""}
                    onChange={(e) => handleCommentChange(e)}
                    className="w-full text-[0.8rem] px-2 py-1 mr-2 bg-white rounded-md"
                  />
                  <button
                    onClick={() => handleCommentSubmit(entry?._id)}
                    className="basis-1/6 text-[0.8rem] border border-white text-white hover:text-[#666] rounded-md py-1"
                  >
                    Enter
                  </button>
                </div>
                {/* </div> */}
              </div>
            ))}
        </div>
      )}

      <hr className="text-[#bbb] my-2" />
      <div>
        <div className="flex justify-center items-center text-[#e83e3e] text-[0.8rem] font-semibold">
          1
        </div>
      </div>
    </div>
  );
};

export default VisitorContents;
