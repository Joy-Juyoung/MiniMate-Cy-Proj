import React from 'react';
import MinniFemale from '../../assets/minimi2.png';
import MinniMale from '../../assets/minimi1.png';
import { IoMdClose } from 'react-icons/io';

const UserDetail = ({ user, setSelectedUser }) => {
  return (
    <div className='border border-gray-200 p-4 rounded shadow my-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold mb-2'>User Detail</h3>
        <button onClick={() => setSelectedUser('')}>
          <IoMdClose />
        </button>
      </div>
      <div className='w-full grid grid-cols-2 items-center'>
        <img
          src={
            !user?.minime_img
              ? user?.gender === 'male'
                ? MinniMale
                : MinniFemale
              : user?.minime_img
          }
          alt='Minime'
          className='w-[20rem] h-[15rem] drop-shadow-xl object-contain'
        />
        <div>
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Birth:</strong> {user.birth}
          </p>
        </div>
        {/* <p>
          <strong>Status:</strong> {user.status}
        </p> */}
        {/* <h4 className='text-lg font-semibold mt-4 mb-2'>User History</h4>
        <ul>
          {user.history.map((item, index) => (
            <li key={index}>
              <p>
                <strong>Action:</strong> {item.action}
              </p>
              <p>
                <strong>Timestamp:</strong> {item.timestamp}
              </p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default UserDetail;
