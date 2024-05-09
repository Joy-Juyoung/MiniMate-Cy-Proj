import React, { useState } from 'react';
import LogoDark from '../assets/logo-dark.png';
import { Buttons, Loading, TextInput } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import BgImg from '../assets/pattern.png';
import { useDispatch, useSelector } from 'react-redux';
// import { TextInput } from '../components';
import { signupUser } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    birth: '',
    gender: '',
    phone_number: '',
    password: '',
    passwordConfirm: '',
  });

  const { loading, success, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Register Error:', error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          label='Username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          label='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='date'
          name='birth'
          placeholder='Date of Birth'
          label='Date of Birth'
          value={formData.birth}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='gender'
          placeholder='Gender'
          label='Gender'
          value={formData.gender}
          onChange={handleChange}
          required
        />
        <input
          type='tel'
          name='phone_number'
          placeholder='Phone Number'
          label='Phone Number'
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          label='Password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='passwordConfirm'
          placeholder='Confirm Password'
          label='Confirm Password'
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
