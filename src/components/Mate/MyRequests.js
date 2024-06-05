import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequest, fetchRequestsByReceiver } from '../../redux/friendSlice';
import { fetchOneUser } from '../../redux/userSlice';

const MyRequests = ({ me, requests, user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  }, [dispatch]);
  // console.log('requests', requests);

  const handleRequestDetails = (senderId) => {
    dispatch(fetchOneUser({ userId: senderId }));
  };
  // console.log('sender', user);

  return (
    <div className='w-full flex flex-col'>
      {requests.map((request) => (
        <div key={request._id} className='w-full flex'>
          <div>Sender: {request.sender.username}</div>
          <div>Sender Nickname: {request.sender_nick_name}</div>
          <div>Receiver: {request.receiver.username}</div>
          <div>Reciever Nickname: {request.receiver_nick_name}</div>
          <div>
            Request Date:{' '}
            {request.createdAt.substring(0, request.createdAt.indexOf('T'))}
          </div>
          {/* <button
            className='bg-black text-white'
            onClick={() => handleRequestDetails(request.sender._id)}
          >
            Sender Info Details
          </button> */}
          <button className='bg-black text-white rounded-lg py-2 px-3 text-[0.7rem]'>
            View Request
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
