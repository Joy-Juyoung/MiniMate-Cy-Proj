import React, { useState } from 'react';
import LogoDark from '../assets/logo-dark.png';
import { Buttons, Loading, TextInput } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import BgImg from '../assets/pattern.png';
import { useDispatch, useSelector } from 'react-redux';
// import { TextInput } from '../components';
import { registerUser } from '../redux/authSlice';

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

  const { loading, success, error } = useSelector(
    (state) => state.registration
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div>
      <h2>Register</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='date'
          name='birth'
          placeholder='Date of Birth'
          value={formData.birth}
          onChange={handleChange}
        />
        <input
          type='text'
          name='gender'
          placeholder='Gender'
          value={formData.gender}
          onChange={handleChange}
        />
        <input
          type='tel'
          name='phone_number'
          placeholder='Phone Number'
          value={formData.phone_number}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type='password'
          name='passwordConfirm'
          placeholder='Confirm Password'
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
