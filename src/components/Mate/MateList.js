import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequest, fetchRequestsByReceiver } from '../../redux/friendSlice';
import { fetchOneUser } from '../../redux/userSlice';
// import { updateFriend, removeFriend } from '../redux/friendSlice';

const MateList = ({ me, requests, user, users }) => {
  const dispatch = useDispatch();
  console.log('me', me);

  // useEffect(() => {
  //   dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  // }, [dispatch]);

  const handleRequestDetails = (mateId) => {
    dispatch(fetchOneUser({ userId: mateId }));
  };

  return (
    <div className='w-full flex flex-col'>
      {me?.best_friends?.map((mate) => (
        <div key={mate._id} className='w-full flex my-2'>
          <div>Name: {mate.friend.username}</div>
          <div>Nickname: {mate.friend_nick_name}</div>
          <div>My Nickname{mate.my_nick_name}</div>
          {/* <button
            className='bg-black text-white'
            onClick={() => handleRequestDetails(mate.friend._id)}
          >
            Sender Info Details
          </button> */}
          <button className='bg-black text-white rounded-lg py-2 px-3 text-[0.7rem]'>
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default MateList;
