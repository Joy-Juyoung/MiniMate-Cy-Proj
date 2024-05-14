import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMe } from '../redux/userSlice';

const Account = ({ tokenFromStorage }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const userTempDomain = me?.email.substring(0, me?.email.indexOf('@'));

  // console.log('me', me);

  const [userInfo, setUserInfo] = useState({
    name: me?.username || '',
    point: me?.point || '',
    domain: me?.domain || userTempDomain || '',
    minime_img: me?.minime_img || null,
    birth: me?.birth.substring(0, me?.birth.indexOf('T')) || '',
    gender: me?.gender || '',
    phone_number: me?.phone_number || '',
  });

  // console.log('tokenFromStorage', tokenFromStorage);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateMe({ token: tokenFromStorage, userData: userInfo }));
    dispatch(updateMe({ userData: userInfo }));
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full h-full px-10 2xl:px-40 min-h-[80vh]'>
      <div className='w-full h-full flex flex-col items-center rounded-[10%] py-16 '>
        <h1 className='text-3xl font-semibold mb-6'>My Account</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block mb-1 text-[0.7rem]'>
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              value={me?.username}
              // onChange={handleUserInfoChange}
              className='w-full rounded-md px-3 py-2'
              readOnly
              disabled
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1 text-[0.7rem]'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={me?.email}
              // onChange={handleUserInfoChange}
              className='w-full rounded-md px-3 py-2'
              readOnly
              disabled
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='gender' className='block mb-1 text-[0.7rem]'>
              Gender
            </label>
            <input
              type='gender'
              id='gender'
              name='gender'
              value={userInfo.gender}
              onChange={handleUserInfoChange}
              className='w-full rounded-md px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='phone_number' className='block mb-1 text-[0.7rem]'>
              phone_number
            </label>
            <input
              type='text'
              id='phone_number'
              name='phone_number'
              value={userInfo.phone_number}
              onChange={handleUserInfoChange}
              className='w-full rounded-md px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='birth' className='block mb-1 text-[0.7rem]'>
              birth
            </label>
            <input
              type='date'
              id='birth'
              name='birth'
              value={userInfo.birth}
              onChange={handleUserInfoChange}
              className='w-full rounded-md px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='domain' className='block mb-1 text-[0.7rem]'>
              domain
            </label>
            <input
              type='domain'
              id='domain'
              name='domain'
              value={userInfo.domain}
              onChange={handleUserInfoChange}
              className='w-full rounded-md px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
            />
          </div>

          <div className='flex flex-col'>
            <button
              type='submit'
              className='bg-black text-white text-sm py-2 px-4 rounded-md mb-4'
            >
              Save Changes
            </button>
            <button
              className='bg-[#ddd] hover:bg-[#bbb] text-sm py-2 px-4 rounded-md mb-4'
              onClick={handleAccountDelete}
            >
              Delete Account
            </button>
          </div>
        </form>
        {/* <form onSubmit={handleSubmitPasswordChange}>
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
              className='w-full rounded-md px-3 py-2'
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
              className='w-full rounded-md px-3 py-2'
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
              className='w-full rounded-md px-3 py-2'
            />
          </div>
          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded-md'
          >
            Change Password
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Account;
