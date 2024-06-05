import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequest } from '../../redux/friendSlice';
import { fetchOneUser } from '../../redux/userSlice';
import MinniFemale from '../../assets/minimi2.png';
import MinniMale from '../../assets/minimi1.png';

const ViewRequest = ({ closeModal, me, requestId }) => {
  const dispatch = useDispatch();
  const { friend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (requestId) {
      dispatch(fetchRequest({ requestId }));
      dispatch(fetchOneUser({ userId: friend.sender._id }));
    }
  }, [dispatch]);

  console.log('friend', friend);
  console.log('user', user);

  return (
    <div className='bg-primary p-8 rounded-lg w-[400px]'>
      <div className='bg-white p-3 rounded shadow-md'>
        <h3 className='text-xl font-bold mb-4'>Request</h3>
        <div className='text-black text-center'>
          <div className='border-b-2 border-dotted pb-2  text-[0.8rem]'>
            <span className='text-[#304fd6]'>{friend.sender.username}</span>
            <span className='mr-1'> requested a friend</span>
            <div>
              {friend.createdAt?.substring(0, friend.createdAt.indexOf('T'))}
            </div>
          </div>

          <div
            className='border-b-2 border-dotted pb-4 my-4 text-[0.8rem] 
          w-full flex items-center justify-center gap-2'
          >
            <div className='w-[7rem] h-[7rem] '>
              <img
                src={
                  !user?.minime_img
                    ? user?.gender === 'male'
                      ? MinniMale
                      : MinniFemale
                    : user?.minime_img
                }
                alt={user.username}
                className='w-full h-full object-contain flex items-center justify-center'
              />
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
              <div className='flex items-center w-full '>
                <span className='mr-1 text-[#304fd6]'>
                  {friend.sender.username}
                </span>
                <span className='w-1/2 mx-1 border border-[#ddd] px-1'>
                  {friend.sender_nick_name}
                </span>
              </div>
              <div className='flex items-center mb-2 w-full '>
                <span className='mr-1 text-[#304fd6]'>
                  {friend.receiver.username}
                </span>
                <span className='w-1/2 mx-1 border border-[#ddd] px-1'>
                  {friend.receiver_nick_name}
                </span>
              </div>
            </div>
          </div>
          <div className='text-[0.7rem]'>
            If you accept it, you will have a friend.
          </div>
        </div>
        <div className='w-full flex justify-center my-4 gap-4'>
          <button
            className='w-fit py-2 px-4 rounded text-[0.7rem] bg-[#ddd]'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className='w-fit py-2 px-4 rounded text-[0.7rem] bg-black text-white'
            // onClick={closeModal}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
