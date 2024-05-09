import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchUser } from '../redux/authSlice';

function Home() {
  const dispatch = useDispatch();
  const { token, loading, user, error } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const tokenFromStorage = localStorage.getItem('token');
  //   if (tokenFromStorage) {
  //     dispatch(fetchAllUsers({ token: tokenFromStorage }));
  //   }
  // }, [dispatch, token]);
  // console.log('user', user);

  // useEffect(() => {
  //   const tokenFromStorage = localStorage.getItem('token');
  //   if (tokenFromStorage) {
  //     dispatch(fetchUser({ token: tokenFromStorage }));
  //   }
  // }, [dispatch, token]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  console.log('user', user);

  return (
    <div>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Birth: {user.birth}</p>
          <p>Gender: {user.gender}</p>
          <p>Phone Number: {user.phone_number}</p>
        </div>
      )}
      <button>
        <Link to='/login'>Login</Link>
      </button>
    </div>
  );
}

export default Home;
