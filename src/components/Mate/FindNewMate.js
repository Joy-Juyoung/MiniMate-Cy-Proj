import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/userSlice';
import MinniFemale from '../../assets/minimi2.png';
import MinniMale from '../../assets/minimi1.png';

const FindNewMate = ({ me, requests, user, users }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log('users', users);

  return (
    <div className='w-full flex items=center flex-col'>
      <input
        type='text'
        placeholder='Search by email or domain'
        value={searchTerm}
        onChange={handleSearchChange}
        className='w-full border border-[#bbb] p-2 rounded-lg'
      />

      {searchTerm && (
        <div className='w-full flex flex-col'>
          {users
            .filter(
              (user) =>
                user.email?.includes(searchTerm) ||
                user.domain?.includes(searchTerm)
            )
            .map((user) => (
              <div key={user.id} className='w-full flex items-center my-2'>
                <img
                  src={
                    !user?.minime_img
                      ? user?.gender === 'male'
                        ? MinniMale
                        : MinniFemale
                      : user?.minime_img
                  }
                  alt={user.username}
                  className='w-[3rem] h-[3rem] object-contain'
                />
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>{user.domain}</div>
                <button className='bg-black text-white rounded-lg py-2 px-3 text-[0.7rem]'>
                  Request
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FindNewMate;
