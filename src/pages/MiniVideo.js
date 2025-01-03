import React from 'react';
import MiniHomeFrame from '../components/MiniHome/MiniHomeFrame';
import PostLeftFrame from '../components/MiniHome/PostLeftFrame';
import PostRightFrame from '../components/MiniHome/PostRightFrame';

const MiniVideo = () => {
  return (
    <>
      <MiniHomeFrame
        nav='Video'
        LeftContent={<PostLeftFrame />}
        RightContent={<PostRightFrame />}
      />
    </>
  );
};

export default MiniVideo;
