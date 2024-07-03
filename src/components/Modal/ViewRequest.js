import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../../redux/friendSlice";
import { fetchOneUser } from "../../redux/userSlice";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import { MdClose } from "react-icons/md";

const ViewRequest = ({ closeModal, me, requestId }) => {
  const dispatch = useDispatch();
  const { friend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (requestId) {
      dispatch(fetchRequest({ requestId }));
      dispatch(fetchOneUser({ userId: friend.sender?._id }));
    }
  }, [dispatch]);

  console.log("friend", friend);
  console.log("user", user);

  return (
    <div className="bg-[#e0eeff] p-8 rounded-lg w-[420px]">
      <div className="p-3 bg-white rounded shadow-md">
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-dotted border-[#bbb]">
          <div className="flex items-center">
            <h3 className="mr-2 text-xl font-bold">Friend Request</h3>
            <div className=" text-[0.7rem]">
              {/* <span className="text-[#304fd6]">{friend?.sender?.username}</span>
            <span className="mr-1"> requested a friend</span> */}
              {/* <div> */}(
              {friend.createdAt?.substring(0, friend.createdAt.indexOf("T"))})
              {/* </div> */}
            </div>
          </div>
          <MdClose className="cursor-pointer" onClick={closeModal} />
        </div>
        <div className="text-center text-black">
          <div
            className="border-b-2 border-dotted border-[#bbb] pb-4 my-4 text-[0.8rem] 
          w-full flex items-center justify-center gap-2"
          >
            <div className="w-[7rem] h-[7rem] ">
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
            <div className="flex flex-col items-center justify-center w-full">
              <div className="pb-2  text-[0.8rem]">
                <span className="text-[#304fd6]">
                  {friend?.sender?.username}
                </span>
                <span className="mr-1"> requested a friend.</span>
              </div>
              <div className="flex items-center w-full ">
                <span className="mr-1 font-semibold">
                  {friend.sender?.username}
                </span>
                <span>as</span>
                <span className="w-1/2 mx-1 border border-[#ddd] rounded px-1">
                  {friend.sender_nick_name}.
                </span>
              </div>
              <div className="flex items-center w-full my-1 ">
                <span className="mr-1 font-semibold">
                  {friend.receiver?.username} as
                </span>
                <span>as</span>
                <span className="w-1/2 mx-1 border border-[#ddd] rounded px-1">
                  {friend.receiver_nick_name}.
                </span>
              </div>
            </div>
          </div>
          <div className="text-[0.7rem]">
            If you accept it, you will have a friend.
          </div>
        </div>
        <div className="flex justify-center w-full gap-4 my-4">
          <button
            className="w-fit py-2 px-4 rounded text-[0.7rem] bg-[#ddd]"
            onClick={closeModal}
          >
            Decline
          </button>
          <button
            className="w-fit py-2 px-4 rounded text-[0.7rem] bg-black text-white"
            // onClick={closeModal}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
