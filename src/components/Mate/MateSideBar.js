import React from 'react';

const MateSideBar = ({ onTabChange }) => {
  return (
    <div className='sidebar'>
      <button onClick={() => onTabChange('mateList')}>Mate List</button>
      <button onClick={() => onTabChange('findNewMate')}>Find New Mate</button>
      <button onClick={() => onTabChange('myRequests')}>My Requests</button>
    </div>
  );
};

export default MateSideBar;
