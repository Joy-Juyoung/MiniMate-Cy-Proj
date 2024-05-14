import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeLeft from '../components/MiniHome/HomeLeft';
import HomeRight from '../components/MiniHome/HomeRight';
import MiniHomeFrame from '../components/MiniHome/MiniHomeFrame';
import { fetchMe } from '../redux/userSlice';

const MiniHome = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  // const { token, loading, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  console.log('me', me);
  return (
    <>
      <MiniHomeFrame
        nav='Home'
        me={me}
        LeftContent={<HomeLeft me={me} />}
        RightContent={<HomeRight me={me} />}
      />
    </>
  );
};

export default MiniHome;
