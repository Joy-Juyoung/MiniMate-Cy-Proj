import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/userSlice';
import UserDetail from './UserDetail';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // console.log('users', users);
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
    <div>
      <h2 className='text-xl font-semibold mb-2'>User Management</h2>
      <input
        type='text'
        placeholder='Search by username'
        value={searchTerm}
        onChange={handleSearchTermChange}
        className='border border-gray-300 px-2 py-1 rounded'
      />
      {/* User Detail */}
      {selectedUser && <UserDetail user={selectedUser} />}
      {/* User List */}
      <div className='border border-gray-200 p-4 rounded shadow'>
        <h3 className='text-lg font-semibold mb-2'>User List</h3>
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className='border-b border-gray-200 py-2 cursor-pointer'
              onClick={() => setSelectedUser(user)}
            >
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
