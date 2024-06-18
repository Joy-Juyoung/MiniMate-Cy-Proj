import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/userSlice";
import AdminSidebar from "./AdminSidebar";
import UserDetail from "./UserDetail";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  console.log("users", users);
  // console.log('selectedUser', selectedUser);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full px-10 py-16 sm:px-20 md:px-40">
      <AdminSidebar />
      <div>
        <h2 className="mb-2 text-xl font-semibold">User Management</h2>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="px-2 py-1 border border-gray-300 rounded"
        />

        <div
          className={`${
            selectedUser ? "grid grid-cols-2 gap-4" : "flex w-full"
          }`}
        >
          {/* User List */}
          <div
            className={`h-full w-full mt-4 border border-[#bbb] p-4 rounded shadow overflow-y-auto`}
          >
            <h3 className="mb-2 text-lg font-semibold">User List</h3>
            <ul>
              {filteredUsers.map((user, index) => (
                <li
                  key={user._id}
                  className="flex items-center justify-between border-b border-[#bbb] py-2 cursor-pointer last:border-none"
                  onClick={() => setSelectedUser(user)}
                >
                  <p className="mr-4 text-[0.7rem]">{index + 1}</p>
                  <p className="w-full text-left ">{user.username}</p>
                  <p className="w-full text-left ">{user.email}</p>
                  <p className="w-full text-right text-[0.7rem]">{user._id}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* User Detail */}
          {selectedUser && (
            <UserDetail user={selectedUser} setSelectedUser={setSelectedUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
