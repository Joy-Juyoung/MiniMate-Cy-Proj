import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/userSlice";
import AdminSidebar from "./AdminSidebar";
import UserDetail from "./UserDetail";
import { IoIosArrowForward } from "react-icons/io";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full px-10 pt-8 pb-24 lg:pb-16 sm:px-20 md:px-40">
      <AdminSidebar />
      <div>
        <div className="flex items-center mb-4">
          <h2 className="mr-4 text-xl font-semibold">User Management</h2>
          <input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="px-2 py-1 w-1/2 border border-[#bbb] rounded"
          />
        </div>

        <div
          className={`grid ${
            selectedUser ? "lg:grid-cols-2 gap-4" : "grid-cols-1"
          }  gap-4`}
        >
          {/* User Detail for small screens */}
          {selectedUser && (
            <div className="block mb-4 lg:hidden">
              <UserDetail
                user={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>
          )}

          {/* User List */}
          <div className={`overflow-y-auto h-[55vh] bg-white shadow-md mt-4 `}>
            <table className="relative w-full text-left border-collapse text-[0.8rem] table-fixed">
              <thead className="sticky top-0 h-[50px]">
                <tr className="bg-[#eee] border-b border-[#bbb] rounded-lg text-[#343434]">
                  <th className="p-2 pl-4 md:pl-8 w-[15%]">ID</th>
                  <th className="p-2 w-[20%]">Username</th>
                  <th className="p-2 w-[30%]">Email</th>
                  {!selectedUser && <th className="p-2 w-[15%] ">Gender</th>}
                  <th className="p-2 pr-8 w-[20%]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-t border-[#bbb]  ${
                      selectedUser === user ? "bg-[#fff7dc]" : ""
                    }`}
                  >
                    <td className="p-2 pl-4 md:pl-8">{user._id.slice(-5)}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    {!selectedUser && (
                      <td className="p-2">
                        <span>{user.gender}</span>
                      </td>
                    )}
                    <td className="flex justify-end p-2 pr-8">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="w-fit max-w-[8rem] border rounded-lg py-2 px-2 text-[0.7rem] flex items-center justify-between"
                      >
                        <span>View Details</span>
                        <IoIosArrowForward />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* User Detail for large screens */}
          {selectedUser && (
            <div className="hidden lg:block">
              <UserDetail
                user={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
