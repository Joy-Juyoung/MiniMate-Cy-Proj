import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  deleteRequest,
  fetchRequest,
} from "../../redux/friendSlice";
import { fetchOneUser } from "../../redux/userSlice";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import { MdClose } from "react-icons/md";

const ViewRequest = ({ closeModal, me, requestId, send, receive }) => {
  const dispatch = useDispatch();
  const { friend, error } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (requestId) {
      dispatch(fetchRequest({ requestId }));
    }
  }, [dispatch, requestId]);

  useEffect(() => {
    if (friend?.sender?._id) {
      dispatch(fetchOneUser({ userId: friend?.sender?._id }));
    }
  }, [dispatch, friend?.sender?._id]);

  const handleAccept = async () => {
    await dispatch(
      acceptRequest({ accepter: friend?.receiver?._id, requestId })
    );
    if (!error) {
      closeModal();
    }
  };

  const handleCancel = () => {
    dispatch(deleteRequest({ requestId }));
    if (!error) {
      closeModal();
    }
  };

  return (
    <div className="bg-[#e0eeff] p-8 rounded-lg w-[420px]">
      <div className="p-3 bg-white rounded shadow-md">
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-dotted border-[#bbb]">
          <div className="flex items-center">
            <h3 className="mr-2 text-xl font-bold">Friend Request</h3>
            <div className=" text-[0.7rem]">
              ({friend?.createdAt?.substring(0, friend.createdAt.indexOf("T"))})
            </div>
          </div>
          <MdClose className="cursor-pointer" onClick={closeModal} />
        </div>
        <div className="text-center text-black">
          <div
            className="border-b-2 border-dotted border-[#bbb] pb-4 my-4 text-[0.8rem] 
          w-full flex items-center justify-center gap-2"
          >
            <div className="h-[7rem] w-1/2 flex items-center justify-center">
              <img
                src={
                  !user?.minime_img
                    ? user?.gender === "male"
                      ? MinniMale
                      : MinniFemale
                    : user?.minime_img
                }
                alt={user?.username}
                className="flex items-center justify-center object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <div className="pb-2  text-[0.8rem]">
                <span className="text-[#304fd6]">
                  {friend?.sender?.username}
                </span>
                <span className="mr-1"> requested a friend.</span>
              </div>
              <div className="flex items-center w-full ">
                <span className="mr-1 font-semibold">
                  {friend?.sender?.username}
                </span>
                <span>as</span>
                <span className="w-1/2 mx-1 border border-[#ddd] rounded px-1">
                  {friend?.sender_nick_name}
                </span>
              </div>
              <div className="flex items-center w-full my-1 ">
                <span className="mr-1 font-semibold">
                  {friend?.receiver?.username}
                </span>
                <span>as</span>
                <span className="w-1/2 mx-1 border border-[#ddd] rounded px-1">
                  {friend?.receiver_nick_name}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[0.7rem]">
            If you accept it, you will have a friend.
          </div>
        </div>

        {friend?.sender?._id === me._id ? (
          <div className="flex justify-center w-full gap-4 my-4">
            <button
              className="w-fit py-2 px-4 rounded text-[0.7rem] bg-black text-white"
              onClick={() => handleCancel()}
            >
              Cancel this Request
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full gap-4 my-4">
            <button
              className="w-fit py-2 px-4 rounded text-[0.7rem] bg-[#ddd]"
              onClick={() => handleCancel()}
            >
              Decline
            </button>
            <button
              className="w-fit py-2 px-4 rounded text-[0.7rem] bg-black text-white"
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRequest;
