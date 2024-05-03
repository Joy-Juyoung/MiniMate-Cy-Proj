import React, { useState } from 'react';
import BgImg from '../assets/pattern.png';
import MiniHomeFrame from '../components/MiniHome/MiniHomeFrame';
import PostFrame from '../components/MiniHome/PostFrame';

const MiniPhoto = () => {
  return (
    <>
      <MiniHomeFrame
        nav='Photo'
        LeftContent={<PostFrame />}
        // RightContent={<HomeRight user={user} />}
      />
    </>
  );
};

export default MiniPhoto;
