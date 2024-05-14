import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeLeft from '../components/MiniHome/HomeLeft';
import HomeRight from '../components/MiniHome/HomeRight';
import MiniHomeFrame from '../components/MiniHome/MiniHomeFrame';
import { fetchUser } from '../redux/authSlice';

const MiniHome = (me) => {
  const dispatch = useDispatch();
  // const { token, loading, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  // console.log('me', me.username);

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
