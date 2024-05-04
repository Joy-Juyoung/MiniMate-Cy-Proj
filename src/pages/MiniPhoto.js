import React, { useState } from 'react';
import BgImg from '../assets/pattern.png';
import MiniHomeFrame from '../components/MiniHome/MiniHomeFrame';
import PostLeftFrame from '../components/MiniHome/PostLeftFrame';
import PostRightFrame from '../components/MiniHome/PostRightFrame';

const MiniPhoto = () => {
  return (
    <>
      <MiniHomeFrame
        nav='Photo'
        LeftContent={<PostLeftFrame />}
        RightContent={<PostRightFrame />}
      />
    </>
  );
};

export default MiniPhoto;
