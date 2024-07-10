import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, fetchOneUser } from "../../redux/userSlice";
import MateSidebar from "./MateSidebar";

const MateList = ({ me }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [me]);

  const handleRequestDetails = (mateId) => {
    dispatch(fetchOneUser({ userId: mateId }));
  };

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-24 lg:pb-16 sm:px-20 md:px-40">
      <MateSidebar />
      <div>
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-4 mr-4 text-xl font-semibold">Mate List</h2>
        </div>
        <div className="overflow-y-auto h-[55vh] bg-white shadow-md ">
          {me?.best_friends?.length > 0 ? (
            <table className="w-full text-left border-collapse text-[0.8rem] mt-2">
              <thead>
                <tr className="bg-[#eee] border-b border-[#bbb]">
                  <th className="p-2 font-normal text-center">#</th>
                  <th className="p-2 font-normal">MATE</th>
                  <th className="p-2 font-normal">NICKNAME</th>
                  <th className="p-2 font-normal">MY NICKNAME</th>
                  <th className="p-2 font-normal text-center"></th>
                </tr>
              </thead>
              {me.best_friends.map((mate, index) => (
                <tbody key={index}>
                  {mate.friend && (
                    <tr className="border-t border-[#bbb]">
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2">{mate.friend.username}</td>
                      <td className="p-2">{mate.friend_nick_name}</td>
                      <td className="p-2">{mate.my_nick_name}</td>
                      <td className="p-2 text-center">
                        <button className="bg-black text-white rounded-lg p-2 text-[0.7rem]">
                          Update
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          ) : (
            <div className="text-center text-[#bbb] mt-5">
              No friends found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateList;
