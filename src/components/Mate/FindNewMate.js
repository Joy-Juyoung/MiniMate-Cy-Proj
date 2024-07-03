import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/userSlice";
import MinniFemale from "../../assets/minimi2.png";
import MinniMale from "../../assets/minimi1.png";

const FindNewMate = ({ me, requests, user, users }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // console.log("users", users);
  // console.log("me", me._id);
  // 6632d83bbe57da001562d702

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="Search by email or domain"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full border border-[#bbb] p-2 rounded-lg"
      />

      {!searchTerm ? (
        <div className="text-[#bbb] mt-12 flex items-center justify-center">
          Search and find your mates
        </div>
      ) : (
        <table className="w-full text-left border-collapse  text-[0.8rem] mt-2">
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
              .filter(
                (user) =>
                  user.email?.includes(searchTerm) ||
                  user.domain?.includes(searchTerm)
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
                  <td className="p-2">{user.domain}</td>
                  <td className="p-2 text-center">
                    {/*  */}
                    {user.best_friends?.some((bf) => bf.friend === me._id) ? (
                      <button
                        disabled
                        className=" bg-[#ddd] rounded-lg p-2 text-[0.7rem]"
                      >
                        Your Mate
                      </button>
                    ) : (
                      <button className=" bg-black text-white rounded-lg p-2 text-[0.7rem]">
                        Request
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FindNewMate;
