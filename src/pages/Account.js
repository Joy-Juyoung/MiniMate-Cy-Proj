import React, { useState } from 'react';

const Account = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
    // fullName: user.username,
    // phoneNumber: user.phoneNumber,
    // address: user.address,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleAccountDelete = () => {};

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full h-full px-10 2xl:px-40 min-h-[80vh]'>
      <div className='w-full h-full flex flex-col items-center rounded-[10%] py-16 bg-[#f5f5f5]'>
        <h1 className='text-3xl font-semibold mb-6'>My Account</h1>
        <div className='mb-4'>
          <label htmlFor='username' className='block mb-1'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={userInfo.username}
            onChange={handleUserInfoChange}
            className='w-full border-gray-300 rounded-md px-3 py-2'
            readOnly
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-1'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={userInfo.email}
            onChange={handleUserInfoChange}
            className='w-full border-gray-300 rounded-md px-3 py-2'
          />
        </div>

        <button
          className='bg-black text-white py-2 px-4 rounded-md mb-4'
          onClick={handleAccountDelete}
        >
          Delete Account
        </button>
        <form onSubmit={handleSubmitPasswordChange}>
          <div className='mb-4'>
            <label htmlFor='currentPassword' className='block mb-1'>
              Current Password
            </label>
            <input
              type='password'
              id='currentPassword'
              name='currentPassword'
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className='w-full border-gray-300 rounded-md px-3 py-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='newPassword' className='block mb-1'>
              New Password
            </label>
            <input
              type='password'
              id='newPassword'
              name='newPassword'
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className='w-full border-gray-300 rounded-md px-3 py-2'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block mb-1'>
              Confirm New Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className='w-full border-gray-300 rounded-md px-3 py-2'
            />
          </div>
          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded-md'
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
