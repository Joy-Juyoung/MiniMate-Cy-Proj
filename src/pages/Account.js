import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ConfirmNotice from '../components/Modal/ConfirmNotice';
import NoticeModal from '../components/Modal/NoticeModal';
import { updateMe, fetchMe } from '../redux/userSlice';

const Account = ({ tokenFromStorage }) => {
  const dispatch = useDispatch();
  const { me, success } = useSelector((state) => state.user);
  const userTempDomain = me?.email.substring(0, me?.email.indexOf('@'));
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: me?.username,
    point: me?.point,
    domain: me?.domain || userTempDomain,
    minime_img: me?.minime_img,
    birth: me?.birth.substring(0, me?.birth.indexOf('T')),
    gender: me?.gender,
    phone_number: me?.phone_number,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMe({ userData: userInfo }));
    setIsEditing(false);
  };

  useEffect(() => {
    if (success) {
      dispatch(fetchMe());
      navigate('/account');
    }
  }, [success, location.pathname, dispatch]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleAccountDelete = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='w-full h-full px-10 2xl:px-40 min-h-[80vh]'>
      <div className='w-full h-full flex flex-col items-center rounded-[10%] py-12 '>
        <form onSubmit={handleSubmit} className='rounded-lg p-8 shadow-xl'>
          <h1 className='text-3xl text-center font-semibold mb-6'>
            My Account
          </h1>
          <label htmlFor='username' className='block text-[0.7rem] mb-4'>
            Username
            <input
              type='text'
              id='username'
              name='username'
              value={me?.username}
              className='w-full mt-1 rounded-md px-3 py-2 text-[1rem]'
              readOnly
              disabled
            />
          </label>
          <label htmlFor='email' className='block text-[0.7rem] mb-4'>
            Email
            <input
              type='email'
              id='email'
              name='email'
              value={me?.email}
              className='w-full mt-1 rounded-md px-3 py-2 text-[1rem]'
              readOnly
              disabled
            />
          </label>
          <label htmlFor='gender' className='block text-[0.7rem] mb-4'>
            Gender
            <input
              type='gender'
              id='gender'
              name='gender'
              value={userInfo.gender || me?.gender}
              onChange={handleUserInfoChange}
              className='w-full text-[1rem] rounded-md mt-1 px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
              disabled={!isEditing}
            />
          </label>
          <label htmlFor='phone_number' className='block text-[0.7rem] mb-4'>
            Phone number
            <input
              type='text'
              id='phone_number'
              name='phone_number'
              value={userInfo.phone_number || me?.phone_number}
              onChange={handleUserInfoChange}
              className='w-full text-[1rem] rounded-md mt-1 px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
              disabled={!isEditing}
            />
          </label>
          <label htmlFor='birth' className='block text-[0.7rem] mb-4'>
            Birth
            <input
              type='date'
              id='birth'
              name='birth'
              value={
                userInfo.birth || me?.birth.substring(0, me?.birth.indexOf('T'))
              }
              onChange={handleUserInfoChange}
              className='w-full text-[1rem] rounded-md mt-1 px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
              disabled={!isEditing}
            />
          </label>
          <label htmlFor='domain' className='block text-[0.7rem] mb-4'>
            Minihome Domain
            <input
              type='domain'
              id='domain'
              name='domain'
              value={userInfo.domain || me?.domain}
              onChange={handleUserInfoChange}
              className='w-full text-[1rem] rounded-md mt-1 px-3 py-2 border border-white focus:border-[#2185ff] focus:outline-none'
              disabled={!isEditing}
            />
          </label>

          <div className='flex flex-col'>
            <button
              type='button'
              className={`bg-black text-white text-sm py-2 px-4 rounded-md mb-4 ${
                isEditing && 'hidden'
              }`}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Profile
            </button>

            {isEditing && (
              <button
                type='submit'
                className='bg-black text-white text-sm py-2 px-4 rounded-md mb-4'
              >
                Save Changes
              </button>
            )}

            <button
              className='bg-[#ddd] hover:bg-[#bbb] text-sm py-2 px-4 rounded-md mb-4'
              onClick={handleAccountDelete}
            >
              Delete Account
            </button>

            {modalOpen && (
              <NoticeModal closeModal={closeModal}>
                <ConfirmNotice
                  closeModal={closeModal}
                  title='Delete Account'
                  text='Are you sure you want to delete this account?'
                />
              </NoticeModal>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
