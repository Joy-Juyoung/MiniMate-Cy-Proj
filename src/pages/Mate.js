import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FindNewMate,
  MateList,
  MateSideBar,
  MyRequests,
} from '../components/Mate';

const Mate = ({ me }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('mateList');
  const requests = useSelector((state) => state.friend.request);
  const { user, users } = useSelector((state) => state.user);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className='w-full h-full min-h-screen flex flex-col
    pb-28 sm:pb-12 pt-12 px-10 sm:px-20 md:px-40'
    >
      <div
        className='flex h-fit w-[250px] shrink-0 flex-col justify-start 
      rounded-lg py-4 shadow-lg border border-[#ddd]'
      >
        <h1 className=' w-full text-3xl font-semibold mb-6 px-4'>My Mate</h1>
        <button
          className=' w-full text-left px-4 py-2 border-b-1 border-[#bbb] hover:bg-[#f5f5f5]'
          onClick={() => setActiveTab('findNewMate')}
        >
          Find New Mate
        </button>
        <button
          className=' w-full text-left px-4 py-2 border-b-1 border-[#bbb] hover:bg-[#f5f5f5]'
          onClick={() => setActiveTab('mateList')}
        >
          Mate List
        </button>
        <button
          className=' w-full text-left px-4 py-2 hover:bg-[#f5f5f5]'
          onClick={() => setActiveTab('myRequests')}
        >
          My Requests
        </button>
      </div>
      <div className='flex my-8'>
        {activeTab === 'findNewMate' && (
          <FindNewMate me={me} requests={requests} users={users} user={user} />
        )}
        {activeTab === 'mateList' && (
          <MateList me={me} requests={requests} users={users} user={user} />
        )}
        {activeTab === 'myRequests' && (
          <MyRequests me={me} requests={requests} />
        )}
      </div>
    </div>
  );
};

export default Mate;
