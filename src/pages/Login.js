import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loginUser } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const { token, loading, user, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then(() => {
        // navigate('/');
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
          dispatch(fetchUser({ token: tokenFromStorage }));
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
      });

    // const tokenFromStorage = localStorage.getItem('token');
    // if (tokenFromStorage) {
    // }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
