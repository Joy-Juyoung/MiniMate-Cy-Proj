import React from 'react';

const UserDetail = ({ user }) => {
  return (
    <div className='border border-gray-200 p-4 rounded shadow my-4'>
      <h3 className='text-lg font-semibold mb-2'>User Detail</h3>
      <div>
        <p>
          <strong>ID First Four:</strong> {user._id}
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
