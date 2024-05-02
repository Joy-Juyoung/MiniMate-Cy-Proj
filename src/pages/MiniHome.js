import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HomeLeft from '../components/MiniHome/HomeLeft';
import HomeRight from '../components/MiniHome/HomeRight';
import MiniHomeFrame from '../components/MiniHome/MiniHomeFrame';

const MiniHome = () => {
  // console.log(domain);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <MiniHomeFrame
        LeftContent={<HomeLeft user={user} />}
        RightContent={<HomeRight user={user} />}
      />
    </>
  );
};

export default MiniHome;
