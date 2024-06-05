import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRequestsByReceiver } from '../../redux/friendSlice';

const MyRequests = ({ me, requests }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestsByReceiver({ userId: me?._id }));
  }, [dispatch]);
  // console.log('requests', requests);

  // const handleRequestDetails = (senderId) => {
  //   dispatch(fetchOneUser({ userId: senderId }));
  // };
  // console.log('sender', user);

  return (
    <div className='w-full flex flex-col'>
      {requests && requests.length > 0 ? (
        <table className='w-full text-left border-collapse text-[0.8rem] mt-2'>
          <thead>
            <tr className='bg-[#eee] border-b border-[#bbb]'>
              <th className='p-2 font-normal'>#</th>
              <th className='p-2 font-normal'>SENDER</th>
              <th className='p-2 font-normal'>SENDER NICKNAME</th>
              {/* <th className='p-2 font-normal'>Receiver</th> */}
              <th className='p-2 font-normal'>YOUR NICKNAME</th>
              <th className='p-2 font-normal'>DATE</th>
              <th className='p-2 font-normal'></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id} className='border-t border-[#bbb]'>
                <td className='p-2'>{index + 1}</td>
                <td className='p-2'>{request.sender.username}</td>
                <td className='p-2'>{request.sender_nick_name}</td>
                {/* <td className='p-2'>{request.receiver.username}</td> */}
                <td className='p-2'>{request.receiver_nick_name}</td>
                <td className='p-2'>
                  {request.createdAt.substring(
                    0,
                    request.createdAt.indexOf('T')
                  )}
                </td>
                <td className='p-2'>
                  <button
                    className='bg-black text-white rounded-lg py-1 px-2 text-[0.7rem]'
                    // onClick={() =>
                    //   dispatch(fetchOneUser({ userId: request.sender._id }))
                    // }
                  >
                    View Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-center text-[#bbb] mt-5'>No requests found.</div>
      )}
    </div>
  );
};

export default MyRequests;
