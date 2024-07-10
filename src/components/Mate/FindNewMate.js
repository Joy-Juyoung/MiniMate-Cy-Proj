import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/userSlice";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";
import NoticeModal from "../Modal/NoticeModal";
import SendRequest from "../Modal/SendRequest";
import { fetchRequestsByReceiver } from "../../redux/friendSlice";
import MateSidebar from "./MateSidebar";

const FindNewMate = ({ me }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [newRequestModal, setNewRequestModal] = useState(false);
  const [friendId, setFriendId] = useState("");
  const { friend } = useSelector((state) => state.friend);
  const { user, users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
    // dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  }, [dispatch, friend]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSendRequest = (id) => {
    setFriendId(id);
    setNewRequestModal(true);
  };

  // console.log("friendId", friendId);

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-24 lg:pb-16 sm:px-20 md:px-40">
      <MateSidebar />
      <div className=" h-[50vh]">
        <div className="flex flex-col items-start w-full">
          <h2 className="mb-4 mr-4 text-xl font-semibold">Find New Mate</h2>
          <input
            type="text"
            placeholder="Search by username, email or domain"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-[#bbb] p-2 rounded-lg"
          />
        </div>
        {!searchTerm ? (
          <div className="text-[#bbb] h-full mt-4 flex items-center justify-center shadow-md overflow-y-auto bg-white ">
            Search and find your mates
          </div>
        ) : (
          <div className={`overflow-y-auto h-full bg-white shadow-md mt-4 `}>
            <table className="w-full text-left border-collapse  text-[0.8rem] mt-2 ">
              <thead className="">
                <tr className="bg-[#eee] border-b border-[#bbb]">
                  <th className="p-2 font-normal text-center">#</th>
                  <th className="p-2 font-normal">MINIME</th>
                  <th className="p-2 font-normal">NAME</th>
                  <th className="p-2 font-normal ">EMAIL</th>
                  <th className="p-2 font-normal">DOMAIN</th>
                  <th className="p-2 font-normal text-center"></th>
                </tr>
              </thead>
              <tbody>
                {users
                  ?.filter(
                    (user) =>
                      user.email !== me?.email &&
                      (user.username?.includes(searchTerm) ||
                        user.email?.includes(searchTerm) ||
                        user.domain?.includes(searchTerm))
                  )
                  .map((user, index) => (
                    <tr key={user._id} className="border-t border-[#bbb]">
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2">
                        <img
                          src={
                            user.minime_img
                              ? user.minime_img
                              : user.gender === "male"
                              ? MinniMale
                              : MinniFemale
                          }
                          alt={user.username}
                          className="object-contain w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="p-2">{user.username}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        {user?.domain ||
                          user?.email?.substring(0, user?.email.indexOf("@")) +
                            me?._id.slice(-5)}
                      </td>
                      <td className="p-2 text-center">
                        {user.best_friends?.some(
                          (bf) => bf.friend === me._id
                        ) ? (
                          <button
                            disabled
                            className=" bg-[#ddd] rounded-lg p-2 text-[0.7rem]"
                          >
                            Your Mate
                          </button>
                        ) : (
                          <button
                            className=" bg-black text-white rounded-lg p-2 text-[0.7rem]"
                            onClick={() => handleSendRequest(user?._id)}
                          >
                            Request
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {newRequestModal && (
          <NoticeModal
            friendId={friendId}
            closeModal={() => setNewRequestModal(false)}
          >
            <SendRequest
              me={me}
              friendId={friendId}
              closeModal={() => setNewRequestModal(false)}
            />
          </NoticeModal>
        )}
      </div>
    </div>
  );
};

export default FindNewMate;
